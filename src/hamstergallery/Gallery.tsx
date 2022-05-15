import { useState, useEffect } from "react"
import { Hamster } from '../models/Hamster'
import { fixUrl } from "../utils"
import { useParams } from 'react-router-dom'
import AddHamster from "./AddHamster"
import { Link } from 'react-router-dom'

const Gallery = () => {
  const [data, setData] = useState<null | Hamster[]>(null)
  const [hamsterId, setHamsterId] = useState<string>('')
  const [singleHamster, setSingleHamster] = useState<null | Hamster>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/'))
      const apiData: any = await response.json()

      setData(apiData as Hamster[])
    }
    getData()
    console.log(data)
  }, [])
  const handleSingleHamster = () => {

  }


  return (

    <div className="gallery">
      <AddHamster />

      {data ? data.map(hamster => (
        <div key={hamster.id} className="hamster">

          <img src={fixUrl(`/img/${hamster.imgName}`)} />

          <h3>{hamster.name}</h3>
          <p>Ålder: {hamster.age} år</p>
          <Link to={'/singlehamster/' + hamster.id}>Mer info</Link>
        </div>
      )) : <p>Väntar på hamstrar</p>}


    </div>

  )

}
export default Gallery

// <img src={fixUrl('img/hamster-1.jpg')} />
