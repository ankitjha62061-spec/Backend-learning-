import { useState, useEffect } from "react";
import { updateProfile } from "../services/ProfileApi";

function ProfileModal({ profileModal, setProfileModal, profile,fetchProfile,
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setMobile(profile.mobile || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

  if (!profileModal) return null;

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("address", address);

    if (file) {
      formData.append("profileImage", file);
    }

    await updateProfile(formData);

    await fetchProfile();

    setProfileModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          Edit Profile
        </h2>

      
        <div className="flex justify-center mb-4">

          {profile?.profileImage ? (
            <img
              src={`http://localhost:3000/${profile.profileImage}`}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

        </div>

     
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

      
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 w-full mb-3"
        />

    
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <div className="flex gap-3">

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() => setProfileModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileModal;