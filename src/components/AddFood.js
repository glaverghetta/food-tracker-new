import {useState} from 'react'

const AddFood = ({onAddFood}) => {
    const [name, setName] = useState('')
    const [calories, setCalories] = useState(0)
  
    const onSubmit = (e) => {
        e.preventDefault()

        if(!name) {
            alert('Please enter a food name.')
            return
        }

        if(calories === undefined) {
            alert('Please enter number of calories.')
            return
        }
        
        onAddFood(name, calories)

        setName('')
        setCalories(0)
    }

    return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Name</label>
            <input type='text' placeholder='Food Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Calories</label>
            <input type='number' placeholder='Calories' value={calories} onChange={(e) => setCalories(Number(e.target.value))} />
        </div>
        <input type='submit' value='Save Food' className='btn btn-block'></input>
    </form>
  )
}

export default AddFood