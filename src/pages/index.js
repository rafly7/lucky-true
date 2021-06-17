import { useState } from "react"
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';

import { useTitle } from "../components/title"
import { range, without } from 'lodash'
import { ResultNameWinner, AfterNameWinner } from "../components/ResultNameWinner"
import LogoBrand from '../assets/images/logo_samantha.png'

function getRandomInt(min, max) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

const dropdownList = [10, 15, 20, 'Custom']

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
  let month = d.getMonth().toString()
  let date = d.getDate().toString()
  let hours = d.getHours().toString()
  let minutes = d.getMinutes().toString()
  let seconds = d.getSeconds().toString()
  if (month.length < 2)
    month = `0${month}`
  if (date.length < 2)
    date = `0${date}`
  if (hours.length < 2)
    hours = `0${hours}`
  if (minutes.length < 2)
    minutes = `0${minutes}`
  if (seconds.length < 2)
    seconds = `0${seconds}`
  return `${d.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const ButtonCustom = styled.p`
  &:hover {
    color: blue
  }
  cursor: pointer
`
const ClearResults = styled.h4`
  &:hover {
    color: blue
  }
  cursor: pointer
`

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
    return uniqFast(res.concat(arrEmber))
  }

  const arrE = []
  const history = useHistory()
  const [numWinner, setNumWinner] = useState(1)
  const [customNumWinner, setCustomNumWinner] = useState(1)
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

  const handleDropDown = (event) => {
    setNumWinner(event.target.value)
  }

  const handleCheckBox = (event) => {
    setStateOptions({ ...stateOptions, [event.target.name]: event.target.checked})
  }

  const handleListName = (event) => {
    setNameParticipants(event.target.value)
  }

  const handleCustomNumWinner = (event) => {
    const val = event.target.value
    if (Number(val) < 0) {
      return
    }
    setCustomNumWinner(val)
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

  const resultNameWinner = numNameWinner => {
    let arrEmpty = []
    const oldLength = listName.length
      for (;;) {
        const rand = getRandomInt(1, listName.length) - 1
        const result = listName[rand]
        if (arrEmpty.length === numNameWinner) {
          break
        } else if (same_names && numNameWinner > 1) {
          // console.log('SAME NAMES WINNER')
          arrEmpty.push(result)
        } else {
          // console.log('NOT SAME NAME')
          arrEmpty.push(result)
          arrEmpty = uniqFast(arrEmpty)
        }
    }
    if (remove_name) {
      listName = without(listName, ...arrEmpty)
    }
    if ((split_names && remove_name) || !split_names) {
      setNameParticipants(listName.join('\n'))
    }
    setListWinner(val => val.concat({result: arrEmpty, length: oldLength, dateTime: dateTimeFormat()}))
  }

  const handleRandomName = () => {
    if (numWinner === 'Custom') {
      const val = Number(customNumWinner)
      if (listName.length === 0 || listName.length < val || val === 0) {
        return
      } else {
        resultNameWinner(val)
      }
    } else if (listName.length === 0 || listName.length < numWinner) {
      return
    } else {
      resultNameWinner(numWinner)
    }
  }
  const classes = useStyles();
  // console.log(listName)

  return (
    <>
    <AppBar position="static" style={{backgroundColor: '#e74c3c'}}>
      <Container component="div" maxWidth="lg" style={{ paddingLeft: "10px" }}>
      <Toolbar>
        <img src={LogoBrand}  style={{width:'7%', height:'7%'}} />
        {/* <Typography variant="h6" className={classes.title}>
          SAMANTHA
        </Typography> */}
      </Toolbar>
      </Container>
    </AppBar>
    <Container component='div' maxWidth='lg'>
      <Grid container>
        <Grid container item lg={12} md={12} sm={12} xs={12}>
          <TextField
            label='List Names'
            multiline
            rows={9}
            value={nameParticipants}
            style={{marginTop: '20px'}}
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
            <ButtonCustom onClick={() => setNameParticipants('')}><span style={{fontStyle: 'italic'}}>Remove all names from list</span> <span style={{color: 'blue'}}>X</span></ButtonCustom>
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
              {range(5).concat(dropdownList).map((val, index) => {
                return (
                  <MenuItem value={val < 5 ? val+1: val} key={index}>{val < 5 ? val+1: val}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
          {numWinner === 'Custom' ?
            <TextField
              label='Custom Number'
              type='number'
              value={customNumWinner}
              style={{marginTop: '20px'}}
              onChange={handleCustomNumWinner}
              placeholder='Number'
              variant='outlined'
              fullWidth
            />
            : <div/>
          }
          <FormControl component='fieldset'>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={remove_name} onChange={handleCheckBox} name='remove_name'/>}
                label='Remove name from list of names after drawing winner'/>
              <FormControlLabel
                style={{cursor: numWinner < 2 && 'not-allowed', color: numWinner < 2 && '#ecf0f1'}}
                control={
                  numWinner < 2 
                  ? <Checkbox checked={same_names} name='same_names' style={{cursor: 'not-allowed', color: '#ecf0f1'}}/>
                  : <Checkbox checked={same_names} onChange={handleCheckBox} name='same_names'/>
                }
                label='Same name/winner possible in one draw (when using multiple winners)'/>
              <FormControlLabel
                control={<Checkbox checked={split_names} onChange={handleCheckBox} name='split_names'/>}
                label='Split names by space'/>
              <FormControlLabel
                control={<Checkbox checked={filter_duplicate} onChange={handleCheckBox} name='filter_duplicate'/>}
                label='Filter duplicate names'/>
              {/* <FormControlLabel
                control={<Checkbox checked={add_information} onChange={handleCheckBox} name='add_information'/>}
                label='Add contest information to results (title/intro/logo)'/> */}
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
          </Grid>
          <Button fullWidth style={{color: listName.length < 2 && '#bdc3c7', borderColor: listName.length < 2 && '#bdc3c7' ,marginTop: '20px',marginBottom: '20px', cursor: listName.length < 2 && 'not-allowed'}} color='secondary' variant='outlined' onClick={listName.length > 1 && handleRandomName}>Pick random name(s)</Button>
      </Grid>
    </Container>
    <Container component='div' maxWidth='lg'>
      <div style={{display: 'flex', flexGrow: '1', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography variant='h5'>Winners Name Picker</Typography>
      {listWinner.length !== 0 &&
        <ClearResults onClick={() => setListWinner([])} style={{display: 'inline', justifyContent: 'end', fontWeight: 'normal', fontStyle: 'italic'}}>Clear results <span style={{color: 'blue'}}>X</span></ClearResults>
      }
      </div>
      {listWinner.length === 0 && <Typography display='block' variant='body1'>Empty</Typography>}
    </Container>
    {listWinner.length > 0 &&
      listWinner.map((val, index) => {
        return (
          <Container key={index}>
            {index === 0 ?
              <div style={{padding: '10px', borderRadius: '20px', backgroundColor: '#f54748', marginBottom: '20px'}}>
                <ResultNameWinner listWinner={listWinner} index={index}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Typography display='inline' variant='h6' style={{color: 'white', marginTop: '10px'}}>Total names: {listWinner[listWinner.length-index-1].length}</Typography>
                  <Typography display='inline' variant='h6' style={{color: 'white', marginTop: '10px'}}>{listWinner[listWinner.length-index-1].dateTime}</Typography>
                </div>
              </div>
            : 
            <div style={{marginBottom: '20px', padding: '10px', borderColor: 'black', borderStyle: 'solid', borderRadius: '20px', borderWidth: '0.5px'}}> 
              {/* <Typography style={{marginBottom: '10px', fontWeight: 'bold'}} variant='body1'>{listWinner[listWinner.length-index-1].result}</Typography> */}
              <AfterNameWinner listWinner={listWinner} index={index}/>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography display='inline' variant='body1'>Total names: {listWinner[listWinner.length-index-1].length}</Typography>
                <Typography display='inline' variant='body1'>{listWinner[listWinner.length-index-1].dateTime}</Typography>
              </div>
            </div>
            }
          </Container>
        )
      })
    }
    </>
  )
}