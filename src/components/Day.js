import {FaTimes} from 'react-icons/fa'
import Button from './Button'

const Day = ({day, onDelete, onSelect}) => {
  return (
    <div className='food'>
        <h3>Day {day.dayNum} <FaTimes onClick={() => onDelete(day.dayID)} /></h3>
        <p><Button text='Select' click={() => onSelect(day.dayNum)}/></p>
    </div>
  )
}

export default Day