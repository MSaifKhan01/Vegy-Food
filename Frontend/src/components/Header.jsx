import { Logo_Url } from "../Config";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../utills/UserContext";
import { useSelector } from "react-redux";


const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Instamart",
    path: "/instamart",
  },
  // {
  //   title: "Cart",
  //   path: "/cart",
  // },
  {
    title: "Contact",
    path: "/about/contact",
  },
];

export const Title = () => {
  return (
    <Link to="/">
      <img className="logo ml-2.5 w-[70px]" alt={"logo"} src={Logo_Url} />
    </Link>
  );
};

export const NavComponent = () => {
  // const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const cartItem = useSelector((store) => store.cart.items);
  const Users = useSelector((store) => store.User.user);
  // const CartItems = useSelector((store) => store.cart.item);
  console.log("rom reudx----:",Users)

  console.log("errtty",cartItem)
  const { user } = useContext(UserContext);

  // const name = user ? user.name || user.email : null;
  // if(Users.length!==0){
    // const name = Users[Users.length-1].isUser ? Users[Users.length-1].isUser
    // .  username || Users[Users.length-1].isUser
    // .email : null;
    // console.log(name)
  // }



  const closeMenu = () => {
    const menu = document.querySelector(".menu-content-container");
    menu.classList.remove("active");
    menu.classList.add("false");
    setMenuActive(!menuActive);
  };

  const handleSignOut = () => {
    setIsLoggedin(false);
    console.log("hkk out");
  };

  const handleSignIn = () => {
    setIsLoggedin(true);
    console.log("hkk in");
  };

  return (
    <div className="flex items-center justify-between ">
      {isLoggedin ? (
        <div className="flex justify-center items-center">
    <span className="py-2.5 px-1 mt-2.5 mr-1 font-bold text-green">
  {Users.length !== 0 ? (
    Users[Users.length - 1].isUser.username || Users[Users.length - 1].isUser.email 
  ) : (
    "Please Login"
  )}
</span>


        </div>
      ) : null}

      <div
        className={`menu-content-container flex items-center pr-7 ${
          menuActive && "active"
        }`}
      >
        <ul
          className={`h-full lg:flex xl:flex md:flex items-center pr-5 ${
            !menuActive && "hidden"
          }  ${menuActive && "flex flex-col flex-start "}`}
        >
          {navLinks.map((link, index) => (
            <li key={index} className="p-2.5">
              <Link to={link.path}>
                <button className="nav--btn">{link.title}</button>
              </Link>
            </li>
          ))}
          <li className="p-2.5">
          <Link to="/cart">
              <button className="nav--btn">
                Cart <span className="text-orange font-bold pl-1">{cartItem.length}</span>{" "}
              </button>
            </Link>
          </li>

          <li className="p-2.5">
            <button
              className="nav--btn"
              onClick={() => {
                isLoggedin ? handleSignOut() : handleSignIn();
              }}
            >
              {isLoggedin ? "Logout" : "Login "}
              <span
                className={
                  isLoggedin
                    ? "text-green-500 font-bold text-lg"
                    : "text-red-600 text-lg"
                }
              >
                ●
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div
  className="lg:hidden xl:hidden md:hidden flex w-[65px] text-base text-blue-dark cursor-pointer items-center justify-center"
  onClick={() => {
    console.log("icon");
    closeMenu();
    setMenuActive(!menuActive);
  }}
>
  <div className="text-3xl text-green-500">&#8801;</div>
</div>

    </div>
  );
};

export const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 border-b bg-red-100 border-gray-200">
      <Title />

      <NavComponent />
    </div>
  );
};

export default Header;
