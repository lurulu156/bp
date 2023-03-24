import { Profile } from "./profile";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: Date | null;
  bpCycle: string;
  file: string;
  hostUsername?: string;
  isCancelled?: boolean;
  isGoing?: boolean;
  isHost?: boolean
  attendees?: Profile[]
  host?: Profile;
}

export class ScenarioFormValues {
  id?: string = undefined;
  title: string = '';
  category: string = '';
  description: string = '';
  dueDate: Date | null = null;
  bpCycle: string = '';
  file: string = '';

  constructor(scenario?: ScenarioFormValues) {
    if (scenario) {
      this.id = scenario.id;
      this.title = scenario.title;
      this.category = scenario.category;
      this.description = scenario.description;
      this.dueDate = scenario.dueDate;
      this.bpCycle = scenario.bpCycle;
      this.file = scenario.file;
    }
  }

}

export class Scenario implements Scenario {
  constructor(init?: ScenarioFormValues) {
    Object.assign(this, init);
  }
}