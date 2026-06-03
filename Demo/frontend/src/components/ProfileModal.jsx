import { useState } from "react";
import { updateProfile } from "../services/ProfileApi";

function ProfileModal({ profileModal, setProfileModal }) {
  if (!profileModal) return null;

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);

      if (file) {
        formData.append("profileImage", file);
      }

      await updateProfile(formData);

      setProfileModal(false);
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      
      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl font-bold mb-4">
          Edit Profile
        </h2>

      
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />

    
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

{/* 
<label
  htmlFor="profileUpload"
  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
>
  Update Profile Picture
</label> */}



        <div className="flex gap-3">

          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
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