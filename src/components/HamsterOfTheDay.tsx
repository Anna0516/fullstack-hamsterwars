import { useState, useEffect } from "react"
import { fixUrl } from "../utils"
import { Hamster } from "../models/Hamster"


const HamsterOfTheDay = () => {
  const [data, setData] = useState<null | Hamster>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setData(apiData as Hamster)
    }
    getData()
    console.log(data)
  }, [])

  return (
    <div className="hamster-of-the-day">

      {data ?
        <div className="hamster">
          <h3>Dagens hamster:</h3>
          <img src={fixUrl(`/img/${data.imgName}`)} />
          <h3>{data.name}</h3>
          <p>Favoritsysselsättning: {data.loves} </p>
        </div>
        : <p>Väntar på dagens favorithamster</p>}


    </div>

  )

}
export default HamsterOfTheDay

/* http://localhost:1975/hamsters/random */
