import React ,{useState , useEffect}from 'react';
const AuthContext=React.createContext({
   isLoggedIn: false,
   onLogout:()=>{},
   onLogin:(email,password)=>{},
});
export const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    const storedInfo=localStorage.getItem('login');
    if(storedInfo==='yes') {
      setIsLoggedIn(true);
    }
  },[])
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('login','yes');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('login');
    setIsLoggedIn(false);
  };
    return <AuthContext.Provider 
    value={{
        isLoggedIn:isLoggedIn,
        onLogout:logoutHandler,
        onLogin:loginHandler
    }}
    >{props.children}</AuthContext.Provider>
}
export default AuthContext;
