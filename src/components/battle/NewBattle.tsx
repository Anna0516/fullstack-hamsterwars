import { useState, useEffect } from "react"
import { fixUrl } from "../../utils"
import { Hamster } from "../../models/Hamster"
import { setFlagsFromString } from "v8"

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
    if (firstHamster != null) {
      let newWins = firstHamster.wins + 1
      let newGames = firstHamster.games + 1

      const putWinData = {
        wins: newWins,
        games: newGames
      }
      fetch(fixUrl(`/hamsters/${firstHamster.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putWinData),

      })
      console.log('hamster 1 updated')
    }
    if (secondHamster != null) {
      let newDefeats = secondHamster.defeats + 1
      let newGames = secondHamster.games + 1

      const putDefeatData = {
        defeats: newDefeats,
        games: newGames
      }
      fetch(fixUrl(`/hamsters/${secondHamster.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putDefeatData),

      })
      console.log('hamster 2 updated')
    }

  }

  else if (winningHamster === SECOND) {
    winningHamsterMessage = `Du röstade på Hamster nr 2`
    console.log('hamster 2 vann')
    if (secondHamster != null) {
      let newWins = secondHamster.wins + 1
      let newGames = secondHamster.games + 1

      const putWinData = {
        wins: newWins,
        games: newGames
      }
      fetch(fixUrl(`/hamsters/${secondHamster.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putWinData),

      })
      console.log('hamster 1 updated')
    }
    if (firstHamster != null) {
      let newDefeats = firstHamster.defeats + 1
      let newGames = firstHamster.games + 1

      const putDefeatData = {
        defeats: newDefeats,
        games: newGames
      }
      fetch(fixUrl(`/hamsters/${firstHamster.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putDefeatData),

      })
      console.log('hamster 2 updated')
    }
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
