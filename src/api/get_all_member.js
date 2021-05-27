import Axios from "axios";
import { BASE_URL, MEMBER } from "../utils/constants";

export async function GetAllMember(source, token) {
  try {
    return Axios.get(BASE_URL + MEMBER, {
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
