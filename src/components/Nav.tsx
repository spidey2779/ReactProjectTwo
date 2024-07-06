import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { userLogout } from "../redux/myslice";
const Nav = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    Cookies.remove("token", { path: "/" });
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <nav
      className={cn(
        "flex justify-between items-center py-2 px-[5%] bg-zinc-800 text-white fixed top-0 left-0 z-10 w-full"
      )}
    >
      <div className={cn("text-xl font-semibold")}>LOGO</div>
      {user?.login && (
        <button
          className={cn("bg-red-500 py-2 px-5 font-semibold text-lg rounded")}
          onClick={logoutHandler}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
