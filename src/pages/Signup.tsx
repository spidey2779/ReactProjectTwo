import Form from "../components/Form";
import { cn } from "../utils/cn";

const Signup = () => {

  return (
    <div
      className={cn(
        "h-screen w-full bg-[url('/images/signup.png')] bg-cover md:bg-contain md:bg-left bg-no-repeat relative"
      )}
    >
      <div className={cn("absolute right-[10%] top-[10%]")}>
        <h1
          className={cn(
            "text-sky-300 text-3xl text-center font-bold py-2 font-sans mb-10 mix-blend-lighten"
          )}
        >
          Sign Up
        </h1>
          <Form type={'signup'}/>
      </div>
    </div>
  );
};

export default Signup;
