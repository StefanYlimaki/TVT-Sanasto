import axios from 'axios'

const fetchDictionaryData = () => {
  localStorage.clear()
  console.log(localStorage.length)
  const dictionaries = ['basic-comp', 'internet-basic']

  dictionaries.map((d) => {
    console.log(d)
    axios
      .get(`https://tvt-sanasto-api.vercel.app/api/data/${d}`)
      .then((response) => {
        console.log('storing to localstorage, name:', d)
        localStorage.setItem(d, JSON.stringify(response.data))
      })
  })
}

export default fetchDictionaryData
