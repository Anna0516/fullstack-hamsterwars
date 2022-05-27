import { Hamster } from "../models/Hamster"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { fixUrl, allImgNames } from "../utils"

const SingleHamster = () => {
  const [singleHamster, setSingleHamster] = useState<null | Hamster>(null)

  const { id } = useParams()
  useEffect(() => {
    async function getSingleHamster() {
      const response: Response = await fetch(fixUrl(`/hamsters/${id}`))
      const apiData: any = await response.json()

      setSingleHamster(apiData as Hamster)
    }
    getSingleHamster()
    console.log(singleHamster)
  }, [])

  return (
    <div className="single-hamster">
      {singleHamster ?
        <>
          <img src={allImgNames(singleHamster.imgName)} />
          <h3>{singleHamster.name}</h3>
          <p>Ålder: {singleHamster.age} år</p>
          <p>Äter: {singleHamster.favFood}</p>
          <p>Älskar: {singleHamster.loves}</p>
          <p>Vinster: {singleHamster.wins}</p>
          <p>Förluster: {singleHamster.defeats}</p>
          <p>Matcher: {singleHamster.games}</p>
        </> : <p>Vald hamster kommer här</p>}

    </div>
  )
}
export default SingleHamster
