import { fixUrl } from '../utils'
import { Hamster } from '../models/Hamster'
import { useRecoilState } from 'recoil'
import HamsterAtom from '../atoms/HamsterAtom'

interface Props {
  hamsterid: string;
}

const DeleteHamster = ({ hamsterid }: Props) => {

  const [data, setData] = useRecoilState<null | Hamster[]>(HamsterAtom)

  const deleteHamster = async () => {
    const response: Response = await fetch(fixUrl(`/hamsters/${hamsterid}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })
    if (response.status === 200) {
      console.log('hamster raderad')

      async function getData() {
        const response: Response = await fetch(fixUrl('/hamsters/'))
        const apiData: any = await response.json()

        setData(apiData as Hamster[])
      }
      getData()
    }

  }

  return (
    <div className='delete'>
      <button className='delete-button' onClick={deleteHamster}> ⚠️ Radera hamster</button>
    </div>
  )
}

export default DeleteHamster
