import {FaTimes} from 'react-icons/fa'
import Button from './Button'

const Food = ({food, onDelete}) => {
  return (
    <div className='food'>
        <h3>{food.name} <FaTimes onClick={() => onDelete(food.name)} /></h3>
        
    </div>
  )
}

export default Food