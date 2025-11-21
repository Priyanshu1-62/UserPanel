import { createContext } from "react";
import type { AlertInfo } from "../Models/alert";
  
//Define TS interface for Alert Context
interface AlertContextType {
  alertInfo: AlertInfo;
  handleAlert: (data: AlertInfo) => void;
}

//Declare Alert Context
const alertContext = createContext<AlertContextType | null>(null);

export default alertContext;