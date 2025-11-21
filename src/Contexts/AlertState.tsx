import { useState } from 'react';
import alertContext from './alertContext';
import type { PropsWithChildren } from 'react';
import type { AlertInfo } from '../Models/alert';

function AlertState(props: PropsWithChildren) {
  //Dummy variable
  const demoAlert: AlertInfo = {color: "noColor", msg: ""};

  //Alert system memory
  const [alertInfo, setAlertInfo]=useState<AlertInfo>(demoAlert);

  function handleAlert(data: AlertInfo): void {
    setAlertInfo(data);
    //Set alertInfo to default value after 2 seconds
    setTimeout(()=>{
      setAlertInfo(demoAlert);
    }, 2000);
  }
  return (
    <alertContext.Provider value={{alertInfo, handleAlert}}>
        {props.children}
    </alertContext.Provider>
  )
}

export default AlertState