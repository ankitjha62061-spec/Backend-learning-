import { useState, useEffect } from "react";
import { updateProfile } from "../services/ProfileApi";

function ProfileModal({ profileModal,setProfileModal, profile,fetchProfile,
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
const [preview, setPreview] = useState("");


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

  const handleImageClick = () => {
    document.getElementById("profileImageInput").click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          Edit Profile
        </h2>

        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          // onChange={(e) => setFile(e.target.files[0])}
            onChange={(e) => {
            const selectedFile = e.target.files[0];
               if (selectedFile) {
              setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
             }
            }}
            />
 
        <div className="flex flex-col items-center mb-4">

          <div
            onClick={handleImageClick}
            className="relative w-20 h-20 cursor-pointer group"
          >
         
                         {preview ? (
                          <img
                            src={preview}
                            alt="preview"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : profile?.profileImage ? (
                          <img
                            src={`http://localhost:3000/uploads/profiles/${profile.profileImage}`}
                              alt="profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (



              <div className="w-full h-full rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                {name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
                {/* 
                 <button
               onClick={handleRemoveImage}
              className="text-red-500 text-xs mt-2 hover:underline"
                             >
                    Remove Photo
                    </button> */}


            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              📷 
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {file ? file.name : "Click photo to change"}
          </p>

        </div>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        {/* <input
          type="tel"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        /> */}

        <input
  type="tel"
  placeholder="Mobile"
  value={mobile}
  onChange={(e) => {
    const onlyNumbers = (e.target.value)
    setMobile(onlyNumbers);
  }}
  className="border p-2 w-full mb-3 rounded"
/>

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
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