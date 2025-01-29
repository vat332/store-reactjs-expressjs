import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
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
    setShowSidebar(!showSidebar);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

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
    <div>
      {/* Sidebar */}
      <div
        style={{ zIndex: 999 }}
        className={`${
          showSidebar ? "flex" : "hidden"
        } lg:flex flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed transition-all duration-300`}
        id="navigation-container"
      >
        <div className="flex flex-col mt-[4rem] space-y-4">
          <Link
            to="/"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
            onClick={closeSidebar}
          >
            <AiOutlineHome className="mr-2" size={26} />
            <span className="ml-2">Home</span>
          </Link>

          <Link
            to="/shop"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
            onClick={closeSidebar}
          >
            <AiOutlineShopping className="mr-2" size={26} />
            <span className="ml-2">Shop</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
            onClick={closeSidebar}
          >
            <AiOutlineShoppingCart className="mr-2" size={26} />
            <span className="ml-2">Cart</span>
          </Link>
          <Link
            to="/favorite"
            className="flex items-center text-white transition-all duration-300 hover:translate-x-2"
            onClick={closeSidebar}
          >
            <FaHeart className="mr-2" size={26} />
            <span className="ml-2">Favorites</span>
          </Link>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-800 focus:outline-none"
          >
            {userInfo ? (
              <span className="text-white">{userInfo.username}</span>
            ) : (
              <></>
            )}
            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-2 transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 space-y-2 bg-white text-gray-600 rounded-lg shadow-lg ${
                !userInfo.isAdmin ? "-top-20" : "-top-80"
              }`}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeSidebar}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeSidebar}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeSidebar}
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeSidebar}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={closeSidebar}
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeSidebar}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
