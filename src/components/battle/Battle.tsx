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

const Battle = () => {
  const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
  const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)

  const UNDECIDED = 0, FIRST = 1, SECOND = 2
  const [winningHamster, setWinningHamster] = useState<number>(UNDECIDED)

  let winningHamsterMessage: string = ''
  if (winningHamster === FIRST) {
    winningHamsterMessage = `Du röstade på Hamster nr 1`
    console.log('hamster 1 vann')
  } else if (winningHamster === SECOND) {
    winningHamsterMessage = `Du röstade på Hamster nr 2`
    console.log('hamster 2 vann')
  }

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch('http://localhost:1975/hamsters/random')
      const apiData: any = await response.json()

      setFirstHamster(apiData as Hamster)
    }
    getData()

  }, [])

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch('http://localhost:1975/hamsters/random')
      const apiData: any = await response.json()

      setSecondHamster(apiData as Hamster)
    }
    getData()

  }, [])
  /*
    const voteFirstHamster = (id: string) => {
      /*fetch(`http://localhost:1975/hamsters/` + id, {
        body: JSON.stringify({
          id: id,
          wins: +1
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then((result) => {
        console.log(result)
      })*/
  /* console.log(`Hamster nr 1 har vunnit`)
 }

 const voteSecondHamster = () => {
   console.log('Hamster 2 vinner')
   setWinningHamster(winningHamster = secondHamster)
 } */

  return (
    <div className="battle">
      {firstHamster && secondHamster ?
        <div className="hamster">
          <img src={firstHamster.imgName} />
          <h3>{firstHamster.name}</h3>
          <button onClick={() => setWinningHamster(FIRST)}>Rösta!</button>
        </div> : <p>Hamster nr 1 förbereder sig...</p>
      }

      {firstHamster && secondHamster ?
        <div className="hamster">
          <img src={secondHamster.imgName} />
          <h3>{secondHamster.name}</h3>
          <button onClick={() => setWinningHamster(SECOND)}>Rösta!</button>
        </div> : <p>Hamster nr 2 förbereder sig...</p>
      }

      <p className="message">{winningHamsterMessage} </p>
    </div>
  )

}
export default Battle
