
// import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import {lazy,Suspense, useState} from "react"
// import  ReactDOM  from "react-dom/client"
// import Error from "./components/Error"
// import Header from "./components/Header"
// import Footer from "./components/Footer"
// import About from "./components/About"
// import Body from "./components/Body"


// import RestaurentMenu from "./components/RestaurentMenu.jsx"
// import Contact from "./components/Contact.jsx"
// import Shimmer from "./components/Shimmer.jsx"
// import UserContext from "./utills/UserContext.js"
// // import { RestroData } from "./Config.js"

// import { SignIn } from "./utills/UserSlice.js";
// import { useDispatch } from "react-redux";

// import {Provider} from "react-redux"
// import store from "./utills/store.js"
// import Cart from "./components/Cart.jsx"
// import Dashboard from "./components/DashboardGetOrder.jsx"
// import Login from "./components/Login"
// import Signup from "./components/SignUp.jsx"
// import OtpForPassword from "./components/OtpForPassword.jsx";
// // import Order from "./components/Order.jsx"


// // lazy method using for code (component ) chunking 
// let Inatamart= lazy(()=>{
//     return import("./components/Instamart.jsx")
// })


// const AppLayout= async()=>{
//     const [user,setUser]=useState({
//         name:"",
//         email:"",
//         // name:"Mohd Saif khan",
//         // email:"saif0715@gmail.com",
//         // RestroData
//     })
//     const dispatch = useDispatch();
//     const action = await dispatch(SignIn(loginUserData));
//     if(action.payload){
//         setUser({ name: action.payload.isUser.username, email: action.payload.isUser.email }); // Set user data in context

//     }
  
//     return(
//         <Provider store={store}>
//         <UserContext.Provider value={{user,setUser,}}>
//         <Header />
//         <Outlet />
//         <Footer />
//         <ToastContainer/>
//         </UserContext.Provider>

        
     
//         </Provider>
//     )
// }


// const AppRouter= createBrowserRouter([
//     {
//         path:"/",
//         element:<AppLayout />,
//         errorElement:<Error />,
//         children:[
//             {
//                 path:"/about",
//                 element:<About />,
//                 // children:[
//                 //     {
//                 //         path:"contact",
//                 //         element:<Contact />
//                 //     }
//                 // ]
//             },
//             {
//                 path:"/",
//                 element:<Body />

//             },
//             {
//                 path:"/restaurant/:id",
//                 element:<RestaurentMenu />
//             },
//             {
//                 path:"/instamart",
//                 element:(
//                     // Suspense using for allows components to "suspend" rendering while they wait for some asynchronous data to resolve
//                     <Suspense fallback={<Shimmer />}>
//                         <Inatamart />
//                     </Suspense>
//                 )
//             },
//             {
//                 path:"/cart",
//                 element:<Cart />
//             },
            
            
//             {
//                 path:"/about/contact",
//                 element:<Contact />
//             },
//             {
//                 path:"/order",
//                 element:<Dashboard />
              
//             },
//             {
//                 path:"/login",
//                 element:<Login />
//             },
//             {
//                 path:"/Signup",
//                 element:<Signup />
//             },
//             {
//                 path:"/reset-password",
//                 element:<OtpForPassword />
//             },
       
//         ]
//     }
// ])

// const ReactPath= ReactDOM.createRoot(document.getElementById("root"))

// ReactPath.render(<RouterProvider router={AppRouter} />)






import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SignIn } from "./utills/UserSlice.js";
import { Provider } from "react-redux";
import store from "./utills/store.js";
import UserContext from "./utills/UserContext.js";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./components/Error";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Body from "./components/Body";
import RestaurentMenu from "./components/RestaurentMenu.jsx";
import Contact from "./components/Contact.jsx";
import Shimmer from "./components/Shimmer.jsx";
import Cart from "./components/Cart.jsx";
import Dashboard from "./components/DashboardGetOrder.jsx";
import Login from "./components/Login";
import Signup from "./components/SignUp.jsx";
import OtpForPassword from "./components/OtpForPassword.jsx";
import { lazy, Suspense } from "react";
let Inatamart = lazy(() => {
  return import("./components/Instamart.jsx");
});

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(SignIn(loginUserData));
        if (action.payload) {
          setUser({
            name: action.payload.isUser.username,
            email: action.payload.isUser.email,
          });
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Provider store={store}>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer />
      </UserContext.Provider>
    </Provider>
  );
};

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/about", element: <About /> },
      { path: "/", element: <Body /> },
      { path: "/restaurant/:id", element: <RestaurentMenu /> },
      {
        path: "/instamart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Inatamart />
          </Suspense>
        ),
      },
      { path: "/cart", element: <Cart /> },
      { path: "/about/contact", element: <Contact /> },
      { path: "/order", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/Signup", element: <Signup /> },
      { path: "/reset-password", element: <OtpForPassword /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={AppRouter} />
);
