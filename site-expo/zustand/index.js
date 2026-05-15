import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTaskFilterStore = create(
  persist(
    (set) => ({
      taskDoneFilter: false,
      setTaskDoneFilter: (value) => set({ taskDoneFilter: value }),
      toggleTaskDoneFilter: () =>
        set((state) => ({ taskDoneFilter: !state.taskDoneFilter })),
    }),
    {
      name: "taskFilter-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useUserStore = create(
  persist(
    (set) => ({
      loggedUser: null,
      setLoggedUser: (user) => set({ loggedUser: user }),
      removeLoggedUser: () => set({ loggedUser: null }),
    }),
    {
      name: "loggedUser-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);