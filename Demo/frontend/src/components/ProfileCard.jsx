import Avatar from "react-avatar";

function ProfileCard({
  profile,
  setProfileModal,
}) {
  // console.log(profile.profileImage,'kpp');
  
  // console.log(`http://localhost:3000/${profile.profileImage}`);
  
  return (
    <div className="flex items-center">

      <div
        onClick={() => setProfileModal(true)}
        className="cursor-pointer"
      >
        {profile?.profileImage ? (
          <img
             src={`http://localhost:3000/uploads/profiles/${profile.profileImage}`}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border"
          />
        ) : (

          // <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
          //   {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          // </div>

          <Avatar
                name={profile?.name || "User"}
                   size="48"
                    round={true}
                   />
        )}
      </div>



    </div>
  );
}

export default ProfileCard;