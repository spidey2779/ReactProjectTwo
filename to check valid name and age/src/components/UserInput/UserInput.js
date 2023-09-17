import React , {useState} from 'react';
import classes from './UserInput.module.css'
import ErrorBox from '../ErrorBox/ErrorBox'

const UserInput=(props)=>{
    const [isError,setIsError]=useState(false)
   
    const [error,setError]=useState({
        title:'',statement: ''
    })
   const [enteredName,setEnteredName]=useState('');
   const [enteredAge,setEnteredAge]=useState('');
   const ErrorHandler=(input)=>{
    setIsError(input)
  }
   const nameChangeHandler=(event)=>{
    setEnteredName(event.target.value)
   }
   const ageChangeHandler=(event)=>{
    setEnteredAge(event.target.value)
   }
   const addUserHandler=()=>{
    if(enteredName.trim().length === 0 || enteredAge.trim().length === 0){
        setError({
            title:'please enter a valid input', statement:'Please enter a valid name and age (non-empty values).'
        })
        setEnteredName('')
        setEnteredAge('')
         return ErrorHandler(true);
    }
    if(+enteredAge<1){
        setError({
            title:'please enter a valid age', statement:'Age should be greater than 1.'
        })
        setEnteredName('')
        setEnteredAge('')
         return ErrorHandler(true);
    }
    
    props.inputTakeHandler(enteredName,enteredAge)
    setEnteredName('')
    setEnteredAge('')


   }
    return (
        <div>
             { isError && <ErrorBox  ErrorHandler={ErrorHandler} error={error}/> }
        <div className={classes.userInput}>
            <label htmlFor="userName" >UserName</label>
            <input type="text" id="userName" value={enteredName} onChange={nameChangeHandler}/>
            <label htmlFor="age">Age(Years)</label>
            <input type="number" id="age" value={enteredAge} onChange={ageChangeHandler}/>
            <button className={classes.userBtn} onClick={addUserHandler}>Add User</button>
        </div>
        </div>
    )
}
export default UserInput;