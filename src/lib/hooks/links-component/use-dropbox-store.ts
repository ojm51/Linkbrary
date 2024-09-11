import { DropBoxStoreContext } from "@/components/links-component";
import { useCustomContext } from "./use-custom-context";

export const useDropBoxStore = () => useCustomContext(DropBoxStoreContext);
