
import axios from 'axios'

const fetchDictionaryData = () => {
  axios.get('http://localhost:3001/api/data/')
    .then((response) => {
      console.log(response.data)
      response.data.map((d) => {
        axios.get(`http://localhost:3001/api/data/${d.id}`)
          .then((response) => {
            console.log(response.data)
          })
      })
    })
}

export default fetchDictionaryData