import { useState, useEffect } from "react"
import { fixUrl, allImgNames } from "../../utils"
import { Hamster } from "../../models/Hamster"
import './Battle.css'

const NewBattle = () => {
  const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
  const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)
  const [winner, setWinner] = useState<null | Hamster>(null)
  const [looser, setLooser] = useState<null | Hamster>(null)
  const [hasVoted1, setHasVoted1] = useState<boolean>(false)
  const [hasVoted2, setHasVoted2] = useState<boolean>(false)

  //Röstar på nr 1
  const winningHamsterFirst = () => {
    console.log('hamster 1 vann')

    if (firstHamster != null) {
      let newWins = firstHamster.wins + 1 //lägger till vinster, matcher
      let newGames = firstHamster.games + 1
      let newResult = firstHamster.wins - firstHamster.defeats

      const putWinData = {
        ...firstHamster,
        wins: newWins,
        games: newGames,
        result: newResult
      }
      setWinner(putWinData)
      setHasVoted1(true) //ser till så att röstknappen blir disabled efter röstning

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
      let newDefeats = secondHamster.defeats + 1 //lägger till förluster/matcher
      let newGames = secondHamster.games + 1
      let newResult = secondHamster.wins - secondHamster.defeats

      const putDefeatData = {
        ...secondHamster,
        defeats: newDefeats,
        games: newGames,
        result: newResult
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
  //Röstar på nr 2
  const winningHamsterSecond = () => {
    console.log('hamster 2 vann')

    if (secondHamster != null) {
      let newWins = secondHamster.wins + 1 //lägger till vinster/matcher
      let newGames = secondHamster.games + 1
      let newResult = secondHamster.wins - secondHamster.defeats

      const putWinData = {
        ...secondHamster,
        wins: newWins,
        games: newGames,
        result: newResult
      }
      setWinner(putWinData)
      setHasVoted2(true) //ser till så att röstknappen blir disabled efter röstning

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
      let newDefeats = firstHamster.defeats + 1 //lägger till förluster/matcher
      let newGames = firstHamster.games + 1
      let newResult = firstHamster.wins - firstHamster.defeats

      const putDefeatData = {
        ...firstHamster,
        defeats: newDefeats,
        games: newGames,
        result: newResult
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

  //Hämtar första random hamster
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setFirstHamster(apiData as Hamster)
    }
    getData()

  }, [])
  //Hämtar andra random hamster
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setSecondHamster(apiData as Hamster)
    }
    getData()

  }, [])
  //Startar ny spelomgång
  const StartNewGame = () => {
    setFirstHamster(null)
    setSecondHamster(null)
    setWinner(null)
    setLooser(null)
    setHasVoted1(false)
    setHasVoted2(false)

    //Hämtar ny första random hamster

    async function getData1() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setFirstHamster(apiData as Hamster)
    }
    getData1()
    console.log('ny match h1')

    //Hämtar ny andra random hamster

    async function getData2() {
      const response: Response = await fetch(fixUrl('/hamsters/random'))
      const apiData: any = await response.json()

      setSecondHamster(apiData as Hamster)
    }
    getData2()
    console.log('ny match h2')
  }

  return (
    <div className="battle">
      <div className="battle-instructions">
        <h2>Dags att tävla!</h2>
        <p>Rösta på din favorit genom att trycka på röstningsknappen under den hamster du tycker är sötast. Resultatet av matchen kommer att visas, och du ges möjlighet att starta en ny match.</p>
      </div>
      <div className="voting">
        {firstHamster && secondHamster ? //Tävlande nr 1 och 2
          <>
            <div className="hamster">
              <img src={allImgNames(firstHamster.imgName)} />
              <h3>{firstHamster.name}</h3>
              {hasVoted1 ? <div>
                <p>Vinster: {winner?.wins}</p>
                <p>Förluster: {winner?.defeats}</p> </div> : null}
              {hasVoted2 ? <div>
                <p>Vinster: {looser?.wins}</p>
                <p>Förluster: {looser?.defeats}</p> </div> : null}
              <button disabled={hasVoted1 || hasVoted2} onClick={winningHamsterFirst}>Rösta!</button>
            </div>

            <div className="hamster">
              <img src={allImgNames(secondHamster.imgName)} />
              <h3>{secondHamster.name}</h3>
              {hasVoted2 ? <div>
                <p>Vinster: {winner?.wins}</p>
                <p>Förluster: {winner?.defeats}</p> </div> : null}
              {hasVoted1 ? <div>
                <p>Vinster: {looser?.wins}</p>
                <p>Förluster: {looser?.defeats}</p> </div> : null}
              <button disabled={hasVoted1 || hasVoted2} onClick={winningHamsterSecond}>Rösta!</button>
            </div>
          </> : <p>Hamster nr 1 och 2 förbereder sig...</p>
        }


        {winner != null ? //Visar vinnaren
          <div className="winning-hamster">
            <h2>Vi har en vinnare!</h2>

            <img src={allImgNames(winner.imgName)} />
            <p>{winner.name} är  {winner.age} år, äter {winner.favFood}, och älskar att {winner.loves}.</p>
            <p>({winner.wins} vinst/er, {winner.defeats} förlust/er, {winner.games} match/er)</p>
            <button onClick={StartNewGame}>Starta ny match</button>
          </div>

          : <div> <p className="message">Inväntar resultat</p> </div>}
      </div>
    </div>
  )
}
export default NewBattle
