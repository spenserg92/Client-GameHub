import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPlatforms = () => {
    return axios(`${apiUrl}/platforms`)
}