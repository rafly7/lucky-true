// import './textinput.css'

export function TextInput() {
  return (
    <label className='wrapper'>
      <input type='input' className='textfield' placeholder=' '/>
      <span className='placeholder'>Name</span>
    </label>
  )
}