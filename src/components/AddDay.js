import {useState} from 'react'

const AddDay = ({onAddDay}) => {
    const [dayNum, setDayNum] = useState(0)
  
    const onSubmit = (e) => {
        e.preventDefault()

        if(!dayNum) {
            alert('Please enter day number.')
            return
        }
        
        onAddDay(dayNum)

        setDayNum(0)
    }

    return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Day Number</label>
            <input type='number' placeholder='Day number' value={dayNum} onChange={(e) => setDayNum(e.target.value)} />
        </div>
        <input type='submit' value='Save Day' className='btn btn-block'></input>
    </form>
  )
}

export default AddDay