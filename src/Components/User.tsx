import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import userContext from '../Contexts/userContext';
import { useNavigate } from 'react-router-dom';
import type { userModel } from '../Models/user';
import { IoHome } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Alerts from './Alerts';
import SkeletonUser from './SkeletonUser';

function User() {
  //Dummy variables for return on failure
  const demoUser: userModel = {id: -1, name: "", username: "", email: "", phone: "", website: ""};

  const { id } = useParams();
  const navigate = useNavigate();
  const {fetchUser, deleteUser, updateUser, loading, setLoading} = useContext(userContext)!;
  const [user, setUser] = useState<userModel>(demoUser);
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);
  const [data, setData] = useState<userModel>({name: "", username: "", id: 11, phone: "", website: "", email: ""});
  const isInvalid = !data?.name || !data?.username || !data?.email || !data?.phone || !data?.website;

  async function getUser(id: number) {
    setLoading(true);
    const res = await fetchUser(id);
    setUser(res);
    setLoading(false);
  }

  function navigateHome(): void {
    if(updatingUser || loading) return;
    navigate('/');
  }

  function removeUser(): void {
    if(updatingUser || loading) return;
    deleteUser(Number(id));
    navigate('/');
  }

  function handleCross():void {
    setUpdatingUser(false);
  }

  function handleUpdateUser(): void{
    if(updatingUser || loading) return;
    setUpdatingUser(true);
    setData(user);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault();
    setUpdatingUser(false);
    setLoading(true);
    await updateUser(data);
    setUser(data);
    setLoading(false);
  }

  useEffect(() => {
    getUser(Number(id));
  }, []);
  
  return (
    <>
    <Alerts />
    {/* //Conditional display of Form element*/}
    {updatingUser && <div className="z-2 absolute w-full h-full flex justify-center items-center px-5 md:px-16 lg:px-32">
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
          <button type="submit" disabled={isInvalid} className="px-6 py-2 text-amber-50 bg-green-800 hover:bg-green-600 active:bg-green-700 hover:cursor-pointer">Update !</button>
        </div>
      </form>
    </div>}
    {/* Conditional display of Skeleton component */}
    {loading && <SkeletonUser />}
    {!loading && <div className="z-1 flex flex-col lg:flex-row justify-center items-center gap-10 w-full min-h-screen pt-12 px-2 lg:px-24 bg-[#0d1b2a] text-amber-50">
      <div className={`flex flex-col gap-3 px-3 w-full ${updatingUser?"opacity-15":""}`}>
        <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
          <p className="w-24">ID :</p>
          <p>{user.id}</p>
        </div>
        <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
          <p className="w-24">Name :</p>
          <p>{user.name}</p>
        </div>
        <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
          <p className="w-24">Username :</p>
          <p>{user.username}</p>
        </div>
        <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
          <p className="w-24">email :</p>
          <p>{user.email}</p>
        </div>
        <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
          <p className="w-24">phone :</p>
          <p>{user.phone}</p>
        </div>
        <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
          <p className="w-24">Website :</p>
          <p>{user.website}</p>
        </div>
      </div>
      <div className={`flex flex-row lg:flex-col justify-center gap-5 ${updatingUser?"opacity-15":""}`}>
        <button className="px-4 py-3 text-3xl border rounded-lg bg-emerald-700 hover:bg-emerald-900 active:bg-emerald-500 hover:cursor-pointer" onClick={()=>{navigateHome()}}><IoHome /></button>
        <button className="px-4 py-3 text-3xl border rounded-lg bg-blue-600 hover:bg-blue-800 active:bg-blue-500 hover:cursor-pointer" onClick={handleUpdateUser}><FaEdit /></button>
        <button className="px-4 py-3 text-3xl border rounded-lg bg-pink-700 hover:bg-pink-900 active:bg-pink-500 hover:cursor-pointer" onClick={removeUser}><MdDelete /></button>
      </div>
    </div>}
    </>
  )
}

export default User