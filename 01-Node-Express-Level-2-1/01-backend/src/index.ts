import express from 'express'
import { IStarship } from './models/IStarship'
import { IPerson } from './models/IPerson'
import cors from 'cors'
import path from 'path'

const app = express()
const port = 3000
app.use(cors())
app.use(express.static("public"))

console.log(__dirname)

const starships: IStarship[] = [
    {
        id: 1, 
        name: "TIE Fighter",
    },
    {
        id: 2,
        name: "Foe Hammer",
        img: "/assets/Foe_Hammer_Pelican.webp"
    },
    {
        id: 3,
        name: "UNSC Infinity",
        img: "/assets/otwsxml8wcx21.webp"
    },
    {
        id: 4,
        name: "The Oracle"
    },
    {
        id: 5,
        name: "Firefly"
    }
]

const persons: IPerson[] = [
    {
        id: 117,
        name: "Master Chief"
    },
    {
        id: 2,
        name: "Han Solo"
    },
    {
        id: 3,
        name: "Leia Organa"
    },
    {
        id: 4,
        name: "Buzz Lightyear"
    },
    {
        id: 5,
        name: "Arbiter"
    }
]


app.get("/starships", (req, resp)=>{
    resp.json(starships)
})

// app.get("/person", (req, resp)=>{
//     resp.json(persons)
// })

app.listen(port, ()=>{
    console.log(`Server running at ${port}`)
})