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
        dayID: 0,
        dayNum: 1,
        dayFoods: [{
            foodID: 0,
            name: 'orange',
            calories: 5,
        }],
    },

    {
        dayID: 1,
        dayNum: 2,
        dayFoods: [{
            foodID: 0,
            name: 'pear',
            calories: 12,
        },
        {
            foodID: 1,
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

  
  // From the current day, deletes the food with matching id
  const deleteFood = (id) => {
      //console.log(id)
      let newDays = days
      let currentDayIndex = newDays.findIndex((day) => day.dayNum === currentDay)
      //console.log(currentDayIndex)
      newDays[currentDayIndex].dayFoods = newDays[currentDayIndex].dayFoods.filter((food) => food.foodID !== id)
      //console.log(newDays)
      setDays(newDays)
      

      /*let currentDaySelected = days.find((day) => day.dayNum === currentDay)
      let currentDayFoods = currentDaySelected.dayFoods
      let newDayFoods = currentDayFoods.filter((food) => food.foodID !== id)
      console.log(newDayFoods)

      let newDay = {dayID: currentDaySelected.dayID,
                    dayNum: currentDaySelected.dayNum,
                    dayFoods: newDayFoods}

      setDays([...days, newDay])*/
  }

  // Returns total number of calories for all the foods in the current day
  const getTotalCalories = () => {
      let currentDayFoods = days.find((day) => day.dayNum === currentDay).dayFoods
      if(currentDayFoods === undefined)
          return 0

      let totalCal = 0
      for(let i = 0; i < currentDayFoods.length; i++) {
          totalCal += currentDayFoods[i].calories
      }

      return totalCal
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
                <p>Total calories for this day: {getTotalCalories()}</p>
                <Button text='Back' click={() => setIsDaySelected(false)}/> 
              </div>
            }
            {!daySelected &&
              <div>
                <p style={{textAlign:'right', paddingRight:'10%'}}>Select a day or add a new day.
                <Button text={showAddDay ? 'Hide' : 'Add'} click={() => setShowAddDay(!showAddDay)} color={showAddDay ? 'red' : 'green'} />
                </p>
                {showAddDay && <AddDay onAddDay={addDay} />}
                {days.length > 0 ? <Days days={days} onDelete={deleteDay} onSelect={setDay} showDays={daySelected}/> : 'No days currently entered.'}
              </div>
            }
          </div>
      }
      
    </div>
  );
}

export default App;
