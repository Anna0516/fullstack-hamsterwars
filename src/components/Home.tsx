
import HamsterOfTheDay from "./HamsterOfTheDay"

const Home = () => (
  <div className="home">
    <div className="home-message">
      <h3>Välkommen till Hamsterwars!</h3>
      <p >Om du alltid längtat efter att få jämföra hamstrar har du kommit alldeles rätt. Må den sötaste hamstern vinna!</p>
    </div>

    <HamsterOfTheDay />

  </div>
)
export default Home
