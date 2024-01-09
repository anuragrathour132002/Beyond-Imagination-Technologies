import React, { useContext } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div
      className={`${open ? "w-full" : "w-20 "
        } bg-dark-purple h-20 p-5 pt-8 relative duration-300 flex justify-between items-center`}
    >
      <div>
        <h1 className="text-2xl font-semibold mb-6 text-white  ">
          Beyond Imagination Technologies
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-white font-semibold">
          {user ? user.email : "Guest"}
        </span>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
