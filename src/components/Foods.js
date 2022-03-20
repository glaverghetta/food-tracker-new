import Food from './Food'

const Foods = ({foods, onDelete}) => {
    if(foods !== undefined && foods.length > 0) {
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