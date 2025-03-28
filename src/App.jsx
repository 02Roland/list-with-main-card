import { useState, useEffect } from 'react'
import Card from './assets/composant/card';
import Facture from './assets/composant/facture';
import { Confirm } from './assets/composant/Confirm';



function App() {
  const [active, setActive] = useState({
    totalDessert: 0,
    dessert: [],
    cont: false
  })

  const [confirm, setConfirm] = useState(false)
  
  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('src/data.json')
      .then(reponse =>{
        if(!reponse.ok){
          throw new Error("Erreur lors de la recuperation de donnnees");
        }
        return reponse.json()
      }).then(data => {
        setData(data);
      })
  }, [])


  
  return(
    <>
    <div className='container'>
      <div className='container-child'>
        <h1>Desserts</h1>
        <section>
          {data.map((card, index) =>(
            <Card 
              key = {index}
              props ={card}
              active ={active}
              setActive = {setActive}
              confirm = {confirm}
              setConfirm = {setConfirm}
              
            />
          ))}
        </section>
      </div>
      <Facture
        active={active}
        setActive={setActive}
        confirm = {confirm}
        setConfirm = {setConfirm}
      />
      <Confirm
        active = {active}
        setActive = {setActive}
        confirm = {confirm}
        setConfirm = {setConfirm}
      />
    </div>

    </>
  )

}

export default App
