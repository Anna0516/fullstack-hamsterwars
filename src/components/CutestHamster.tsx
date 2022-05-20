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
    console.log(data)

  }, [])


  return (
    <div className="cutest-hamster" >
      {data ? data?.map(hamster => (
        <div key={hamster.id} className="hamster">
          <h2>Den sötaste hamstern är...</h2>
          <img src={allImgNames(hamster.imgName)} />
          <h3>{hamster.name}</h3>
        </div>
      )) : <p>Väntar på hamster</p>}
    </div>
  )
}

export default CutestHamster

/*  let difference = hamsters[0].wins - hamsters[0].defeats

  hamsters.forEach((hamster) => {
    let currentDifference = hamster.wins - hamster.defeats

    if (currentDifference > difference) {
      difference = currentDifference
      cutest = [hamster]
    } else if (currentDifference === difference) {
      cutest.push(hamster)
    }
  }) */
