import { useState, useContext } from "react";
import ClientContext from "../../../context/ClientContext";

function ClientModalContent() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientAddress: "",
    clientSuburb: "",
    clientPostcode: "",
    clientEmail: "",
    clientPhone: "",
    clientType: "",
  });

  const { createClient } = useContext(ClientContext);

  return (
    <main className="w-fit flex flex-col space-y-6 h-fit pb-6   rounded-lg">
      <h1 className="text-center text-2xl lg:text-5xl">Create new client.</h1>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="name" className="text-sm">
          Client Name
        </label>
        <input
          type="text"
          name="name"
          className="text-lg border-2 p-1 border-stone-500 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
        />
      </div>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="address" className="text-sm">
          Client Address
        </label>
        <input
          type="text"
          name="address"
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, clientAddress: e.target.value })
          }
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
              setFormData({ ...formData, clientSuburb: e.target.value })
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
              setFormData({ ...formData, clientPostcode: e.target.value })
            }
          />
        </div>
      </div>
      <div className="w-6/12  flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm">
            Client Email
          </label>
          <input
            type="text"
            name="email"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, clientEmail: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm">
            Client Phone
          </label>
          <input
            type="text"
            name="phone"
            className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
            onChange={(e) =>
              setFormData({ ...formData, clientPhone: e.target.value })
            }
          />
        </div>
      </div>
      <div className="w-full  flex flex-col  ">
        <label htmlFor="type" className="text-sm">
          Client Type
        </label>
        <select
          type="text"
          name="type"
          className="text-lg border-2 border-stone-500 p-1 outline-none focus:shadow-lg focus:transition-all"
          onChange={(e) =>
            setFormData({ ...formData, clientType: e.target.value })
          }
        >
          <option></option>
          <option>Business</option>
          <option>Personal</option>
        </select>
      </div>
      <div>
        <button
          className="px-4 py-2 border-2 rounded-lg bg-green-400 text-stone-800 flex items-center space-x-2 hover:scale-95 hover:transition-all w-full justify-center"
          onClick={() => createClient(formData)}
        >
          <h1>Create Client</h1>
        </button>
      </div>
    </main>
  );
}

export default ClientModalContent;
