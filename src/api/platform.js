import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPlatforms = () => {
    return axios(`${apiUrl}/platforms`)
}

// READ -> Show
export const getOnePlatform = (id) => {
    return axios(`${apiUrl}/platforms/${id}`)
}

// CREATE -> Platform
export const createPlatform = (user, newPlatform) => {
    return axios({
        url: `${apiUrl}/platforms`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { platform: newPlatform }
    })
}