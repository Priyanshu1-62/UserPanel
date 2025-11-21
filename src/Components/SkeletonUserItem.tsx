
function SkeletonUserItem() {
  return (
    // Skeleton version of corresponding component
    <div className="w-full flex items-center py-4 text-[#2e2456] animate-pulse">
      <div className="py-3 px-3 border-4 rounded-2xl bg-[#2e2456]">
        <p>6</p>
      </div>
      <div className="py-3 px-3 border-4 rounded-2xl w-full bg-[#2e2456]">
        <p>Jone Doe</p>
      </div>
      <button className="py-3 px-3 border-4 rounded-2xl text-[#946e07] bg-[#946e07]">
        Manage
      </button>
    </div>
  )
}

export default SkeletonUserItem