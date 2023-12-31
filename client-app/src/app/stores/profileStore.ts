import { Photo, Profile, UserScenario } from "../models/profile";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { store } from "./store";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  followings: Profile[] = [];
  loadingFollowings = false;
  activeTab: number = 0;
  userScenarios: UserScenario[] = [];
  loadingScenarios = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? 'followers' : 'following';
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    )
  }

  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab;
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      })
    } catch (error) {
      toast.error('Problem loading profile');
      runInAction(() => {
        this.loadingProfile = false;
      })
    }
  }

  uploadPhoto = async (file: any) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo);
          if (photo.isMain && store.userStore.user) {
            store.userStore.setImage(photo.url);
            this.profile.image = photo.url;
            store.scenarioStore.updateHostImage(store.userStore.user!.username);
            store.scenarioStore.updateAttendeeProfile(store.userStore.user!.username);
          }
        }
        this.uploading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.uploading = false);
    }
  }

  setMainPhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      store.scenarioStore.updateHostImage(store.userStore.user!.username);
      store.scenarioStore.updateAttendeeProfile(store.userStore.user!.username);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find(a => a.isMain)!.isMain = false;
          this.profile.photos.find(a => a.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos?.filter(a => a.id !== photo.id);
          this.loading = false;
        }
      })
    } catch (error) {
      toast.error('Problem deleting photo');
      this.loading = false;
    }
  }

  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (profile.displayName && profile.displayName !==
          store.userStore.user?.displayName) {
          store.userStore.setDisplayName(profile.displayName);
          store.userStore.setDepartment(profile.department!);
          store.userStore.setTitle(profile.title!);
        }
        this.profile = { ...this.profile, ...profile as Profile };
        store.scenarioStore.updateAttendeeProfile(store.userStore.user!.username);
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.scenarioStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (this.profile
          && this.profile.username !== store.userStore.user?.username
          && this.profile.username === username) {
          following ? this.profile.followersCount++ : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (this.profile && this.profile.username === store.userStore.user?.username) {
          following ? this.profile.followingCount++ : this.profile.followingCount--;
        }
        this.followings.forEach(profile => {
          if (profile.username === username) {
            profile.following ? profile.followersCount-- : profile.followersCount++
            profile.following = !profile.following;
          }
        })
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  loadFollowings = async (predicate: string) => {
    this.loadingFollowings = true;
    try {
      const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loadingFollowings = false);
    }
  }

  loadUserScenarios = async (username: string, predicate?: string) => {
    this.loadingScenarios = true;
    try {
      const scenarios = await agent.Profiles.listScenarios(username, predicate!);
      runInAction(() => {
        this.userScenarios = scenarios;
        this.loadingScenarios = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingScenarios = false;
      })
    }
  }
}
