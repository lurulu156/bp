import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createHubConnection = (scenarioId: string) => {
    if (store.scenarioStore.selectedScenario) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat?scenarioId=' + scenarioId, {
          accessTokenFactory: () => store.userStore.user?.token!
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection.start().catch(error => console.log('Error establishing connection: ', error));

      this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
        runInAction(() => {
          comments.forEach(comment => {
            comment.createdAt = new Date(comment.createdAt + 'Z');
          });
          this.comments = comments;
        });
      });

      this.hubConnection.on('ReceiveComment', comment => {
        runInAction(() => {
          comment.createdAt = new Date(comment.createdAt);
          this.comments.unshift(comment);
        })
      })
    }
  }

  stopHubConnection = () => {
    this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
  }

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  }

  addComment = async (values: any) => {
    values.scenarioId = store.scenarioStore.selectedScenario?.id;
    try {
      await this.hubConnection?.invoke('SendComment', values);
    } catch (error) {
      console.log(error);
    }
  }
}
