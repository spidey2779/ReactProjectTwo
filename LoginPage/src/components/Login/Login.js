import React, { useState, useEffect,useReducer,useContext ,useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Inputs from '../UI/Inputs/Inputs';
const emailReducer=(state,action)=>{
  if(action.type === "USER_INPUT"){
    return {value :action.val,isValid: action.val.includes("@")};
  }
  if(action.type === "INPUT_BLUR"){
    return {value :state.value,isValid: state.value.includes("@")};
  }
  return {value :'',isValid: false};
};
const passwordReducer=(state,action)=>{
  if(action.type === "USER_INPUT"){
    return {value :action.val,isValid: action.val.trim().length > 6};
  }
  if(action.type === "INPUT_BLUR"){
    return {value :state.value,isValid: state.value.trim().length > 6};
  }
  return {value :'',isValid: false};
};
const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null });
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null });
  const {isValid: emailIsValid}=emailState;
  const {isValid: passwordIsValid}=passwordState;
  const ctx=useContext(AuthContext);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();
  useEffect(() => {
    const identifier=setTimeout(() => {
      console.log("checking validity...");

      setFormIsValid(
        // enteredEmail.includes("@") && enteredPassword.trim().length > 6
        emailIsValid && passwordIsValid
        // emailState.isValid && passwordState.isValid
      );
    }, 500);
    return()=>{
      console.log("clean up...");
      clearTimeout(identifier);
    }
  }, [emailIsValid, passwordIsValid]);
  // }, [emailState, passwordState]);
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})
    // setEnteredEmail(event.target.value);
      //     setFormIsValid(
      //   event.target.value.includes("@") && passwordState.isValid
      // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT',val:event.target.value})
    // setEnteredPassword(event.target.value);
    // setFormIsValid(
    //   // enteredEmail.includes("@") && event.target.value.trim().length > 6
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'INPUT_BLUR'})

    // setEmailIsValid(emailState.isValid);
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){

      ctx.onLogin(emailState.value, passwordState.value);
    }
    else if(!emailIsValid){
      emailInputRef.current.focus();
    }
    else{
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Inputs
        ref={emailInputRef}
        type="email"
        id="email"
        // value={enteredEmail}
        label="E-mail"
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        ></Inputs>
        <Inputs
        ref={passwordInputRef}
        type="password"
        id="password"
        // value={enteredEmail}
        label="Password"
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        ></Inputs>
        <div className={classes.actions}>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}> */}
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
