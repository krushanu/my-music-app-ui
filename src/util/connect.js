import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_HOST;
axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_TOKEN;

const getData = async (URL) => {
  try {
    const resp = await axios.get(URL)
    console.log("resp : ", resp)
    return resp.data
  } catch (error) {
    console.error(error)
  }
}

export default getData

