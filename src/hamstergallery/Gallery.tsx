import { useEffect } from "react"
import { Hamster } from '../models/Hamster'
import { fixUrl, allImgNames } from "../utils"
import AddHamster from "./AddHamster"
import { Link } from 'react-router-dom'
import DeleteHamster from "./DeleteHamster"
import { useRecoilState } from "recoil"
import HamsterAtom from "../atoms/HamsterAtom"
import './Gallery.css'

const Gallery = () => {
  const [data, setData] = useRecoilState<null | Hamster[]>(HamsterAtom)

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

    <div className="gallery">
      <AddHamster />

      {data ? data.map(hamster => (
        <div key={hamster.id} className="hamster">

          <img src={allImgNames(hamster.imgName)} />

          <h3>{hamster.name}</h3>
          <p>Ålder: {hamster.age} år</p>
          <Link className="info-link" to={'/singlehamster/' + hamster.id}>Mer info</Link>

          <DeleteHamster hamsterid={hamster.id} />

        </div>

      )) : <p>Väntar på hamstrar</p>}
    </div>
  )
}
export default Gallery
