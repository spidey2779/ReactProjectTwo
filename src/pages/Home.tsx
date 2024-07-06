import { useEffect } from "react";
import TodoContainer from "../components/TodoContainer";
import { useAppSelector } from "../hooks/hooks";
import { cn } from "../utils/cn";

const Home = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(()=>{
    
  },[])
  return (
    <section className={cn("mt-14")}>
      {!user.login && (
        <h1 className={cn("text-4xl font-mono p-2")}>please Login</h1>
      )}
      {user.login && (
        <h1 className={cn("text-4xl font-mono p-2")}>
          Welcome {user?.username},
        </h1>
      )}

      <main className={cn("flex justify-center")}>
        <TodoContainer />
      </main>
    </section>
  );
};

export default Home;
