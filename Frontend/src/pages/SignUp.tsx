import { FormEvent, useState } from "react";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../assets/Mediamodifier-Design.svg'

function SignUp() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleMouseDown = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseUp = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/createUser`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/");
        toast.success("successfully signed up");
      } else {
        toast.dismiss()
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(`Internal server error: ${error.message}`)
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="text-white relative h-screen overflow-hidden font-montserrat flex flex-col justify-center items-center">
      <img className="w-44" src={logo} alt="aipic logo" />
      <div className="mt-1 p-8 rounded-lg bg-gray-800/70">
        <form className="flex flex-col gap-2 w-[500px]">
          <label htmlFor="email" className="font-bold pl-1 text-lg">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="textField"
            placeholder="enter your email"
          />

          <label htmlFor="password" className="pl-1 font-bold mt-2 text-lg">Password</label>
          <div className="relative flex flex-col">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="textField"
              placeholder="enter your password"
            />
            <BsEye
              onMouseUp={handleMouseUp}
              onMouseDown={handleMouseDown}
              className="absolute right-4 text-xl cursor-pointer top-1/2 -translate-y-1/2"
            />
          </div>

          <label htmlFor="username" className="font-bold pl-1 mt-2 text-lg">UserName</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="textField"
            placeholder="enter your username"
          />

          <button type='submit' onClick={handleSignUp} className="mt-4 rounded-lg mx-1 font-bold px-10 py-2 outline outline-white hover:text-gray-900 hover:bg-gray-200 active:scale-95 transition duration-200 ease-in-out">
            Sign Up
          </button>
        </form>
        <button onClick={handleClick} className="mt-4 w-full font-bold px-3 py-2 rounded-lg bg-gray-700/50">
          Already a user ?
        </button>
      </div>
    </div>
  );
}

export default SignUp;
