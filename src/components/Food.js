import React from 'react';
import {useEffect} from 'react';
import {FaTimes} from 'react-icons/fa'


const Food = ({food, onDelete}) => {
  
  useEffect(() => {
      
  })
  
  return (
    <div className='food'>
        <h3>{food.name} <FaTimes onClick={() => onDelete(food.foodID)} /></h3>
        <p>Calories: {food.calories}</p>
    </div>
  )
}

export default Food