function ProfileCard({
  profile,
  setProfileModal,
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl shadow px-4 py-2">

      <img
        src={
          profile?.profileImage
            ? `http://localhost:3000/${profile.profileImage}`
            : "https://via.placeholder.com/150"
        }
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <p className="font-semibold text-sm">{profile?.name}</p>
        <p className="text-xs text-gray-500">{profile?.email}</p>
      </div>

      <button
        onClick={() => setProfileModal(true)}
        className="bg-blue-500 text-white text-xs px-3 py-1 rounded-lg ml-2"
      >
        Edit
      </button>

    </div>
  );
}

export default ProfileCard;