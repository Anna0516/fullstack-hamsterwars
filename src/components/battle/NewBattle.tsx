import { useState, useEffect } from "react"
import { fixUrl } from "../../utils"
import { Hamster } from "../../models/Hamster"

const NewBattle = () => {
  const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
  const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)
  const [winner, setWinner] = useState<null | Hamster>(null)
  const [looser, setLooser] = useState<null | Hamster>(null)
  const [doesExist1, setDoesExist1] = useState<boolean>(false)
  const [doesExist2, setDoesExist2] = useState<boolean>(false)

  const winningHamsterFirst = () => {
    console.log('hamster 1 vann')

    if (firstHamster != null) {
      let newWins = firstHamster.wins + 1
      let newGames = firstHamster.games + 1

      const putWinData = {
        ...firstHamster,
        wins: newWins,
        games: newGames
      }
      setWinner(putWinData)
      setDoesExist1(true)

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
        ...secondHamster,
        defeats: newDefeats,
        games: newGames
      }
      setLooser(putDefeatData)

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

  const winningHamsterSecond = () => {
    console.log('hamster 2 vann')

    if (secondHamster != null) {
      let newWins = secondHamster.wins + 1
      let newGames = secondHamster.games + 1

      const putWinData = {
        ...secondHamster,
        wins: newWins,
        games: newGames
      }
      setWinner(putWinData)
      setDoesExist2(true)

      fetch(fixUrl(`/hamsters/${secondHamster.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putWinData),

      })
      console.log('hamster 2 updated')
    }
    if (firstHamster != null) {
      let newDefeats = firstHamster.defeats + 1
      let newGames = firstHamster.games + 1

      const putDefeatData = {
        ...firstHamster,
        defeats: newDefeats,
        games: newGames
      }
      setLooser(putDefeatData)

      fetch(fixUrl(`/hamsters/${firstHamster.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putDefeatData),

      })
      console.log('hamster 1 updated')
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
            {doesExist1 ? <div>
              <p>Vinster: {winner?.wins}</p>
              <p>Förluster: {winner?.defeats}</p> </div> : null}
            {doesExist2 ? <div>
              <p>Vinster: {looser?.wins}</p>
              <p>Förluster: {looser?.defeats}</p> </div> : null}
            <button disabled={doesExist1 || doesExist2} onClick={winningHamsterFirst}>Rösta!</button>
          </div> : <p>Hamster nr 1 förbereder sig...</p>
        }

        {firstHamster && secondHamster ?
          <div className="hamster">
            <img src={fixUrl(`/img/${secondHamster.imgName}`)} />
            <h3>{secondHamster.name}</h3>
            {doesExist2 ? <div>
              <p>Vinster: {winner?.wins}</p>
              <p>Förluster: {winner?.defeats}</p> </div> : null}
            {doesExist1 ? <div>
              <p>Vinster: {looser?.wins}</p>
              <p>Förluster: {looser?.defeats}</p> </div> : null}
            <button disabled={doesExist1 || doesExist2} onClick={winningHamsterSecond}>Rösta!</button>
          </div> : <p>Hamster nr 2 förbereder sig...</p>
        }
      </div>

      {winner != null ?
        <div className="winning-hamster">
          <h2>Vi har en vinnare!</h2>

          <img src={fixUrl(`/img/${winner.imgName}`)} />
          <p>{winner.name} är  {winner.age} år, äter {winner.favFood}, och älskar att {winner.loves}.</p>

        </div>

        : <p className="message">Inväntar resultat</p>}
    </div>
  )
}
export default NewBattle
