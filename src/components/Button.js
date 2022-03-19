import React from 'react'

const Button = ({text, click, color}) => {
  return (
    <button className='btn' style={{backgroundColor: color}} onClick={click}>{text} </button>
  )
}

export default Button