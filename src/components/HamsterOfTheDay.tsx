import { useState, useEffect } from "react"

interface Hamster {
  name: string;
  age: number;
  favFood: string;
  loves: string;
  imgName: string;
  wins: number;
  defeats: number;
  games: number;
  id: string;
}

const HamsterOfTheDay = () => {
  const [data, setData] = useState<null | Hamster>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch('http://localhost:1975/hamsters/random')
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
          <img src={data.imgName} />
          <h3>{data.name}</h3>
          <p>Favoritsysselsättning: {data.loves} </p>
        </div>
        : <p>Väntar på dagens favorithamster</p>}


    </div>

  )

}
export default HamsterOfTheDay

/* http://localhost:1975/hamsters/random */
