import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa6";
import Logo from "D:/react projects/2_eCOMMERCE/Ecommerce/src/assets/logo.png";
import DarkMode from "../Navbar/DarkMode";
import { Link } from "react-router-dom";
import { useStore } from "../../Multipages/CartContext/Context";
import { useState , useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import NavbarJson from "../../components/Navbar/Navbar.json";
import { FaUserCircle } from "react-icons/fa";
import { CiLogin ,CiLogout} from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";




const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shopping", link: "/kidswear" },
  { id: 3, name: "Women", link: "/#" },
  { id: 4, name: "Men", link: "/#" },
  { id: 5, name: "Kid's", link: "/#" },
  { id: 6, name: "Delivery", link: "/delivery" },
];

const Navbar = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState();
  const [inout, setInout] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { favitem, cortitem, handleOrderPopup } = useStore();

  const getSubcategories = (category) => {
    return NavbarJson.find((item) => item.category === category);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const user = localStorage.getItem("username");

    if (auth === "true" && user) {
      setInout(true);
      setUsername(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("username")
    setInout(false)
    setUsername("")
    navigate("/")
    window.location.reload()

  }

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 top-0 left-0 w-full z-50">
      <div className="bg-white dark:bg-gray-900 py-3 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo and Desktop Menu */}
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
              <img src={Logo} alt="Logo" className="w-10" />
              Shopsy
            </Link>

            <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
              {Menu.map((item) => {
                const isDropdown = ["Women", "Men", "Kid's"].includes(item.name);
                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => isDropdown && setHoveredCategory(item.name)}
                    onMouseLeave={() => isDropdown && setHoveredCategory(null)}
                  >
                    <Link to={item.link} className="hover:text-orange-400 transition-colors flex items-center gap-1">
                      {item.name}
                      {isDropdown && <FaCaretDown />}
                    </Link>

                    {isDropdown && hoveredCategory === item.name && (
                      <div className="absolute right-0 top-full mt-0 bg-white text-black shadow-lg rounded z-50 w-[500px] md:-left-80 sm:w-[300px] sm:-right-20 md:w-[500px] lg:w-[700px] p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getSubcategories(item.name)?.sections?.map((section, index) => (
                          <div key={index}>
                            <h3 className="font-semibold text-sm uppercase tracking-[2px] mb-2 bg-gray-300 px-2 py-1 rounded">
                              {section.title}
                            </h3>
                            <ul className="space-y-1">
                              {section.items.map((subItem, i) => (
                                <li key={i}>
                                  <Link
                                    to={subItem.list?.[0]?.category ? `/category/${subItem.list[0].category}` : "#"}
                                    className="block text-sm hover:text-orange-500 leading-7"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 relative">
            <div className="relative hidden lg:block">
              <input
                type="search"
                placeholder="Search"
                className="w-[200px] hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-4 py-1 focus:outline-none"
              />
              <IoMdSearch className="absolute top-1/2 right-10 -translate-y-1/2 text-gray-500 hover:text-orange-500" />
            </div>

            <Link to="/favoritelist" className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white">
              <span className="absolute top-0 -right-1 text-white text-xs font-bold bg-amber-900 rounded-full h-5 w-5 flex items-center justify-center">
                {favitem.length}
              </span>
              <CiHeart size={30} />
            </Link>

            <Link
              to="/viewcart"
              onClick={handleOrderPopup}
              className="bg-gradient-to-r relative from-orange-400 to-orange-700 text-white py-1 px-4 rounded-full flex items-center gap-2"
            >
              <span className="absolute -top-2 bg-amber-800 text-white font-bold p-2 right-1 h-5 w-5 flex items-center justify-center rounded-full">
                {cortitem.length}
              </span>
              <FaCartShopping className="text-xl" />
            </Link>

            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
                {inout && username ? (
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-md font-bold uppercase" title={username}>
                    {username[0]}
                  </div>
                ) : (
                  <FaUserCircle size={30} className="text-blue-400" />
                )}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 shadow-2xl bg-white text-black p-5 capitalize rounded-2xl z-50">
                  {inout ? (
                    <>
                      <Link onClick={logout} className="flex items-center gap-3 pb-3" to="/">
                        <CiLogout size={20}  className="text-red-500" /> Logout
                      </Link>
                      <Link className="flex items-center gap-3" to="/profile">
                        <CgProfile size={20} /> Profile
                      </Link>
                    </>
                  ) : (
                    <Link onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 w-[80px]" to="/login">
                      <CiLogin size={20} className="text-blue-500" /> Log in
                    </Link>
                  )}
                </div>
              )}
            </div>

            <button onClick={toggleMenu} className="text-2xl sm:hidden">
              {menuOpen ? <FaTimes /> : <FaBarsStaggered />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden px-4 pb-4">
            <ul className="flex flex-col gap-4 mt-4 w-full">
              {Menu.map((item) => {
                const isDropdown = ["Women", "Men", "Kid's"].includes(item.name);
                return (
                  <li key={item.id}>
                    <div className="flex justify-between items-center">
                      <Link
                        to={item.link}
                        onClick={() => !isDropdown && toggleMenu()}
                        className="block font-medium hover:text-orange-400"
                      >
                        {item.name}
                      </Link>
                      {isDropdown && (
                        <button
                          onClick={() => setDropdownOpen(dropdownOpen === item.name ? null : item.name)}
                          className="text-orange-500"
                        >
                          <FaCaretDown />
                        </button>
                      )}
                    </div>

                    {isDropdown && dropdownOpen === item.name && (
                      <div className="bg-gray-100 rounded mt-2 p-3">
                        {getSubcategories(item.name)?.sections?.map((section, index) => (
                          <div key={index} className="mb-3">
                            <h4 className="font-semibold text-xs uppercase text-gray-600 mb-1">
                              {section.title}
                            </h4>
                            <ul className="space-y-1">
                              {section.items.map((subItem, i) => (
                                <li key={i}>
                                  <Link
                                    to={subItem.list?.[0]?.category ? `/category/${subItem.list[0].category}` : "#"}
                                    className="text-sm block text-gray-700 hover:text-orange-500"
                                    onClick={toggleMenu}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
