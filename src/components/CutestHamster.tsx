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
      let sortedArray = data.sort((a, b) => a.result - b.result)
      setCutest(sortedArray[0])
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
          <p>{cutest.result}</p>
        </div>
        : <p>Väntar på hamster</p>}
    </div>
  )
}

export default CutestHamster

/* let sortedArray = data?.sort((a, b) => a.result - b.result);
    if (sortedArray !== undefined) {
      let cutie = sortedArray[0];
      setCutest(cutie as Hamster)
      console.log('cutie', cutie)
    }

    console.log('sorted array', sortedArray)
    console.log('cutest', cutest) */
