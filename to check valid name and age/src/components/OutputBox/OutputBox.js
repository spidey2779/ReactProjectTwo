import classes from './OutputBox.module.css'

const OutputBox=(props)=>{
    return (
        <div className={classes.outputBox} >
            {props.users.map(user=>
            <div key={user.key}className={classes.outputList}> {user.name+ " is "}{user.age  +" years old"}</div>

            )}
        </div>
    )
}
export default OutputBox;