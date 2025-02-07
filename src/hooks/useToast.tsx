import { Toaster, toast, ToasterProps } from "sonner";

export function useToast(toasterProps?: ToasterProps) {
  return {
    toast,
    ToasterComponent: <Toaster {...toasterProps} />,
  };
}
