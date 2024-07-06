import Form from "../components/Form"
import { cn } from "../utils/cn"

const Login = () => {
  return (
    <div
      className={cn(
        "h-screen w-full bg-[url('/images/login.png')] bg-cover md:bg-contain md:bg-left bg-no-repeat relative"
      )}
    >
      <div className={cn("absolute right-[10%] top-[10%]")}>
        <h1
          className={cn(
            "text-emerald-500 text-3xl text-center font-bold py-2 font-sans mb-10 mix-blend-difference"
          )}
        >
       Login
        </h1>
          <Form type={'login'}/>
      </div>
    </div>
  )
}

export default Login