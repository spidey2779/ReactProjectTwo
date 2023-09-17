import React ,{useState} from "react";

import UserInput from "./components/UserInput/UserInput";
import OutputBox from "./components/OutputBox/OutputBox";

import './App.css'

function App() {

  const [input,setInput]=useState([]);
  const inputTakeHandler=(userName,userAge)=>{
    setInput((prev)=>{
      return[...prev,{name:userName,age:userAge,key: (Math.random()*1000).toString()}];
    })
    
  }
  
  
  
  return (
  <div className="app">
    <UserInput inputTakeHandler={inputTakeHandler} />
     
  <OutputBox  users={ input===undefined ? '': input}/> 
   

  </div>    
  );
}

export default App;
