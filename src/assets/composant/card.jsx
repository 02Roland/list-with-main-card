import { useState , useEffect} from "react"
export default function Card({props, active, setActive, key, confirm}){

    const [valid, setValid] = useState({
        number: 0,
        isvalid: active.cont,
    })
    // Réinitialiser l'état lorsque `active.confirm` change
    useEffect(() => {
        if (!confirm) {
            // Réinitialise l'état local à sa valeur initiale lorsque la commande est confirmée
            setValid({
                number: 0,
                isvalid: false,
            });
        }
    }, [confirm]);

    const style ={
        position: 'absolute', 
        top: 'calc(80% - 21px)', 
        borderRadius: '25px',
        padding: '10px 30px',
        display: 'flex',
        alignItems: 'center',
        right: 'calc(30% - 10.3125px)'
    }
    
    
    
    const handleClick = ()=>{
        setValid({
            ...valid,
            number: valid.number + 1 ,
            isvalid: true,
        })
        console.log(key)
        const object = {
            name: props.name,
            price: props.price,
            image: props.image.desktop,
            number: valid.number + 1
        }

        
        check(object)
    }

    const check = (object) => { 
        const updateTable = [...active.dessert]
        const existingItemIndex = updateTable.findIndex(
          (obj) => obj.name === object.name
        );
    
        if (existingItemIndex !== -1) {
          // Si l'élément existe déjà, on met à jour son nombre
          updateTable[existingItemIndex].number += 1;
        } else {
          // Si l'élément n'existe pas, on l'ajoute
          updateTable.push(object);
        }
    
        // Après avoir mis à jour la table, on renvoie la nouvelle version
        // en utilisant la fonction `setTable` qui doit être passée en prop
        setActive({
            ...active,
            totalDessert: active.totalDessert + 1,
            dessert: updateTable
        });
        console.log(updateTable);
    };




    const handleDecrment = ()=>{
        const object = {
            name: props.name,
            price: props.price,
            image: props.image.desktop,
            number: valid.number + 1
        }
        if(valid.number > 1){
            setValid({
                ...valid,
                number: valid.number - 1 
            })
            console.log(valid.number)
            check2(object)   
        }else if(valid.number == 1){
            setValid({
                isvalid: false,
                number: 0,
            })
            check2(object)
        }
    }
    
    const check2 = (object)=>{
        const copieTable = [...active.dessert]
        const existingItemIndex = copieTable.findIndex(
            (obj) => obj.name === object.name
        );
        if (existingItemIndex !== -1) {
            // Si l'élément existe déjà, on met à jour son nombre
            copieTable[existingItemIndex].number -= 1;
        }

        const updateTable = copieTable.filter((object) => object.number > 0);
        setActive({
            ...valid,
            totalDessert: active.totalDessert - 1,
            dessert: updateTable
        });
        
    }

    return(
        <div className="card" style={{position: 'relative'}}>
            <img 
                className={valid.isvalid && 'active'}
                src={props.image.desktop} 
                alt={props.name} 
                style={{display: 'block',width: '100%', height: '80%', objectFit: 'cover', borderRadius: '10px' }}
            />
            {!valid.isvalid ?
                (<button 
                    className="fisrt"
                    onClick={handleClick}
                    style={style}
                
                >
                    <img src="src/assets/images/icon-add-to-cart.svg" style={{marginRight: '10px', }} alt="" />
                    Add to Card
                </button>):
                (<div className="block" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '165px', height: '40px', margin: 'auto', position: 'absolute', top: 'calc(80% - 20px)', right: 'calc(30% - 10.3125px)', borderRadius: '25px',}}>
                    <button onClick={handleClick}>+</button>
                    <span>{valid.number}</span>
                    <button onClick={handleDecrment}>-</button>
                </div>)
            }
            <div style={{paddingTop: '30px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <h5>{props.category}</h5>
                <h3>{props.name}</h3>
                <span>${props.price}</span>
            </div>
        </div>
    )
}