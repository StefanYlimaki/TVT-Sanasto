import axios from 'axios'

const fetchDictionaryData = () => {
  localStorage.clear()
  console.log(localStorage.length)
  axios
    .get('https://tvt-sanasto-api.vercel.app/api/data/')
    .then((response) => {
      console.log(response)
      response.data.map((d) => {
        axios
          .get(`https://tvt-sanasto-api.vercel.app/api/data/${d.id}`)
          .then((response) => {
            console.log('storing to localstorage, name:', d.id)
            localStorage.setItem(d.id, JSON.stringify(response.data))
          })
      })
    })
    .catch((error) => console.log(error))
}

export default fetchDictionaryData
