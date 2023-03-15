import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { Scenario } from "../models/scenario";

export default class ScenarioStore {
  scenarioRegistry = new Map<string, Scenario>();
  selectedScenario?: Scenario = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this)
  }

  get scenariosByDate() {
    return Array.from(this.scenarioRegistry.values()).sort((a, b) =>
      Date.parse(a.dueDate) - Date.parse(b.dueDate))
  }

  loadScenarios = async () => {
    try {
      const scenarios = await agent.Scenarios.list();
      scenarios.forEach(scenario => {
        scenario.dueDate = scenario.dueDate.split('T')[0];
        runInAction(() => {
          this.scenarioRegistry.set(scenario.id, scenario);
        })
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  selectScenario = (id: string) => {
    this.selectedScenario = this.scenarioRegistry.get(id);
  }

  cancelSelectScenario = () => {
    this.selectedScenario = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectScenario(id) : this.cancelSelectScenario();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createScenario = async (scenario: Scenario) => {
    this.loading = true;
    scenario.id = uuid();
    try {
      await agent.Scenarios.create(scenario);
      runInAction(() => {
        this.scenarioRegistry.set(scenario.id, scenario);
        this.selectedScenario = scenario;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }

  updateScenario = async (scenario: Scenario) => {
    this.loading = true;
    try {
      await agent.Scenarios.update(scenario)
      runInAction(() => {
        this.scenarioRegistry.set(scenario.id, scenario);
        this.selectedScenario = scenario;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
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


}