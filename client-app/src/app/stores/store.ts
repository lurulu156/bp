
import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ScenarioStore from "./scenarioStore";

interface Store {
  scenarioStore: ScenarioStore,
  commonStore: CommonStore;
}

export const store: Store = {
  scenarioStore: new ScenarioStore(),
  commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}