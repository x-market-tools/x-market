import { createTypedHooks } from "easy-peasy";
import { type GlobalStore } from ".";

const { useStoreActions, useStoreState, useStore } = createTypedHooks<GlobalStore>();

export const apiCoreUseStoreActions = useStoreActions;
export const apiCoreUseStoreState = useStoreState;
export const apiCoreUseStore = useStore;