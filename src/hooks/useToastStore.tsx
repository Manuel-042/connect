import { create } from "zustand";
import { toast } from "sonner";

type ToastType = keyof typeof toast;

interface ToastState {
  showToast: (message: string, type: ToastType) => void;
}

export const useToastStore = create<ToastState>(() => ({
  showToast: (message, type) => {
    (toast as Record<string, any>)[type](message);
  },
}));
