import { Hamster } from '../models/Hamster'
import { useRecoilState } from 'recoil'
import HamsterAtom from '../atoms/HamsterAtom'
import { fixUrl, allImgNames } from "../utils"
import { useEffect, useState } from 'react'

const CutestHamster = () => {
  const [data, setData] = useRecoilState<null | Hamster[]>(HamsterAtom)
  const [cutest, setCutest] = useState<null | Hamster>(null)



  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl('/hamsters/'))
      const apiData: any = await response.json()

      setData(apiData as Hamster[])
    }
    getData()
    console.log('data', data)

    if (data !== null) {

      let sortedArray = [...data].sort((a, b) => (a.wins - a.defeats) - (b.wins - b.defeats))
      let cutie = sortedArray[sortedArray.length - 1]
      const results = [...sortedArray].filter(obj => {
        return (obj.wins - obj.defeats) === (cutie.wins - cutie.defeats)
      })
      let resLength = results.length
      if (resLength > 0) {
        let randomCutie = results[Math.floor(Math.random() * results.length)]
        setCutest(randomCutie)
      } else {
        setCutest(cutie)
      }

    }
    console.log('cutest', cutest)
  }, [])

  return (
    <div className="cutest-hamster" >
      {cutest ?
        <div key={cutest.id} className="hamster">
          <h2>Den sötaste hamstern är...</h2>
          <img src={allImgNames(cutest.imgName)} />
          <h3>{cutest.name}</h3>
          <p>Rating: {cutest.wins - cutest.defeats} poäng</p>
          <p>Antal vinster: {cutest.wins}</p>
          <p>Antal förluster: {cutest.defeats}</p>
        </div>


        : <p>Väntar på sötaste hamstern...</p>}
    </div>
  )
}

export default CutestHamster

/* Array.sort((a, b) => a.resultat - b.resultat)

 if (data !== null) {
      let sortedArray = [...data].sort((a, b) => a.result - b.result)
      setCutest(sortedArray[sortedArray.length - 1])
    }
    console.log('cutest', cutest)



     {data ? [...data].sort((a, b) => a.result - b.result)
        .map((cutest) => (
          <div key={cutest.id} className="hamster">
            <h2>Den sötaste hamstern är...</h2>
            <img src={allImgNames(cutest.imgName)} />
            <h3>{cutest.name}</h3>
            <p>{cutest.result}</p>
          </div>
        ))

        : <p>Väntar på sötaste hamstern...</p>}

*/
