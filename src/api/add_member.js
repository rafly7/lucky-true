import Axios from "axios";
import { BASE_URL, MEMBER } from "../utils/constants";

export async function AddMember(source, data, token) {
  try {
    return Axios.post(BASE_URL + MEMBER, data, {
      cancelToken: source.token,
      headers: {
        authorization: token,
      }
    }).then((res) => res.data);
  } catch (e) {
    if (Axios.isCancel(e)) return true;
    throw e;
  }
}
