import { useState, useContext, useEffect } from 'react';
import userContext from '../Contexts/userContext';
import alertContext from '../Contexts/alertContext';

function Home() {
  const { fetchUsers, createUser, users }=useContext(userContext)!;
  const { handleAlert } = useContext(alertContext)!;

  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className="w-full min-h-[100vh] bg-[#ecf39e]">
        <div className="flex justify-center items-center py-12">
            <p className="text-[#132a13] text-7xl font-bold">Admin Panel</p>
        </div>
    </div>
  )
}

export default Home