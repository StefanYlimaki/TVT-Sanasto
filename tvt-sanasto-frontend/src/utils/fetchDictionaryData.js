import axios from 'axios'

/**
 * This function is responsible for fetching dictionaries from the given backend url
 */
const fetchDictionaryData = () => {
  localStorage.clear()
  const dictionaries = ['basic-comp', 'internet-basic']

  dictionaries.map((d) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}${d}`)
      .then((response) => {
        localStorage.setItem(d, JSON.stringify(response.data))
      })
  })
}

export default fetchDictionaryData
