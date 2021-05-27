const KEY_TOKEN = 'TOKEN'
const KEY_ROLE = 'ROLE'

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value)
}

const saveRole = role => {
  saveToLocalStorage(KEY_ROLE, role) 
}

const saveToken = token => {
  saveToLocalStorage(KEY_TOKEN, `Bearer ${token}`)
}

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem(KEY_TOKEN) : null
}

function getRole() {
  return typeof window !== 'undefined' ? localStorage.getItem(KEY_ROLE) : null
}

const clearAllStorage = () => {
  localStorage.clear()
}

const updateToken = token => {
  localStorage.removeItem(KEY_TOKEN)
  saveToLocalStorage(KEY_TOKEN,`Bearer ${token}`)
}

export { saveRole, saveToken, getToken, getRole, clearAllStorage, updateToken }