// import './App.css';
import IndexRoute from './routers';
import { ListWinnerProvider } from './providers'

function App() {
  return(
    <ListWinnerProvider>
      <IndexRoute/>
    </ListWinnerProvider>
  )
  // return <IndexRoute/>
}

export default App;
