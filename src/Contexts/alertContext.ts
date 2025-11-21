import { createContext } from "react";
import type { AlertInfo } from "../Models/alert";
  
  interface AlertContextType {
    alertInfo: AlertInfo;
    handleAlert: (data: AlertInfo) => void;
  }

const alertContext = createContext<AlertContextType | null>(null);

export default alertContext;