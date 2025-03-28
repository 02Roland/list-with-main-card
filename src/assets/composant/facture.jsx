
export default function Facture({active, setActive, confirm, setConfirm}){
    const sty={
        color: 'hsl(14, 86%, 42%)'
    }
    let total = 0;
    for(let dessert of active.dessert){
        total += dessert.number * dessert.price
    }

    const handleClick = (index)=>{
        let newTotal = active.totalDessert
        const copieTable = [...active.dessert]
        const updatedTable = copieTable.filter((data, ind)=>{
            console.log(data)
            if(ind !== index){
                number = data.number
                newTotal -= data.number
                return data
            }
        })
        setActive({
            totalDessert: newTotal,
            dessert: updatedTable,
            cont: true,
        })

        
    }

    const ConfirmClick = ()=>{
        confirm = true
        setConfirm(confirm)
    }

    if(active.dessert.length == 0){
        
        return(
            <div className="facture">
                <div style={{width: '100%', backgroundColor: 'white', padding: '3vh', borderRadius: '10px', paddingBottom: '3vh'}}>
                    <div>
                        <h2 style={sty}>Your cart(0)</h2>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
                            <img src="src/assets/images/illustration-empty-cart.svg" alt="" />
                            <p>Your added items will apear here</p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

    return(
        <div className="facture">
            <div style={{width: '100%', backgroundColor: 'white', padding: '2vh', borderRadius: '10px'}}>
                <div>
                    <h2 style={sty}>Your cart({active.totalDessert})</h2>
                    <div style={{display: "flex", flexDirection: 'column', gap: '10px'}}>
                        {active.dessert.map((dessert, index)=>(
                            <Line
                                key={index}
                                element={dessert}
                                handleclik={(e)=>handleClick(index)}
                            />
                        ))}
                        <FinalOrder
                            total={total}
                            confirmClick={ConfirmClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
    
}

function Line({element, handleclik}){

   
    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid gray', padding: '10px 0px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <h4>{element.name}</h4>
                <div>
                    <span style={{color: 'hsl(14, 86%, 42%)'}}>{element.number}x</span><span> @ ${element.price}</span> ${element.number * element.price}<span></span>
                </div>
            </div>
            <button className="btn" onClick={handleclik}>x</button>
        </div>
    )
}

function FinalOrder({total, confirmClick}){
    return(
        <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px'}}>
                <h5>Order total</h5>
                <h4 style={{color: 'hsl(14, 65%, 9%)'}}>${total}</h4>
            </div>
            <div style={{width: '100%', height: '5vh', borderRadius: '5px', color: 'hsl(14, 65%, 9%)', backgroundColor: 'hsl(13, 31%, 94%)', display: "flex", alignItems: 'center', justifyContent: 'center'}}>
                <div><img src="src/assets/images/icon-carbon-neutral.svg" alt="" /> This is a<strong> Carbon-neutral</strong> delivery</div>
            </div>
            <button 
                style={{width: '100%', height: '5vh', borderRadius: '25px', color: 'white', backgroundColor: 'hsl(14, 86%, 42%)'}} 
                onClick={confirmClick}
            >
                Confirm Order
            </button>
        </>
    )
}