import { useState, useEffect } from "react"
import { fixUrl, allImgNames } from "../../utils"
import { Hamster } from "../../models/Hamster"

export function StartNewBattle() {
  const [firstHamster, setFirstHamster] = useState<null | Hamster>(null)
  const [secondHamster, setSecondHamster] = useState<null | Hamster>(null)
  const [winner, setWinner] = useState<null | Hamster>(null)
  const [looser, setLooser] = useState<null | Hamster>(null)
  const [hasVoted1, setHasVoted1] = useState<boolean>(false)
  const [hasVoted2, setHasVoted2] = useState<boolean>(false)

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
