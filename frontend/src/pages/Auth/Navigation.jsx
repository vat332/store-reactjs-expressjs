import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";

import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLoginMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex items-center flex-col mt-[4rem] space-y-4">
        <Link
          to="/"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2" size={26} />
          <span className="hidden sm:block">Home</span>{" "}
        </Link>

        <Link
          to="/shop"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2" size={26} />
          <span className="hidden sm:block">Shop</span>{" "}
        </Link>
        <Link
          to="/cart"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2" size={26} />
          <span className="hidden sm:block">Cart</span>{" "}
        </Link>
        <Link
          to="/favorite"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <FaHeart className="mr-2" size={26} />
          <span className="hidden sm:block">Favorites</span>{" "}
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-8000 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>
      </div>
      <ul className="space-y-4">
        <li>
          <Link
            to="/login"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2" size={26} />
            <span>Login</span>{" "}
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
          >
            <AiOutlineUserAdd className="mr-2" size={26} />
            <span>Register</span>{" "}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
