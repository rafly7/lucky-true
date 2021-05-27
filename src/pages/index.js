import { useState, useEffect, useContext } from "react"
import {GetAllMember} from '../api/get_all_member'
import Axios from 'axios'
import { RandomReveal } from "react-random-reveal"
import '../styles/index.css'
import {NavBar} from '../components/navbar'
import { getRole, getToken } from "../localstorage"
import { useHistory } from "react-router-dom";
import { AddMember } from "../api/add_member"
import { useTitle } from "../components/title"
import { Dialog } from "@material-ui/core"
import { ListWinnerContext } from "../providers"
import {union as _union} from 'lodash'

function getRandomInt(min, max) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

export default function Index() {
  const history = useHistory()
  const [listWinner, setListWinner] = useContext(ListWinnerContext)
  const source = Axios.CancelToken.source();
  const [members, setMembers] = useState([])
  const [isClick, setIsClick] = useState(false)
  const [open, setOpen] = useState(false)
  const [btnEnabled, setBtnEnabled] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    if ((getToken() !== null && getRole() !== 'Administrator') || getToken() === null) {
      history.push('/auth')
    }
  },)

  const getAllMember = async () => {
    try {
      if (isClick) {
        setMembers([])
        setIsClick(!isClick)
      }
      else {
        const res = await GetAllMember(source, getToken())
        if (res.results[0].name === undefined) {
          alert('Something went wrong')
          return
        }
        if (res.total > 0) {
          let arrs = []
          for (;;) {
            if (arrs.length === 5) {
              break
            } else {
              const rand = getRandomInt(1, res.total)
              if (rand !== undefined && res.results[rand] !== undefined) {
                arrs.push(res.results[rand])
                arrs = arrs.filter((thing, index, self) =>
                  index === self.findIndex((t) => (
                    t.id === thing.id && t.id === thing.id
                  ))
                )
                for( var i = arrs.length - 1; i>=0; i--){
                  for( var j=0; j < listWinner.length; j++){
                    if (arrs[i].id !== undefined && listWinner[j].id !== undefined) {
                      if(arrs[i].id === listWinner[j].id){
                        arrs.splice(i, 1);
                      }
                    }
                  }
                }
              }
            }
          }
          setMembers(val => val.concat(arrs))
          setListWinner(val => val.concat(arrs))
          setIsClick(!isClick)
          setBtnEnabled(!btnEnabled)
          if (isClick === false) {
            setTimeout(function () {
              setOpen(!open)
            }, 3000)
          }
        } else {
          alert('Empty member')
        }
      }
    } catch (e) {
      alert('Something went wrong')
    }
  }

  const addMember = async (e) => {
    try {
      e.preventDefault()
      const res = await AddMember(source, {name: e.target.name.value}, getToken())
      if (res.id) {
        alert('Success add member')
      }
    } catch (e) {
      if (e.response.status === 400) {
        alert(e.response.data.message)
      } else {
        alert('Something went wrong')
      }
    }
  }

  const handleClose = () => {
    setOpen(!open)
    setBtnEnabled(!btnEnabled)
  }

  useTitle('Home - lucky draw')
  // console.log(listWinner)
  return (
    <div className='App' style={{filter: open ? 'blur(8px)' : 'none'}}>
      <Dialog
      className='dialogCustom'
        open={open}
        onClose={() => handleClose()}
        
      >
        {members.length > 0
         ? <div>
            {members.map((val, index) => {
              // if (index === 0) {
              //   return <div key={index}>
              //     <h1 style={{display: 'inline', color: '#f1c40f', marginRight: '20px'}}>1</h1>
              //     <h1 style={{display: 'inline'}}>{val.name}</h1>
              //   </div>
              // } else if (index === 1) {
              //   return <div key={index}>
              //     <h1 style={{display: 'inline', color: '#2ecc71', marginRight: '20px'}}>2</h1>
              //     <h1 style={{display: 'inline'}}>{val.name}</h1>
              //   </div>
              // } else if (index === 2) {
              //   return <div key={index}>
              //     <h1 style={{display: 'inline', color: '#e74c3c', marginRight: '20px'}}>3</h1>
              //     <h1 style={{display: 'inline'}}>{val.name}</h1>
              //   </div>
              // } else {
                return <div key={index} style={{marginBottom: '15px'}}>
                  <h2 style={{display: 'inline', color: '#f1c40f', marginRight: '20px'}}>{index+1}.</h2>
                  <h2 style={{display: 'inline'}}>{val.name}</h2>
                </div>
              //}
            })}
          </div>
         : null}
      </Dialog>
      <NavBar>

      <section className='container'>
        <div className='subContainer'>
          {isClick === false && members.length === 0
            ? <>
                <form onSubmit={addMember}>
                  <label className='nameLabel'>Name</label>
                  <input name='name' className='nameInput' value={name} onChange={(e) => setName(e.target.value)} placeholder='name new member'/>
                  <button className='spinButton addButton'>Add</button>
                </form>
                <button className='spinButton' onClick={() => getAllMember()}>Start</button>
              </>
            : <div className='result'>
                {members.map((val, index) => {
                  return <h3 className='result-name' key={index}>
                    <RandomReveal
                      isPlaying
                      duration={3}
                      revealDuration={0.7}
                      characters={val.name}
                    />
                  </h3>
                })}
                <button disabled={btnEnabled} className={!btnEnabled ? `spinButton btnEnabled` : 'spinButton btnDisabled'} onClick={() => getAllMember()}>Clear</button>
              </div>
          }
          
        </div>
      </section>
      </NavBar>
    </div>
  )
}