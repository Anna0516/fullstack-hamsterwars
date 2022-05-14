import { useState, useEffect } from "react"
import { fixUrl } from "../../utils"
import { Hamster } from "../../models/Hamster"

const NewBattle = () => {
  const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
  const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)

  const UNDECIDED = 0, FIRST = 1, SECOND = 2
  const [winningHamster, setWinningHamster] = useState<number>(UNDECIDED)

  const [win, setWin] = useState<number>()

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
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setFirstHamster(apiData as Hamster)
    }
    getData()

  }, [])

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setSecondHamster(apiData as Hamster)
    }
    getData()

  }, [])
  //Funkar ej...
  /* const voteFirstHamster = (id: string) => {
     fetch(fixUrl(`/hamsters/${id}`), {
       body: JSON.stringify({
         wins: +1
       }),
       headers: {
         "Content-Type": "application/json",
       },
       method: "PUT",
     }).then((result) => {
       console.log(result)
       return result.json()
     }).then(json => {
       console.log(json)
       setWin({ wins: json })
     })
     console.log(`Hamster nr 1 har vunnit`)
   }
   /*
    const voteSecondHamster = () => {
      console.log('Hamster 2 vinner')
      setWinningHamster(winningHamster = secondHamster)
    } */

  return (

    <div className="battle">
      <div className="voting">
        {firstHamster && secondHamster ?
          <div className="hamster">
            <img src={fixUrl(`/img/${firstHamster.imgName}`)} />
            <h3>{firstHamster.name}</h3>
            <button onClick={() => setWinningHamster(FIRST)}>Rösta!</button>


          </div> : <p>Hamster nr 1 förbereder sig...</p>
        }

        {firstHamster && secondHamster ?
          <div className="hamster">
            <img src={fixUrl(`/img/${secondHamster.imgName}`)} />
            <h3>{secondHamster.name}</h3>
            <button onClick={() => setWinningHamster(SECOND)}>Rösta!</button>
          </div> : <p>Hamster nr 2 förbereder sig...</p>
        }
      </div>
      <p className="message">{winningHamsterMessage} </p>
    </div>
  )

}
export default NewBattle

//<button onClick={() => voteFirstHamster}>VoteFirst</button>
