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
    scenario.dueDate = scenario.dueDate.split('T')[0];
    this.scenarioRegistry.set(scenario.id, scenario);
  }

  private getScenario = (id: string) => {
    return this.scenarioRegistry.get(id);
  }

  loadScenarios = async () => {
    this.setLoadingInitial(true);
    try {
      const scenarios = await agent.Scenarios.list();
      scenarios.forEach(scenario => {
        scenario.dueDate = scenario.dueDate.split('T')[0];
        this.setScenario(scenario);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
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