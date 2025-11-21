import type { userItemProps } from '../Models/userItemProps'

function UserItem({user, handleNavigateUser}: userItemProps) {
  return (
    <div className="w-full flex items-center py-4">
      <div className="py-3 px-3 border-2 md:border-4 rounded-2xl bg-[#50467d]">
        <p>{user.id}</p>
      </div>
      <div className="py-3 px-3 border-2 md:border-4 rounded-2xl w-full bg-[#50467d] truncate">
        <p>{user.name}</p>
      </div>
      <button className="py-3 px-3 border-2 md:border-4 rounded-2xl text-black bg-[#ffbe0b] hover:bg-yellow-600 active:bg-[#dfba57] hover:cursor-pointer" onClick={()=>{handleNavigateUser(user)}}>
        Manage
      </button>
    </div>
  )
}

export default UserItem