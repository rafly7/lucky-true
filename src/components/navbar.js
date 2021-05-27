import { useHistory } from "react-router-dom";
import { clearAllStorage } from "../localstorage";

export function NavBar({children}) {
  const history = useHistory()
  
  const handleLogout = () => {
    clearAllStorage()
    history.push('/auth')
  }

  return (
    <section className='hero'>
      <nav>
        <h2>Welcome</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {children}
    </section>
  )
}