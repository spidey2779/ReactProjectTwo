/* eslint-disable react/prop-types */

const Action = ({handleClick , type , className}) => {
  return (
    <div className={className} onClick={handleClick}>{type}</div>
  )
}

export default Action
