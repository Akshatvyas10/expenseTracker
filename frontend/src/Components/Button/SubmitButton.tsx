import React from 'react'
interface ButtonFormet{
    label?:string;
    type?:any;
    onClick?: (e:any)=>void;
    className?:string
}
const SubmitButton:React.FC<ButtonFormet> = (props) => {
  return (
  <button type={props.type} onClick={props.onClick} className={props.className}>
    {props.label}
  </button>
  )
}

export default SubmitButton