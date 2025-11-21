import { useContext } from 'react';
import alertContext from '../Contexts/alertContext';

function Alerts() {
  const {alertInfo}=useContext(alertContext)!;
  const bgColour={
    red: "bg-[#ff758f]", 
    green: "bg-[#06d6a0]",
    yellow: "bg-[#ffbe0b]"
  };
  return (
    <div className={`fixed top-14 z-50 h-12 w-full ${bgColour[alertInfo.color]} flex items-center transition-opacity duration-150 ease-in-out opacity-${(alertInfo.msg !== "") ? 100 : 0}`}>
      <div className="ml-6">
        <h3 className="font-bold inline">{`${alertInfo.msg} :`}</h3>
      </div>
    </div>
  )
}

export default Alerts