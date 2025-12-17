import React, { useEffect } from "react";
import { useRef, useState } from "react";

const Manager = () => {

  const ref = useRef()
  const [form, setform] = useState({site: "", username: "", password: ""})
  const [passwordArray, setpasswordArray] = useState([])


  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    
    if(passwords){
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])
  
  const showPassword = ()=>{
    if(ref.current.src.includes("/icons/eye-slash.svg")){
      ref.current.src = '/icons/eye.svg';
    } else {
ref.current.src = "/icons/eye-slash.svg";
    }  
  }


  const savePassword = ()=>{
    setpasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
  }

  const handleChange = (e)=>{
    setform({...form, [e.target.name]: e.target.value})
  }

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer">
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
            id=""
          />
          <div className="flex w-full justify-between gap-4">
            <input
            value={form.username}
            onChange={handleChange}
              placeholder="Enter Username"
              className="bg-white rounded-full border border-green-500 w-1/2 px-4 py-1"
              type="text"
              name="username"
            />

            <div className="relative">
              <input
              value={form.password}
              onChange={handleChange}
                placeholder="Enter Password"
                className="bg-white rounded-full border border-green-500 w-full px-4 py-1"
                type="text"
                name="password"
              />
              <span className="absolute right-0 top-1 cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="pt-1 px-2" width={35} src="/icons/eye.svg" alt="show" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className="flex justify-center items-center bg-green-400 rounded-full px-6 py-2 w-fit hover:bg-green-300 gap-4 border-1 border-green-900">
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
            
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="w-full rounded-lg overflow-hidden">

            <thead className=" bg-green-800 text-white">
              <tr>
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
              </tr>
            </thead>

            <tbody className="bg-green-100">
              {passwordArray.map((item, index)=>{
                return (
                   <tr key={index}>
                <td className="py-2 border border-white text-center"><a href={item.site} target="_blank">{item.site}</a></td>
                <td className="py-2 border border-white text-center">{item.username}</td>
                <td className="py-2 border border-white text-center">{item.password}</td>
              </tr>
                )
                
              })}
  
            </tbody>

          </table>}
          
        </div>


      </div>
    </div>
  );
};

export default Manager;
