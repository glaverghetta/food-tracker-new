import Day from './Day'

const Days = ({days, onDelete, onSelect}) => {

  return (
    <>
      {days.map((day) => (
        <Day key={day.dayID} day={day} onDelete={onDelete} onSelect={onSelect}/>
      ))}  
    </> 
  )
}

export default Days