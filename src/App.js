import { useState } from 'react';
import Header from './components/Header'
import Button from './components/Button'
import About from './components/About'
import Days from './components/Days'
import AddDay from './components/AddDay'
import Foods from './components/Foods'
import AddFood from './components/AddFood'

const App = () => {

  const [showAbout, setShowAbout] = useState(false) // If true, the about information is shown instead of everything else
  var h1Class = showAbout ? 'about' : 'title' // css class used for the header

  const [days, setDays] = useState([])

  // Example of what the days look like
  /*
  {
      dayID: 0,
      dayNum: 1,
      dayFoods: [{
        foodID: 0,
        name: 'orange',
        calories: 5,
      }
    ],
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
      }
    ],
  }, 
  */

  const [showAddDay, setShowAddDay] = useState(false)       // If true, the add day interface is shown
  const [daySelected, setIsDaySelected] = useState(false)   // Set to true if the user is currently browsing the foods for one of the days
  const [currentDay, setCurrentDay] = useState(1)           // Current day user is looking at

  // Change the currentDay state
  const setDay = (dayNum) => {
    setCurrentDay(dayNum)
    setIsDaySelected(true)
  }

  // Add another day to the days state
  const addDay = (dayNum) => {
      const dayID = Math.floor(Math.random() * 10000) + 1
      let dayFoods = []
      const newDay = {dayID, dayNum, dayFoods}
      setDays([...days, newDay])
  }

  // Delete a day from the days state
  const deleteDay = (id) => {
      setDays(days.filter((day) => day.dayID !== id))
  }

  const [showAddFood, setShowAddFood] = useState(false) // If true, shows the add food interface

  // Add another food item to the currentDay
  const addFood = (foodName, foodCalories) => {
      
      // Old version: the following line causes the state to not update immediately. only updates after clicking a button
      /* let newDays = days
      let currentDayIndex = newDays.findIndex((day) => day.dayNum === currentDay)
      let currentFood = newDays[currentDayIndex].dayFoods

      let newFood = {
          foodID: currentFood.length,
          name: foodName,
          calories: foodCalories,
      }

      newDays[currentDayIndex].dayFoods = [...currentFood, newFood]

      setDays(newDays) */

      // Create a new variable for the new state and copy the old state into this variable
      let newDays = []
      for(let i = 0; i < days.length; i++) {
          newDays.push(days[i])
      }

      // Find currentDay, then get the foods for that day
      let currentDayIndex = newDays.findIndex((day) => day.dayNum === currentDay)
      let currentFoods = newDays[currentDayIndex].dayFoods

      // Create the new food
      let newFood = {
          foodID: currentFoods.length,
          name: foodName,
          calories: foodCalories,
      }

      // Add the new food onto the current day's foods
      newDays[currentDayIndex].dayFoods = [...currentFoods, newFood]

      setDays(newDays)
  }

  
  // From the current day, deletes the food with matching id
  const deleteFood = (id) => {
      let newDays = []
      for(let i = 0; i < days.length; i++) {
          newDays.push(days[i])
      }

      let currentDayIndex = newDays.findIndex((day) => day.dayNum === currentDay)
      newDays[currentDayIndex].dayFoods = newDays[currentDayIndex].dayFoods.filter((food) => food.foodID !== id)
      setDays(newDays)
  }

  // Returns total number of calories for all the foods in the day with the given dayNum
  const getTotalCalories = (dayNumber) => {
      let currentDayFoods = days.find((day) => day.dayNum === dayNumber).dayFoods
      if(currentDayFoods === undefined)
          return 0

      let totalCal = 0
      for(let i = 0; i < currentDayFoods.length; i++) {
          totalCal += currentDayFoods[i].calories
      }

      return totalCal
  }

  // Returns total calories for all foods in all days
  const getTotalCaloriesAllDays = () => {
      let sum = 0
      for(let i = 0; i < days.length; i++) {
          sum += getTotalCalories(days[i].dayNum)
      }
      return sum
  }
  let totalCalsAllDays = getTotalCaloriesAllDays()

  // Returns dayNum for day with most calories
  const getDayWithMostCalories = () => {
      let max = -1
      let dayNumber = 0
      for(let i = 0; i < days.length; i++) {
            let currentDayCalories = getTotalCalories(days[i].dayNum)
            if(currentDayCalories > max) {
                max = currentDayCalories
                dayNumber = days[i].dayNum
          }
      }
      return dayNumber
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
                <Button text={showAddFood ? 'Hide' : 'Add'} click={() => setShowAddFood(!showAddFood)} color={showAddFood ? 'red' : 'green'} />
                {showAddFood && <AddFood onAddFood={addFood} />}
                <p>Total calories for this day: {getTotalCalories(currentDay)}</p>
                <Button text='Back' click={() => setIsDaySelected(false)}/> 
              </div>
            }
            {!daySelected &&
              <div>
                <p style={{textAlign:'right', paddingRight:'10%'}}>Select a day or add a new day.
                <Button text={showAddDay ? 'Hide' : 'Add'} click={() => setShowAddDay(!showAddDay)} color={showAddDay ? 'red' : 'green'} />
                </p>
                {showAddDay && <AddDay onAddDay={addDay} />}
                {days.length > 0 ? <Days days={days} onDelete={deleteDay} onSelect={setDay} /> : 'No days currently entered.'}
                <p>Total calories for all days: {totalCalsAllDays}</p>
                <p>Average calories per day: {days.length > 0 ? totalCalsAllDays / days.length : 0}</p>
                <p>Day with the most calories: {getDayWithMostCalories()}</p>
              </div>
            }
          </div>
      }
      
    </div>
  );
}

export default App;