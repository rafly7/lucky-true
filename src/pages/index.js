import { useState, useEffect, useContext } from "react"
import Axios from 'axios'
import { useHistory } from "react-router-dom"
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

import { getRole, getToken } from "../localstorage"
import { useTitle } from "../components/title"
import { range, without } from 'lodash'

function getRandomInt(min, max) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

const dropdownList = [20, 25, 50, 100, 250, 500, 1000]

function uniqFast(a) {
  const seen = {}
  const out = []
  const len = a.length
  let j = 0
  for (let i = 0; i < len; i++) {
    const item = a[i]
    if (seen[item] !== 1) {
      seen[item] = 1
      out[j++] = item
    }
  }
  return out
}

function dateTimeFormat() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export default function Index() {
  let listName;
  const resultArr = (arr) => {
    const res = arr.filter(val => {
      if (val.includes('\n')) {
        const con = val.split('\n')
        uniqFast(con).forEach(val => {
          arrE.push(val)
        })
      }
      if (!val.includes('\n')) {
        return !val.includes('\n')
      }
    })
    return without(arrE.concat(res), '')
  }

  const splitBySpace = arr => {
    const arrEmber = []
    const res = arr.filter(val => {
      if (val.includes(' ')) {
        without(val.split(' '), '').forEach(val => {
          arrEmber.push(val)
        }) 
      }
      if (!val.includes(' ')) {
        return !val.includes(' ')
      }
    })
    return res.concat(arrEmber)
  }

  const arrE = []
  const history = useHistory()
  const [numWinner, setNumWinner] = useState(1)
  const [listWinner, setListWinner] = useState([])
  const [nameParticipants, setNameParticipants] = useState('')
  const [stateOptions, setStateOptions] = useState({
    remove_name: false,
    same_names: false,
    split_names: false,
    filter_duplicate: true,
    add_information: false
  })

  const {remove_name, same_names, split_names, filter_duplicate, add_information} = stateOptions

  useEffect(() => {
    if ((getToken() !== null && getRole() !== 'Administrator') || getToken() === null) {
      history.push('/auth')
    }
  },)

  const handleDropDown = (event) => {
    setNumWinner(event.target.value)
  }

  const handleCheckBox = (event) => {
    setStateOptions({ ...stateOptions, [event.target.name]: event.target.checked})
  }

  const handleListName = (event) => {
    setNameParticipants(event.target.value.trim())
  }

  useTitle('Home - lucky draw')

  if (filter_duplicate) {
    if (nameParticipants.includes(',')) {
      const abc = nameParticipants.split(',')
      listName = uniqFast(resultArr(abc))
    } else {
      listName = uniqFast(without(nameParticipants.split('\n'), ''))
    }
  } else {
    if (nameParticipants.includes(',')) {
      const abc = nameParticipants.split(',')
      listName = resultArr(abc)
    } else {
      listName = without(nameParticipants.split('\n'), '')
    }
  }

  if (split_names) {
    listName = splitBySpace(listName)
  }

  const handleRandomName = () => {
    if (listName.length === 0 || listName.length < numWinner) {
      return
    }
    let arrEmpty = []
    const oldLength = listName.length
      for (;;) {
        const rand = getRandomInt(1, listName.length) - 1
        const result = listName[rand]
        if (arrEmpty.length === numWinner) {
          break
        } else if (same_names && numWinner > 1) {
          console.log('SAME NAMES WINNER')
          arrEmpty.push(result)
        } else {
          console.log('NOT SAME NAME')
          arrEmpty.push(result)
          arrEmpty = uniqFast(arrEmpty)
        }
    }
    if (remove_name) {
      listName = without(listName, ...arrEmpty)
    }
    setNameParticipants(listName.join('\n'))
    setListWinner(val => val.concat({result: arrEmpty.join(' '), length: oldLength, dateTime: dateTimeFormat()}))
  }

  return (
    <>
    <Container component='div' maxWidth='lg'>
      <Grid container>
        <Grid container item lg={12} md={12} sm={12} xs={12}>
          <TextField
            id='outlined-multiline-static'
            label='List Names'
            multiline
            rows={9}
            value={nameParticipants}
            onChange={handleListName}
            placeholder='Name 1, Name 2, Name 3, ...'
            variant='outlined'
            fullWidth
          />
          <div style={{display: 'flex', justifyContent: 'flex-end',width: '100%'}}>
            <p style={{fontStyle: 'italic'}}>Separate each name by comma or newline</p>
          </div>
          <div>
            <p>Number of names: <span style={{fontWeight: 'bold'}}>{listName.length}</span></p>
          </div>
          <div style={{display: 'flex', width: '100%'}}>
            <p><span style={{fontStyle: 'italic'}}>Remove all names from list</span> <span style={{color: 'blue'}}>X</span></p>
          </div>
          <div style={{display: 'flex', width: '100%', color: 'blue', alignItems: 'center'}}>
            <SettingsIcon/>
            <p style={{paddingLeft: '10px'}}>Name Picker Options</p>
          </div>
          <FormControl variant='outlined' style={{width: '100%'}}>
            <InputLabel>Number of names/winners</InputLabel>
            <Select
              defaultValue={numWinner}
              label='Number of names/winners'
              value={numWinner}
              onChange={handleDropDown}
            >
              {range(15).concat(dropdownList).map((val, index) => {
                return (
                  <MenuItem value={val < 15 ? val+1: val} key={index}>{val < 15 ? val+1: val}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl component='fieldset'>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={remove_name} onChange={handleCheckBox} name='remove_name'/>}
                label='Remove name from list of names after drawing winner'/>
              <FormControlLabel
                control={<Checkbox checked={same_names} onChange={handleCheckBox} name='same_names'/>}
                label='Same name/winner possible in one draw (when using multiple winners)'/>
              <FormControlLabel
                control={<Checkbox checked={split_names} onChange={handleCheckBox} name='split_names'/>}
                label='Split names by space'/>
              <FormControlLabel
                control={<Checkbox checked={filter_duplicate} onChange={handleCheckBox} name='filter_duplicate'/>}
                label='Filter duplicate names'/>
              <FormControlLabel
                control={<Checkbox checked={add_information} onChange={handleCheckBox} name='add_information'/>}
                label='Add contest information to results (title/intro/logo)'/>
            </FormGroup>
          </FormControl>
          {stateOptions.add_information &&
          <>
            <TextField
              label='Contest title'
              placeholder='Giveaway'
              variant='outlined'
              fullWidth
            />
            <TextField
              style={{marginTop: '20px'}}
              multiline
              rows={5}
              label='Contest intro text'
              placeholder='Thanks for joining out contest.Follow us for more!'
              variant='outlined'
              fullWidth
            />
            <TextField
              style={{marginTop: '20px', marginBottom: '20px'}}
              label='Contest logo, link to image (jpg/jpeg/png/svg/gif) :'
              placeholder='https://samantha.net/media/images/logo.png'
              variant='outlined'
              fullWidth
            />
          </>
          }
          <Button style={{marginBottom: '20px'}} color='primary' variant='outlined' onClick={handleRandomName}>Pick random name(s)</Button>
          </Grid>
      </Grid>
    </Container>
    <Container style={{backgroundColor: 'red', marginBottom: '20px'}} component='div' maxWidth='lg'>
      <Typography variant='h5'>Winners Name Picker</Typography>
      <Typography variant='h4'></Typography>
    </Container>
    {listWinner.length > 0 &&
      listWinner.map((val, index) => {
        return (
          <Container key={index}>
            {index === 0 ?
            <>
              <Typography variant='h5' style={{backgroundColor: 'yellow'}}>{listWinner[listWinner.length-index-1].result}</Typography>
              <Typography variant='h6' style={{backgroundColor: 'yellow'}}>Total name: {listWinner[listWinner.length-index-1].length} {listWinner[listWinner.length-index-1].dateTime}</Typography>
            </>
            : <> 
            <Typography variant='h5'>{listWinner[listWinner.length-index-1].result}</Typography>
            <Typography variant='h6'>Total name: {listWinner[listWinner.length-index-1].length} {listWinner[listWinner.length-index-1].dateTime}</Typography>
            </>
          }
            {/* <Typography variant='h5'>{listWinner[listWinner.length-index-1].result}</Typography>
            <Typography variant='h6'>Total name: {listWinner[listWinner.length-index-1].length} {listWinner[listWinner.length-index-1].dateTime}</Typography> */}
            {/* <Typography variant='h5'>{val.result}</Typography>
            <Typography variant='h6'>Total name: {val.length} {val.dateTime}</Typography> */}
          </Container>
        )
      })
    }
    </>
  )
}