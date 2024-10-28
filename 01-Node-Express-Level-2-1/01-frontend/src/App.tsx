import { useEffect, useState } from 'react'

export interface IStarship {
  id: number;
  name: string;
  img?: string;
}

function App() {
  const [starshipData, setStarshipData] = useState<IStarship[]>([])
  useEffect(()=>{
    fetch("http://localhost:3000/starships")
    .then((response)=> response.json())
    .then((json)=>setStarshipData(json))
  },[])

  return (
    <div>
    <h1>Hey!</h1>
    {starshipData.map((starship) => (
      <div key={starship.id}>
        <img src={"http://localhost:3000"+starship.img} alt={starship.name} />
        <h3>{starship.name}</h3>
      </div>
    ))}
  </div>
  )
}

export default App
