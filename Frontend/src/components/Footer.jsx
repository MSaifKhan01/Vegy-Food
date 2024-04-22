import { useContext } from "react";
import UserContext from "../utills/UserContext";

const Footer = () => {
    const {user} = useContext(UserContext);
    console.log("from footer",user)

    return (
        <footer className="bg-black m-4 p-4 rounded-md">
            <h2 className="p-2 text-center text-white font-bold">
                Footer
            </h2>
            <p className=" text-center text-white font-semibold">
                This website is developed by {user.name} and their email is {user.email}.
            </p>
        </footer>
    );
}

export default Footer;
