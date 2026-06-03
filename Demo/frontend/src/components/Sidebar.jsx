import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (

    <div className="w-64 h-screen bg-gray-500 text-white fixed left-0 top-0 p-5">

      <div className="flex flex-col gap-4">

        <NavLink to="/dashboard" end
          className={({ isActive }) =>
            `p-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `p-3 rounded-lg transition-all duration-200 ${ isActive
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-800"
            }`
          }
        >
          Products
        </NavLink>

     
  <NavLink
          to="/dashboard/cart"
          className={({ isActive }) =>
            `p-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gray-900 text-white"
                : "hover:bg-gray-800"
            }`
          }
        >
          Cart
        </NavLink>



<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    `w-14 h-14 flex items-center justify-center rounded-full 
     text-xs font-semibold transition-all duration-200
     ${
       isActive
         ? "bg-gray-900 text-white"
         : "bg-gray-700 text-white hover:bg-gray-800"
     }`
  }
>
My Profile
</NavLink>


        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 p-3 rounded-lg mt-10 transition-all duration-200"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Sidebar;