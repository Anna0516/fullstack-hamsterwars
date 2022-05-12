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

const TestFetch = () => {
  const [data, setData] = useState<null | Hamster[]>(null)

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch('http://localhost:1975/hamsters/')
      const apiData: any = await response.json()

      setData(apiData as Hamster[])
    }
    getData()
    console.log(data)
  }, [])
  return (
    <div>
      <ul>
        {data ? data.map(hamster => (
          <li key={hamster.id}>{hamster.name}</li>
        )) : <li>Hamstrarna kommer snart</li>}
      </ul>
    </div>
  )
}
export default TestFetch
