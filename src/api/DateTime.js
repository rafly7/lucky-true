import Axios from 'axios'
export function GetDateTime(source) {
  try {
    return Axios.get('https://simalat.sinarmasmining.com/time', {
      cancelToken: source.token
    }).then((res) => {
      return res.headers
    })
  } catch (e) {
    if (Axios.isCancel(e)) return;
    throw e;
  }
}