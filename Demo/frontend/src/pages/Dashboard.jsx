import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";


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

  const navigate = useNavigate();




const getUsers = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(

      `http://localhost:3000/api/auth?search=${debounceSearch}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    setUsers(res.data);

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
    toast.error("Failed to update user");
  }
};


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };



  
  useEffect(() => {

  getUsers();

}, [debounceSearch]);




  useEffect(() => {

    const timer = setTimeout(() => {

      setDebounceSearch(search);

    }, 1000);

    return () => clearTimeout(timer);

  }, [search]);




  return (

    <div className="min-h-screen bg-gray-100 p-10">

     

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

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

            {/* {filteredUsers.map((user) => ( */}
              {users.map((user) => (


              <tr
                key={user._id}
                className="border-b"
              >

                <td className="p-3">
                  {user._id}
                </td>

                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>




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

            ))}

          </tbody>

        </table>

      </div>





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