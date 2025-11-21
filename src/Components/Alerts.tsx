import { useContext } from 'react';
import alertContext from '../Contexts/alertContext';

function Alerts() {
  //Add '!' to command TS that alertInfo can never be NULL
  const {alertInfo}=useContext(alertContext)!;

  const bgColour={
    red: "bg-[#ff758f]", 
    green: "bg-[#06d6a0]",
    noColor: "bg-[#ffbe0b]"
  };
  return (
    //Opacity of the component depends on content of message.
    <div className={`fixed top-14 z-10 h-12 w-full ${bgColour[alertInfo.color]} flex items-center transition-opacity duration-150 ease-in-out ${(alertInfo.msg != "") ? "opacity-100" : "opacity-0"}`}>
      <div className="ml-6">
        <h3 className="font-bold inline">{`${alertInfo.msg}`}</h3>
      </div>
    </div>
  )
}

export default Alerts