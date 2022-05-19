import { fixUrl } from '../utils'

interface Props {
  hamsterid: string;
}

const DeleteHamster = ({ hamsterid }: Props) => {

  const deleteHamster = () => {
    fetch(fixUrl(`/hamsters/${hamsterid}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: null
    })

    console.log('hamster raderad')
  }

  return (
    <div className="delete-button">
      <button onClick={deleteHamster}> ⚠️ Radera hamster</button>
    </div>
  )
}

export default DeleteHamster
