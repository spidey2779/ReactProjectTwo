import { FormEvent, useState } from "react";
import axios from "axios";
import { cn } from "../utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { userLogin } from "../redux/myslice";
export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
const Form = ({ type }: { type: string }) => {
  const navigate = useNavigate();
  const inputStyles = "p-2";
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(username, password, email);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_NODE_URL}/user/${type}`,
        {
          email,
          password,
          username,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        // console.log(response.data);
        if (type === "signup") {
          alert("User created successfully!");
          navigate("/login");
          return;
        }
        alert("logged in successfully!");
        dispatch(userLogin(response.data.user));
        navigate("/");
        return;
      }
    } catch (error: unknown) {
      // Handle error
      //   console.error("There was an error signing up!", error);
      if (axios.isAxiosError(error)) {
        const err = error as ErrorResponse;
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("error occurred");
        }
      } else {
        alert("internal error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className={cn(
        "flex  flex-col bg-zinc-700 px-4 pt-10 pb-5 w-[330px] shadow-md gap-3 rounded-md "
      )}
      onSubmit={submitHandler}
    >
      {type === "signup" && (
        <input
          type="text"
          placeholder="Enter User Name"
          className={cn(inputStyles)}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}

      <input
        type="email"
        placeholder="Enter Mail"
        className={cn(inputStyles)}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter Password"
        className={cn(inputStyles)}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className={cn(" w-fit self-center py-2 px-5 text-white rounded", {
          "bg-sky-400": type === "signup",
          "bg-emerald-500": type === "login",
        })}
        disabled={isLoading}
      >
        {type === "signup" ? "Sign Up" : "Login"}
      </button>
      <Link
        to={`/${type === "login" ? "signup" : "login"}`}
        className={cn("text-white underline text-right")}
      >
        {type === "login"
          ? "no account ? signup"
          : "already have an account ? login"}
      </Link>
    </form>
  );
};

export default Form;
