import { useState, useEffect } from "react"
import { Hamster } from '../models/Hamster'
import { fixUrl } from "../utils"

const Gallery = () => {
  const [data, setData] = useState<null | Hamster[]>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/'))
      const apiData: any = await response.json()

      setData(apiData as Hamster[])
    }
    getData()
    console.log(data)
  }, [])

  return (
    <div className="gallery">

      {data ? data.map(hamster => (
        <div key={hamster.id} className="hamster">

          <img src={hamster.imgName} />
          <h3>{hamster.name}</h3>
          <p>Ålder: {hamster.age} år</p>
        </div>
      )) : <p>Väntar på hamstrar</p>}


    </div>

  )

}
export default Gallery
