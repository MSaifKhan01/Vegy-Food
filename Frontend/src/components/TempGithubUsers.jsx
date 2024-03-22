import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../utills/UserSlice";

const GitHubUsers = () => {
  const dispatch = useDispatch();

  const fetchGitHubUsers = () => {
    dispatch(getAllUsers());
  };

  const users = useSelector((state) => state.Users.users);
  console.log("from temp Github Users component : ",users)

  return (
    <div className="p-10 bg-gray-100">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={fetchGitHubUsers}
      >
        Fetch GitHub Users
      </button>
      <div className="mt-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center mb-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-10 h-10 rounded-full mr-2"
            />
            <h1 className="text-lg font-bold">{user.login}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubUsers;
