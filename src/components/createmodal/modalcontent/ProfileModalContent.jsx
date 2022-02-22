import { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";

function ProfileModalContent() {
  const { user, updateUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [userEmail, setUserEmail] = useState(user.email);
  const [formData, setFormData] = useState({
    userSuburb: "",
    userPostcode: "",
    userPhone: "",
    userType: "",
  });

  return (
    <main className="w-fit flex flex-col space-y-6 h-fit pb-6   rounded-lg">
      <h1 className="text-center text-2xl lg:text-5xl">
        {user.username} - Edit Details
      </h1>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="name" className="text-sm">
          Username
        </label>
        <input
          type="text"
          name="name"
          value={username}
          className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="address" className="text-sm">
          Email
        </label>
        <input
          type="text"
          name="email"
          value={userEmail}
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div className="w-6/12  flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col">
          <label htmlFor="suburb" className="text-sm">
            Suburb
          </label>
          <input
            type="text"
            name="suburb"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, userSuburb: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postcode" className="text-sm">
            Postcode
          </label>
          <input
            type="text"
            name="postcode"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, userPostcode: e.target.value })
            }
          />
        </div>
      </div>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="phone" className="text-sm">
          Phone
        </label>
        <input
          type="text"
          name="phone"
          className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, userPhone: e.target.value })
          }
        />
      </div>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="type" className="text-sm">
          Position
        </label>
        <select
          type="text"
          name="type"
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, userType: e.target.value })
          }
        >
          <option></option>
          <option>Sales</option>
          <option>Admin</option>
          <option>I.T</option>
          <option>Labour - Carpenter</option>
          <option>Labour - Electrician</option>
        </select>
      </div>
      <div>
        <button
          className="px-4 py-2 border-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all w-full justify-center"
          onClick={() => updateUser(userEmail, username, formData, true)}
        >
          <h1>Create Client</h1>
        </button>
      </div>
    </main>
  );
}

export default ProfileModalContent;
