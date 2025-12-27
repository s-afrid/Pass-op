import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords);
  }

  useEffect(() => {
    getPasswords()
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: "",
      theme: "light",
    });
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/icons/eye-slash.svg")) {
      passwordRef.current.type = "password";
      ref.current.src = "/icons/eye.svg";
    } else {
      ref.current.src = "/icons/eye-slash.svg";
    }
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    let res = await fetch("http://localhost:3000/",{ method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...form, id: uuidv4()})
    })
    setform({ site: "", username: "", password: "" });
    toast.success("Password saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: "",
      theme: "dark",
    });
    } else {
      toast.error("Password not saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: "",
      theme: "dark",
    });
    }
    
  };

  const deletePassword = async (id) => {
    let c = confirm("Do you really wanted to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
       let res = await fetch("http://localhost:3000/",{ method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: id})
    })
    }
    toast.info("Password Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: "",
      theme: "dark",
    });
  };

  const editPassword = async (id) => {
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    let res = await fetch("http://localhost:3000/",{ method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: id})
    })
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="p-3 mycontainer min-h-[88.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt; </span>
          <span>Pass</span>
          <span className="text-green-400"> Op</span>
          <span className="text-green-500"> /&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>

        <div className="flex flex-col p-4 gap-5 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="bg-white rounded-full border border-green-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="bg-white rounded-full border border-green-500 w-full md:w-1/2 px-4 py-1"
              type="text"
              name="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="bg-white rounded-full border border-green-500 w-full px-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-0 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="pt-1 px-2"
                  width={35}
                  src="/icons/eye.svg"
                  alt="show"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 rounded-full px-6 py-2 w-fit hover:bg-green-300 gap-4 border-1 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="w-full rounded-lg overflow-hidden mb-10">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2 text-start px-2">Site</th>
                  <th className="py-2 text-start px-2">Username</th>
                  <th className="py-2 text-start px-2">Password</th>
                  <th className="py-2 text-start px-2">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 px-2 border-2 border-white text-start">
                        <div className="flex justify-between items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordicon cursor-pointer size- flex items-center justify-center"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-2 border-white text-start">
                        <div className="flex justify-between items-center">
                          <span>{item.username}</span>
                          <div
                            className="lordicon cursor-pointer size- flex items-center justify-center"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-2 border-2 border-white text-start">
                        <div className="flex justify-between items-center">
                          <span>{item.password}</span>
                          <div
                            className="lordicon cursor-pointer size- flex items-center justify-center"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 px-2 border-2 border-white text-start">
                        <div className="flex items-center justify-around">
                          <span
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: "3px",
                                cursor: "pointer",
                              }}
                            ></lord-icon>
                          </span>
                          <span
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                padding: "3px",
                                cursor: "pointer",
                              }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
