import { useEffect, useState } from "react";

import axios from "axios";

import EditModal from "../components/EditModal";

import DeleteModal from "../components/DeleteModal";

import SearchBar from "../components/SearchBar";

import { toast } from "react-toastify";

import { getProfile } from "../services/ProfileApi";
import ProfileModal from "../components/ProfileModal";
import ProfileCard from "../components/ProfileCard";



function Dashboard() {
const [users, setUsers] = useState([]);
 const [isOpen, setIsOpen] = useState(false);

  const [editId, setEditId] = useState("");

  const [editName, setEditName] = useState("");

  const [editEmail, setEditEmail] = useState("");

  const [deletePopup, setDeletePopup] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [search, setSearch] = useState("");

  const [debounceSearch, setDebounceSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [profile, setProfile] = useState(null);

  const [profileModal, setProfileModal] = 
  useState(false);

    const getUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(

        `http://localhost:3000/api/auth?search=${debounceSearch}&page=${page}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      setUsers(res.data.users);

      setTotalPages(res.data.totalPages);

    } catch (error) {

      console.log(error);

    }

  };
    const deleteUser = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `http://localhost:3000/api/auth/${deleteId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success("User deleted successfully", {
        autoClose: 500,
      });

      setDeletePopup(false);

      getUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete user"
      );

    }

  };

const fetchProfile = async () => {
  try {
    const res = await getProfile();

    console.log(res.data.user.profileImage,);

    setProfile(res.data.user);
  } catch (error) {
    console.log(error);
  }
};




   const editUser = (id, name, email) => {

    setEditId(id);

    setEditName(name);

    setEditEmail(email);

    setIsOpen(true);

  };


    const updateUser = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(

        `http://localhost:3000/api/auth/${editId}`,

        {
          name: editName,
          email: editEmail,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success("User updated successfully", {
        autoClose: 500,
      });

      setIsOpen(false);

      getUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update user"
      );

    }

  };


// useEffect(() => {

//     getUsers();

//     fetchProfile();

//   }, [debounceSearch, page]);



useEffect(() => {
  getUsers();
}, [debounceSearch, page]);



useEffect(() => {
  // alert('')
  fetchProfile();
}, []);

useEffect(() => {

    const timer = setTimeout(() => {

      setDebounceSearch(search);

      setPage(1);

    }, 1000);

    return () => clearTimeout(timer);

  }, [search]);


 return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <ProfileCard
          profile={profile}
          setProfileModal={setProfileModal}
        />

      </div>


  <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <table className="w-full">
            <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>
           <tbody>
  {users.length > 0 ? (
    users.map((user) => (
      <tr  key={user._id}
        className="border-b"
      >



        <td className="p-3">{user._id}</td>

        <td className="p-3">{user.name}</td>

        <td className="p-3">{user.email}</td>

        <td className="p-3 flex gap-4">
          <button
            onClick={() =>
              editUser(
                user._id,
                user.name,
                user.email
              )
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setDeleteId(user._id);
              setDeletePopup(true);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="4"
        className="text-center py-8 text-gray-500 font-semibold"
      >
        Not Found 
      </td>
    </tr>
  )}
</tbody>

        </table>




        <div className="flex justify-center items-center gap-4 mt-6">

          <button

            onClick={() => setPage(page - 1)}

            disabled={page === 1}

            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white"
            }`}
          >
            Prev
          </button>




          <p className="font-semibold">

            Page {page} of {totalPages}

          </p>




          <button

            onClick={() => setPage(page + 1)}

            disabled={page === totalPages}

            className={`px-4 py-2 rounded-lg ${
              page === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-black text-white"
            }`}
          >
            Next
          </button>

        </div>

      </div>




<ProfileModal
  profileModal={profileModal}
  setProfileModal={setProfileModal}
  profile={profile}
  fetchProfile={fetchProfile}
/>


      <EditModal

        isOpen={isOpen}

        setIsOpen={setIsOpen}

        editName={editName}

        setEditName={setEditName}

        editEmail={editEmail}

        setEditEmail={setEditEmail}

        updateUser={updateUser}

      />




      <DeleteModal

        deletePopup={deletePopup}

        setDeletePopup={setDeletePopup}

        deleteUser={deleteUser}

      />

    </div>

  );

}

export default Dashboard;