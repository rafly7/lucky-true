import Axios from "axios";
import { BASE_URL, AUTH_USER } from "../utils/constants";

export async function AuthLogin(source, data) {
  try {
    return Axios.post(BASE_URL + AUTH_USER, data, {
      cancelToken: source.token,
    }).then((res) => res.data);
  } catch (e) {
    if (Axios.isCancel(e)) return true;
    throw e;
  }
}
