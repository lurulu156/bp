
export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  dueDate: Date | null;
  bpCycle: string;
  file: string;
}