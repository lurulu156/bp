
import { createContext, useContext } from "react";
import ScenarioStore from "./ScenarioStore";

interface Store {
  scenarioStore: ScenarioStore
}

export const store: Store = {
  scenarioStore: new ScenarioStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}