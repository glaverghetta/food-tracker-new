import { useState } from 'react';
import Header from './components/Header'
import Button from './components/Button'
import About from './components/About'
import Days from './components/Days'
import AddDay from './components/AddDay'
import Foods from './components/Foods'

const App = () => {

  const [showAbout, setShowAbout] = useState(false)
  var h1Class = showAbout ? 'about' : 'title'

  const [days, setDays] = useState([
    {
        dayID: 1,
        dayNum: 1,
        dayFoods: [{
            foodID: 1,
            name: 'orange',
            calories: 5,
        }],
    },

    {
        dayID: 2,
        dayNum: 2,
        dayFoods: [{
            foodID: 1,
            name: 'pear',
            calories: 12,
        },
        {
            foodID: 2,
            name: 'soup',
            calories: 100,
        }],
    },
  ])

  const [showAddDay, setShowAddDay] = useState(false)
  const [daySelected, setIsDaySelected] = useState(false)
  const [currentDay, setCurrentDay] = useState(1)

  const setDay = (dayNum) => {
    setCurrentDay(dayNum)
    setIsDaySelected(true)
  }

  const addDay = (dayNum) => {
      const dayID = Math.floor(Math.random() * 10000) + 1
      const newDay = {dayID, dayNum}
      setDays([...days, newDay])
  }

  const deleteDay = (id) => {
      setDays(days.filter((day) => day.dayID !== id))
  }

  

  const deleteFood = (name) => {
    console.log(name)
  }

  return (
    <div className="container">
      <Header h1C={h1Class} aboutButtonClick = {() => setShowAbout(!showAbout)}/> 
      {showAbout && <About/>}
      {!showAbout &&
          <div>
            {daySelected && 
              <div>
                <p>Current day: {currentDay}</p>
                <Foods foods={days.find((day) => day.dayNum === currentDay).dayFoods} onDelete={deleteFood} /> 
                <Button text='Back' click={() => setIsDaySelected(false)}/> 
              </div>
            }
            {!daySelected &&
              <div>
                <p style={{textAlign:'right', paddingRight:'10%'}}>Select a day or add a new day.
                <Button text={showAddDay ? 'Hide' : 'Add'} click={() => setShowAddDay(!showAddDay)} color={showAddDay ? 'red' : 'green'} />
                </p>
                {showAddDay && <AddDay onAddDay={addDay} />}
                {days.length > 0 ? <Days days={days} onDelete={deleteDay} onSelect={setDay}/> : 'No days currently entered.'}
              </div>
            }
          </div>
      }
      
    </div>
  );
}

export default App;
