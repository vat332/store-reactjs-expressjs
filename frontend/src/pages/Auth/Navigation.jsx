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
const Navigation = () => {
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
          <span className="hidden sm:block">Home</span>
        </Link>

        <Link
          to="/shop"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2" size={26} />
          <span className="hidden sm:block">Shop</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2" size={26} />
          <span className="hidden sm:block">Cart</span>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
        >
          <FaHeart className="mr-2" size={26} />
          <span className="hidden sm:block">Cart</span>
        </Link>
      </div>
      <ul className="space-y-4">
        <li>
          <Link
            to="/login"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2" size={26} />
            <span>Login</span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
          >
            <AiOutlineUserAdd className="mr-2" size={26} />
            <span>Register</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
