import {FaTimes} from 'react-icons/fa'
import Button from './Button'

const Food = ({food, onDelete}) => {
  return (
    <div className='food'>
        <h3>{food.name} <FaTimes onClick={() => onDelete(food.foodID)} /></h3>
        <p>Calories: {food.calories}</p>
        
    </div>
  )
}

export default Food