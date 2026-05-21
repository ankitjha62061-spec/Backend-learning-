import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <div className="w-64 h-screen bg-blue-500 text-white fixed left-0 top-0 p-5">

      {/* <h1 className="text-3xl font-bold mb-10">

    Products Page

      </h1> */}

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-gray-800 p-3 rounded-lg"
        >
          Dashboard
        </Link>

        <Link
          to="/dashboard/products"
          className="hover:bg-gray-800 p-3 rounded-lg"
        >
          Products
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 p-3 rounded-lg mt-10"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;