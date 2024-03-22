
import {createBrowserRouter,Outlet,RouterProvider} from "react-router-dom"

import {lazy,Suspense, useState} from "react"
import  ReactDOM  from "react-dom/client"
import Error from "./components/Error"
import Header from "./components/Header"
import Footer from "./components/Footer"
import About from "./components/About"
import Body from "./components/Body"


import RestaurentMenu from "./components/RestaurentMenu.jsx"
import Contact from "./components/Contact.jsx"
import Shimmer from "./components/Shimmer.jsx"
import UserContext from "./utills/UserContext.js"
import { RestroData } from "./Config.js"

import {Provider} from "react-redux"
import store from "./utills/store.js"
import Cart from "./components/Cart.jsx"


// lazy method using for code (component ) chunking 
let Inatamart= lazy(()=>{
    return import("./components/Instamart.jsx")
})


const AppLayout=()=>{
    const [user,setUser]=useState({
        name:"Mohd Saif khan",
        email:"saif0715@gmail.com",
        RestroData
    })
    return(
        <Provider store={store}>
        <UserContext.Provider value={{user,setUser,}}>
        <Header />
        <Outlet />
        <Footer />
        </UserContext.Provider>
     
        </Provider>
    )
}


const AppRouter= createBrowserRouter([
    {
        path:"/",
        element:<AppLayout />,
        errorElement:<Error />,
        children:[
            {
                path:"/about",
                element:<About />,
                // children:[
                //     {
                //         path:"contact",
                //         element:<Contact />
                //     }
                // ]
            },
            {
                path:"/",
                element:<Body />

            },
            {
                path:"/restaurant/:id",
                element:<RestaurentMenu />
            },
            {
                path:"/instamart",
                element:(
                    // Suspense using for allows components to "suspend" rendering while they wait for some asynchronous data to resolve
                    <Suspense fallback={<Shimmer />}>
                        <Inatamart />
                    </Suspense>
                )
            },
            {
                path:"/cart",
                element:<Cart />
            },
            {
                path:"/about/contact",
                element:<Contact />
            },
       
        ]
    }
])

const ReactPath= ReactDOM.createRoot(document.getElementById("root"))

ReactPath.render(<RouterProvider router={AppRouter} />)