import TestFetch from "./TestFetch"
import TodaysHamster from "./TodaysHamster"

const Home = () => (
  <div className="home">
    <h3>Hamsterwars</h3>
    <p>Text om Hamsterwars kommer här.</p>
    <TodaysHamster />
    <TestFetch />
  </div>
)
export default Home
