
import axios from 'axios'

const fetchDictionaryData = () => {
  axios.get('https://tvt-sanasto-api.vercel.app/api/data')
    .then((response) => {
      response.data.map((d) => {
        axios.get(`https://tvt-sanasto-api.vercel.app/api/data/${d.id}`)
          .then((response) => {
            localStorage.setItem(d.id, JSON.stringify(response.data))
          })
      })
    })
}

export default fetchDictionaryData