import Day from './Day'

const Days = ({days, onDelete, onSelect, showDays}) => {

  return (
    
    <>
      
      {showDays && days.map((day) => (
        <Day key={day.dayID} day={day} onDelete={onDelete} onSelect={onSelect}/>
      ))}  
    
    </>
      
      
  )
}

export default Days