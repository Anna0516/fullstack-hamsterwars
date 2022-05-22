import { Hamster } from '../models/Hamster'
import { useState } from 'react'
import { fixUrl } from '../utils'
import { useRecoilState } from 'recoil'
import HamsterAtom from '../atoms/HamsterAtom'


const AddHamster = () => {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [favFood, setFavFood] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [data, setData] = useRecoilState<null | Hamster[]>(HamsterAtom)

  const newHamster: Hamster = {
    name: name,
    age: Number(age),
    favFood: favFood,
    loves: loves,
    imgName: imgName,
    wins: 0,
    defeats: 0,
    games: 0,
    result: 0,
    id: ''
  }

  const nameIsValid = newHamster.name !== ''
  const ageIsValid = newHamster.age >= 1 && Number.isInteger(newHamster.age) === true
  const favFoodIsValid = newHamster.favFood !== ''
  const lovesIsValid = newHamster.loves !== ''
  const imgNameIsValid = newHamster.imgName !== ''
  const formIsValid = nameIsValid && ageIsValid && favFoodIsValid && lovesIsValid && imgNameIsValid

  //användarvänliga felmeddelanden?

  const handleAddHamster = async () => {

    const response: Response = await fetch(fixUrl('/hamsters'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHamster)
    })
    if (response.status === 200) {
      async function getData() {
        const response: Response = await fetch(fixUrl('/hamsters/'))
        const apiData: any = await response.json()

        setData(apiData as Hamster[])
      }
      getData()
    }
    setName('')
    setAge('')
    setFavFood('')
    setLoves('')
    setImgName('')

  }

  return (
    <div className='add-hamster'>
      <h3>Lägg till en ny hamster!</h3>
      <input type="text" placeholder='Hamsterns namn' onChange={event => setName(event.target.value)} value={name} />
      <input type="text" placeholder='Hamsterns ålder' onChange={event => setAge(event.target.value)} value={age} />
      <input type="text" placeholder='Hamsterns favoritmat' onChange={event => setFavFood(event.target.value)} value={favFood} />
      <input type="text" placeholder='Hamstern älskar...' onChange={event => setLoves(event.target.value)} value={loves} />
      <input type="text" placeholder='Bild url' onChange={event => setImgName(event.target.value)} value={imgName} />
      <div>
        <button disabled={!formIsValid} onClick={handleAddHamster}>Lägg till hamster!</button>
      </div>
    </div>
  )
}
export default AddHamster
