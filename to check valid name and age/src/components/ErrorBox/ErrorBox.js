import classes from "./ErrorBox.module.css";
const ErrorBox = (props) => {
  return (
    
    <div className={classes.outerbox}> 
      <div className={classes.BG}></div>
      <div className={classes.errorBox}>
        <div className={classes.heading}>{props.error.title}</div>
        <div className={classes.innerboxes}>
          <div className={classes.divOne}>{props.error.statement}</div>
          <div className={classes.divTwo} ><button onClick={()=> props.ErrorHandler(false)}>Okay</button></div>
        </div>
      </div>
    </div>
   
  );
};
export default ErrorBox;
