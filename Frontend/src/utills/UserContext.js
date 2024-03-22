import { createContext } from "react";
import { RestroData } from "../Config";



const UserContext=createContext({user:{

        name:"Saif khan",
        email:"saif@gmail.com",
        RestroData,

}})
// for showing the name in react developer tool 
UserContext.displayName="UserContext"

export default UserContext;