import { useRouteError,Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
            <div className="relative">
                <h1 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-red-700 text-6xl">{err.status}</h1>
                <div className="bg-cover bg-center h-48" style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}></div>
            </div>
            <div className="text-center mt-8">
                <h3 className="text-3xl font-semibold text-red-500">{err.data}</h3>
                <p className="text-lg text-gray-700 p-4">The page you're looking for seems to be not available.</p>
                <p className="text-lg text-red-600 ">{err.status} {err.statusText}</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">Go to Home</a>
            </div>
        </div>
    </div>
);
};

export default Error;
