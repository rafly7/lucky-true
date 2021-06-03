import { useState } from "react"
// import '../styles/auth.css'
import {AuthLogin} from '../api/auth'
import Axios from 'axios'
import { useHistory } from "react-router-dom";
import { saveRole, saveToken } from "../localstorage";
import { useTitle } from "../components/title";

export default function Auth() {
  const history = useHistory()
  const source = Axios.CancelToken.source();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const handleAuthLogin = async (e) => {
    try {
      e.preventDefault()
      const res = await AuthLogin(source, {
        email: e.target.email.value,
        password: e.target.password.value
      })
      if (res.token && res.role === 'Administrator') {
        alert('Login as Admin')
        saveToken(res.token)
        saveRole(res.role)
        history.push('/')
      }
    } catch (e) {
      if (e.response.status === 400) {
        alert(e.response.data.message)
      } else {
        alert('Something went wrong')
      }
      console.log(e)
    }
  }

  useTitle('Auth login')
  return (
    <div className='App'>
      <section className='login'>
        <div className='loginContainer'>
          <form onSubmit={handleAuthLogin}>
            <label>Email</label>
            <input
              type='text'
              name='email'
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type='password'
              name='password'
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='btnContainer'>
              <button type='submit'>Sign in</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}