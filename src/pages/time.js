import React from 'react'
import Axios from 'axios'
import { GetDateTime } from '../api/DateTime';

function formatDateTime(data) {
  let month = (Number(data.getMonth())+1).toString()
  let date = data.getDate().toString()
  let hours = data.getHours().toString()
  let minutes = data.getMinutes().toString()
  let seconds = data.getSeconds().toString()
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
  return `${data.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

export function TimePage() {
  const [dateTime, setDateTime] = React.useState('')
  const [timeZone, setTimeZone] = React.useState('')

  const getDateTime = async () => {
    const sourceDateTime = Axios.CancelToken.source();
    try {
      const res = await GetDateTime(sourceDateTime)
      const date = res.date
      const result = Date.parse(new Date(Date.parse(date)).toUTCString());
      const sDate = new Date(result)
      setTimeZone(sDate.getTimezoneOffset() / -60)
      setDateTime(formatDateTime(sDate))
    } catch (e) {
      setDateTime(e)
    }
  }

  React.useEffect(() => {
    getDateTime();
  })

  return (
    <div>
      <h1>{dateTime}</h1>
      <h4>TimeZone offset: {timeZone}</h4>
    </div>
  )
}