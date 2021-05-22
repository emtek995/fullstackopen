import axios from 'axios'
const endpoint = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(endpoint)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${endpoint}/${id}`)
    return request.then(response => response.data)
}

const addNew = newPerson => {
    const request = axios.post(endpoint, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPerson) => {
    const request = axios.put(`${endpoint}/${id}`, newPerson)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, remove, addNew, update}