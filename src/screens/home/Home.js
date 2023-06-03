import './Home.css'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory()

  const addChannel = () => {
    history.push('/add/channel')
  }

  return (
    <div className="home">
      <div className="home__container">
        <img src="/logo.png" alt="ThinkSync Logo" />
        <h1>Welcome to ThinkSync</h1>
        <p>
          ThinkSync brings your team together, including your preferred AI partners!
        </p>

        <p>
          We want to supercharge your productivity with the power of AI!
        </p>

        <Button onClick={addChannel}>Create Channel</Button>
      </div>
    </div>
  )
}

export default Home
