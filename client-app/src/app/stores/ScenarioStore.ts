import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Scenario, ScenarioFormValues } from "../models/scenario";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";

export default class ScenarioStore {
  scenarioRegistry = new Map<string, Scenario>();
  selectedScenario?: Scenario = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set('all', true);

  constructor() {
    makeAutoObservable(this)
    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.scenarioRegistry.clear();
        this.loadScenarios();
      }
    )
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  }

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== 'startDate') this.predicate.delete(key);
      })
    }
    switch (predicate) {
      case 'all':
        resetPredicate();
        this.predicate.set('all', true);
        break;
      case 'isAttend':
        resetPredicate();
        this.predicate.set('isAttend', true);
        break;
      case 'isHost':
        resetPredicate();
        this.predicate.set('isHost', true);
        break;
      case 'startDate':
        this.predicate.delete('startDate');
        this.predicate.set('startDate', value);
        break;
    }
  }

  get axiosParams() {
    const params = new URLSearchParams();
    params.append('pageNumber', this.pagingParams.pageNumber.toString());
    params.append('pageSize', this.pagingParams.pageSize.toString())
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, (value as Date).toISOString())
      } else {
        params.append(key, value);
      }
    })
    return params;
  }

  get scenariosByDate() {
    return Array.from(this.scenarioRegistry.values()).sort((a, b) =>
      a.dueDate!.getTime() - b.dueDate!.getTime());
  }

  get groupedScenarios(): [string, Scenario[]][] {
    return Object.entries(
      this.scenariosByDate.reduce((scenarios, scenario) => {
        const bpCycle = scenario.bpCycle
        scenarios[bpCycle] = scenarios[bpCycle] ? [...scenarios[bpCycle], scenario] : [scenario];
        return scenarios;
      }, {} as { [key: string]: Scenario[] })
    )
  }

  private setScenario = (scenario: Scenario) => {
    const user = store.userStore.user;
    if (user) {
      scenario.isGoing = scenario.attendees!.some(
        a => a.username === user.username
      );
      scenario.isHost = scenario.hostUsername === user.username;
      scenario.host = scenario.attendees?.find(x => x.username === scenario.hostUsername);
    }
    scenario.dueDate = new Date(scenario.dueDate!);
    this.scenarioRegistry.set(scenario.id, scenario);
  }

  private getScenario = (id: string) => {
    return this.scenarioRegistry.get(id);
  }

  loadScenarios = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Scenarios.list(this.axiosParams);
      result.data.forEach(scenario => {
        this.setScenario(scenario);
      })
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  }

  loadScenario = async (id: string) => {
    let scenario = this.getScenario(id);
    if (scenario) {
      this.selectedScenario = scenario;
      return scenario;
    }
    else {
      this.setLoadingInitial(true);
      try {
        scenario = await agent.Scenarios.details(id);
        this.setScenario(scenario);
        runInAction(() => this.selectedScenario = scenario);
        this.setLoadingInitial(false);
        return scenario;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  createScenario = async (scenario: ScenarioFormValues) => {
    const user = store.userStore!.user;
    const profile = new Profile(user!);
    try {
      await agent.Scenarios.create(scenario);
      const newScenario = new Scenario(scenario);
      newScenario.hostUsername = user!.username;
      newScenario.attendees = [profile];
      this.setScenario(newScenario);
      runInAction(() => this.selectedScenario = newScenario);
    } catch (error) {
      console.log(error);
    }
  }

  updateScenario = async (scenario: ScenarioFormValues) => {
    this.loading = true;
    try {
      await agent.Scenarios.update(scenario)
      runInAction(() => {
        if (scenario.id) {
          let updatedScenario = { ...this.getScenario(scenario.id), ...scenario };
          this.scenarioRegistry.set(scenario.id, updatedScenario as Scenario);
          this.selectedScenario = updatedScenario as Scenario;
        }
      })
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  deleteScenario = async (id: string) => {
    this.loading = true;
    try {
      await agent.Scenarios.delete(id);
      runInAction(() => {
        this.scenarioRegistry.delete(id);
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      })
    }
  }
  updateAttendeance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Scenarios.attend(this.selectedScenario!.id);
      runInAction(() => {
        if (this.selectedScenario?.isGoing) {
          this.selectedScenario.attendees = this.selectedScenario.attendees?.filter(a => a.username !== user?.username);
          this.selectedScenario.isGoing = false;
        } else {
          const attendee = new Profile(user!);
          this.selectedScenario?.attendees?.push(attendee);
          this.selectedScenario!.isGoing = true;
        }
        this.scenarioRegistry.set(this.selectedScenario!.id, this.selectedScenario!);
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  cancelScenarioToggle = async () => {
    this.loading = true;
    try {
      await agent.Scenarios.attend(this.selectedScenario!.id);
      runInAction(() => {
        this.selectedScenario!.isCancelled = !this.selectedScenario!.isCancelled;
        this.scenarioRegistry.set(this.selectedScenario!.id, this.selectedScenario!);
      })
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => this.loading = false);
    }
  }

  clearSelectedScenario = () => {
    this.selectedScenario = undefined;
  }

  updateAttendeeFollowing = (username: string) => {
    this.scenarioRegistry.forEach(scenario => {
      scenario.attendees.forEach((attendee: Profile) => {
        if (attendee.username === username) {
          attendee.following ? attendee.followersCount-- : attendee.followersCount++;
          attendee.following = !attendee.following;
        }
      })
    })
  }

  updateAttendeeProfile = (username: string) => {
    this.scenarioRegistry.forEach(scenario => {
      scenario.attendees.forEach((attendee: Profile) => {
        if (attendee.username === username) {
          attendee.bio = store.profileStore.profile?.bio
          attendee.displayName = store.profileStore.profile?.displayName!
          attendee.image = store.userStore.user?.image
        }
      })
    })
  }
  updateHostImage = (username: string) => {
    this.scenarioRegistry.forEach(scenario => {
      if (scenario.host?.username === username) scenario.host!.image = store.userStore.user?.image;
    })
  }

}