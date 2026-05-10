import axios from 'axios'
const basicUrl = '/api/logins'

const login = async (Credentials) => {

  const response = await axios.post(basicUrl, Credentials)
  return response.data
}

export default { login }