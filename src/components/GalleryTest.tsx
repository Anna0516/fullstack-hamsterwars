import { useState } from "react"
import { HamsterTest } from "./models/HamsterTest"
import { TestHamsterData } from "./TestHamsterData"

const Gallery = () => {
  const [hamsters, setHamsters] = useState<HamsterTest[]>(TestHamsterData)
  return (
    <div className="gallery">

      {hamsters.map(hamster => (
        <div key={hamster.name} className="hamster">

          <img src={hamster.imgName} />
          <h3>{hamster.name}</h3>
        </div>
      ))}


    </div>

  )

}
export default Gallery
