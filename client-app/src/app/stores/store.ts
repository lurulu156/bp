
import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ScenarioStore from "./scenarioStore";
import UserStore from "./userStore";

interface Store {
  scenarioStore: ScenarioStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  scenarioStore: new ScenarioStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}