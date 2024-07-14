
import { useContext, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetCartItems } from "../utills/cartSlice.js";
import UserContext from "../utills/UserContext";

import  LogoJSA from "../Image/LogoJSA.png"



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
  {
    title: "Cart",
    path: "/cart",
  },
  
  {
    title: "Orders",
    path: "/order",
  },
  {
    title: "Contact",
    path: "/about/contact",
  },
];

export const Title = () => {
  return (
    <Link to="/">
      <img className="logo ml-2.5 w-[70px]" alt={"logo"} src={LogoJSA} />
    </Link>
  );
};

export const NavComponent = () => {

  const [menuActive, setMenuActive] = useState(false);
  let cartItem = useSelector((store) => store.cart.items);
  const Users = useSelector((store) => store.User.user);

  const userData = sessionStorage.getItem("User");
  // console.log("userData",userData)
  // const parsedUserData = JSON.parse(userData);
  const parsedUserData = userData !== undefined ? JSON.parse(userData) : null;
  
  

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

 
  const closeMenu = () => {
    const menu = document.querySelector(".menu-content-container");
    menu.classList.remove("active");
    menu.classList.add("false");
    setMenuActive(!menuActive);
  };

  const handleSignOut = () => {
    // setIsLoggedin(false);
    sessionStorage.clear()
    // window.location.href = "http://localhost:1234/";
    window.location.href = "https://vegy-food.vercel.app/";
    // navigate('/');
    console.log("hkk out");
  };

  const handleSignIn = () => {
    // setIsLoggedin(true);
    console.log("hkk in");
  };

  // const handleCartRoutte=()=>{
  //   window.location.href = "https://vegy-food.vercel.app/cart";
  // }

  useEffect(()=>{
     cartItem = useSelector((store) => store.cart.items);
  },[])

  return (
    <div className="flex items-center justify-between ">
      {parsedUserData ? (
        <div className="flex justify-center items-center">
    <span className="py-2.5 px-1 mt-2.5 mr-1 font-bold text-green">
  {parsedUserData.username? (
    parsedUserData.username || parsedUserData.email 
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
          {/* {navLinks.map((link, index) => (
            <li key={index} className="p-2.5">
              <Link to={link.path}>
                <button className="nav--btn">{link.title}</button>
              </Link>
            </li>
          ))} */}

{navLinks.map((link, index) => (
  <li key={index} className="p-2.5">
    {link.path === "/cart" ? (
      // <Link to={link.path}>
      //   <button className="nav--btn">
      //     {link.title}{" "}
      //     <span className="text-orange font-bold pl-1">
      //       {cartItem?.length ?? 0}
      //     </span>
      //   </button>
      // </Link>

      <a href={link.path}>
  <button className="nav--btn">
    {link.title}{" "}
    <span className="text-orange font-bold pl-1">
      {cartItem?.length ?? 0}
    </span>
  </button>
</a>


      
    ) : (
      <Link to={link.path}>
        <button className="nav--btn">{link.title}</button>
      </Link>
    )}
  </li>
))}
          {/* <li className="p-2.5">
          

              <button className="nav--btn" onClick={handleCartRoutte}>
                Cart <span className="text-orange font-bold pl-1">{cartItem?.length ?? 0}</span>{" "}

              </button>
             
          </li> */}

          <li className="p-2.5">
           <Link to="/login">
           <button
              className="nav--btn"
              onClick={() => {
                parsedUserData ? handleSignOut() : handleSignIn();
              }}
            >
              {parsedUserData ? "Logout" : "Login "}
              <span
                className={
                  parsedUserData
                    ? "text-green-500 font-bold text-lg"
                    : "text-red-600 text-lg"
                }
              >
                ●
              </span>
            </button>
           </Link>
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

  const dispatch=useDispatch()
  const cartItems = useSelector((store) => store.cart.items);
   
  const fetchCartItems = () => {
    dispatch(GetCartItems());
    console.log("fetchCartItems called");
  };

  
  useEffect(() => {
    // setTimeout(() => {
      fetchCartItems();
    // }, 1000);
    console.log("useEffect called ------")
  }, [dispatch]);



  

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 border-b bg-red-100 border-gray-200">
      <Title />

      <NavComponent />
    </div>
  );
};

export default Header;

