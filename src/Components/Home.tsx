import { useState, useContext, useEffect } from 'react';
import userContext from '../Contexts/userContext';
import UserItem from './UserItem';
import type { userModel } from '../Models/user';
import { useNavigate } from 'react-router-dom';
import Alerts from './Alerts';
import SkeletonUserItem from './SkeletonUserItem';
import { IoClose } from "react-icons/io5";

function Home() {
  const navigate = useNavigate();
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [data, setData] = useState<userModel>({name: "", username: "", id: 108, phone: "", website: "", email: ""});
  const { fetchUsers, createUser, users, setUsers, loading, setLoading }=useContext(userContext)!;

  function handleNavigateUser(element: userModel): void {
    //Navigates to User specific page if no task is running.
    if(creatingUser || loading) return;
    navigate(`/user/${element.id}`);
  }

  async function getUsers(): Promise<void> {
    setLoading(true);
    await fetchUsers();
    setLoading(false);
  }

  function handleCross():void {
    setCreatingUser(false);
  }

  function handleCreateUser(){
    if(creatingUser || loading) return;
    setCreatingUser(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault();
    setCreatingUser(false);
    setLoading(true);
    await createUser(data);
    setUsers(prev => [...prev, data]);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
    <Alerts />
    {/* //Conditional display of Form element*/}
    {creatingUser && <div className="z-2 absolute w-full h-full flex justify-center items-center px-5 md:px-16 lg:px-32">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 px-3 py-5 border bg-white text-black border-gray-200">
        <div className="w-full flex justify-end pb-10">
          <button type="button" className="text-4xl font-bold hover:cursor-pointer" onClick={handleCross}><IoClose /></button>
        </div>
        <div className="flex flex-col md:flex-row">
          <p className="w-24">Name</p>
          <input name="name" value={data?.name} onChange={(e)=> setData(prev=>({...prev, name:e.target.value}))} type="text" placeholder="Name" className="w-full py-2 px-2 bg-gray-200 border-l-2 border-t-2 border-gray-800"></input>
        </div>
        <div className="flex flex-col md:flex-row">
          <p className="w-24">Username</p>
          <input name="username" value={data?.username} onChange={(e)=> setData(prev=>({...prev, username:e.target.value}))} type="text" placeholder="Username" className="w-full py-2 px-2 bg-gray-200 border-l-2 border-t-2 border-gray-800"></input>
        </div>
        <div className="flex flex-col md:flex-row">
          <p className="w-24">Email</p>
          <input name="email" value={data?.email} onChange={(e)=> setData(prev=>({...prev, email:e.target.value}))} type="text" placeholder="Email" className="w-full py-2 px-2 bg-gray-200 border-l-2 border-t-2 border-gray-800"></input>
        </div>
        <div className="flex flex-col md:flex-row">
          <p className="w-24">Phone</p>
          <input name="phone" value={data?.phone} onChange={(e)=> setData(prev=>({...prev, phone:e.target.value}))} type="text" placeholder="Phone" className="w-full py-2 px-2 bg-gray-200 border-l-2 border-t-2 border-gray-800"></input>
        </div>
        <div className="flex flex-col md:flex-row">
          <p className="w-24">Website</p>
          <input name="website" value={data?.website} onChange={(e)=> setData(prev=>({...prev, website:e.target.value}))} type="text" placeholder="Website" className="w-full py-2 px-2 bg-gray-200 border-l-2 border-t-2 border-gray-800"></input>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="px-6 py-2 text-amber-50 bg-green-800 hover:bg-green-600 active:bg-green-700 hover:cursor-pointer">Create !</button>
        </div>
      </form>
    </div>}
    <div className="w-full min-h-screen bg-[#0d1b2a] text-amber-50">
      <div className={`z-1 px-3 md:px-6 lg:px-11 ${creatingUser?"opacity-15":""}`}>
          <div className="flex justify-center items-center py-12">
              <p className="text-4xl md:text-6xl lg:text-7xl font-bold">Admin Panel</p>
          </div>
          <div className="flex justify-end">
            <button className=" px-5 py-3 mb-9 font-bold bg-lime-600 hover:bg-lime-800 active:bg-lime-500 border-2 border-lime-800 rounded-2xl hover:cursor-pointer" onClick={()=>{handleCreateUser()}}>Add User</button>
          </div>
          {/* Conditional display of Skeleton component */}
          {loading && <div className="">
            {Array.from({length: 10}).map((_, i) => (
              <SkeletonUserItem key={i} />
            ))}
          </div>}
          {!loading && <div className="">
            {users.map((element)=>{
              return <UserItem key={element.id} user={element} handleNavigateUser={()=>{handleNavigateUser(element)}}/>
            })}
          </div>}
      </div>
    </div>
    </>
  )
}

export default Home