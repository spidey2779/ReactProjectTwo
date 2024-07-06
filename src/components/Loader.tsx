import { cn } from "../utils/cn";

const Loader = () => {
 
  return (
    <div
      className={cn(
        "text-5xl h-screen w-full flex justify-center items-center pointer-events-none "
      )}
    >
      <span>Loading...</span>
    </div>
  );
};

export default Loader;
