import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3000/api/auth",
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

  const deleteUser = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:3000/api/auth/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Deleted");

      getUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const editUser = async (id) => {

    const newName = prompt("Enter new name");

    if (!newName) return;

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/auth/${id}`,
        {
          name: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Updated");

      getUsers();

    } catch (error) {

      console.log(error);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  useEffect(() => {

    getUsers();

  }, []);

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

      <div className="bg-white shadow-lg rounded-2xl p-6">

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

                <td className="p-3 flex gap-8">

                  <button
                    onClick={() =>
                      editUser(user._id)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteUser(user._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard; 