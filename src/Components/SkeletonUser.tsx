import { IoHome } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function SkeletonUser() {
  return (
    // Skeleton version of corresponding component
    <div className="z-1 w-full min-h-screen bg-[#0d1b2a] text-amber-50">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full min-h-screen gap-10 pt-12 px-2 lg:px-24 animate-pulse">
        <div className={`flex flex-col gap-3 px-3 w-full`}>
          <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
            <p className="w-24 text-[#50467d]">ID :</p>
            <p></p>
          </div>
          <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
            <p className="w-24 text-[#50467d]">Name :</p>
            <p></p>
          </div>
          <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
            <p className="w-24 text-[#50467d]">Username :</p>
            <p></p>
          </div>
          <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
            <p className="w-24 text-[#50467d]">email :</p>
            <p></p>
          </div>
          <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
            <p className="w-24 text-[#50467d]">phone :</p>
            <p></p>
          </div>
          <div className="flex items-center gap-3 py-3 px-3 border-2 rounded-xl bg-[#50467d]">
            <p className="w-24 text-[#50467d]">Website :</p>
            <p></p>
          </div>
        </div>
        <div className={`flex flex-row lg:flex-col justify-center gap-5`}>
          <button className="px-4 py-3 text-3xl border rounded-lg text-emerald-700 bg-emerald-700 hover:bg-emerald-900 active:bg-emerald-500 hover:cursor-pointer"><IoHome /></button>
          <button className="px-4 py-3 text-3xl border rounded-lg text-blue-600 bg-blue-600 hover:bg-blue-800 active:bg-blue-500 hover:cursor-pointer"><FaEdit /></button>
          <button className="px-4 py-3 text-3xl border rounded-lg text-pink-700 bg-pink-700 hover:bg-pink-900 active:bg-pink-500 hover:cursor-pointer"><MdDelete /></button>
        </div>
      </div>
    </div>
  )
}

export default SkeletonUser