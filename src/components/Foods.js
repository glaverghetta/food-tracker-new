import Food from './Food'

const Foods = ({foods, onDelete}) => {
    if(foods !== undefined) {
        return (
            <>
            {foods.map((food) => (
                <Food key={food.foodID} food={food} onDelete={onDelete} />
                )) 
            }    
            </>
        )
    }
    else {
        return (
        <>
            <p>No foods for this day.</p>
        </>
        )
    }
}

export default Foods