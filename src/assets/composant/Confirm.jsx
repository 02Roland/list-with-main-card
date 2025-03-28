export function Confirm({active, setActive, confirm, setConfirm}){

    let total = 0;
    for(let dessert of active.dessert){
        total += dessert.number * dessert.price
    }
    const handleClick = ()=>{
        confirm = false
        setConfirm(confirm)
        setActive({
            totalDessert: 0,
            dessert: [],
            cont: false
        })
    }
    if(confirm){
        return(
            <div className="modal-container">
                <div className="overlay"></div>
                <div className="modal modalactive">
                    <div style={{margin: '10px 0px'}}>
                        <img src='src/assets/images/icon-order-confirmed.svg ' alt='' />
                    </div>
                    <div style={{display: 'flex', gap: '5px', flexDirection: 'column'}}>
                        <h2>Order Confirmed</h2>
                        <span>we hope you enjoy your food</span>
                    </div>
                    <div className="order">
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', padding: '20px 15px', borderRadius: '7.5PX', backgroundColor: 'hsl(13, 31%, 94%)'}}>
                            {active.dessert.map((dessert, index)=>(
                                <FoodSelected
                                    key={index}
                                    element={dessert}
                                />
                            ))}
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <span>Order total</span>
                            <h2><strong>${total}</strong></h2>
                        </div>
                        <button
                            className="btnStyle" 
                            onClick={handleClick}>Start New Order
                        </button>
                    </div>
                </div>
            </div>
        )
    }else{
        return 
    }
}

function FoodSelected({element}){
    return(
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid black', padding: '10px'}}>
            <div style={{display: 'flex', gap:'10px'}}>
                <img src={element.image} alt={element.name}  style={{width:'60px'}}/>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <h6>{element.name}</h6>
                    <div>
                        <span>{element.number}x</span><span> @{element.price}</span>
                    </div>
                </div>
            </div>
            <span>${element.number*element.price}</span>
        </div>
    )
}