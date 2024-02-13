import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllGames = () => {
    return axios(`${apiUrl}/games`)
}

// READ -> Show
export const getOneGame = (id) => {
    return axios(`${apiUrl}/games/${id}`)
}

// // CREATE -> Platform
// export const createPlatform = (user, newPlatform) => {
//     return axios({
//         url: `${apiUrl}/platforms`,
//         method: 'POST',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { platform: newPlatform }
//     })
// }

// // UPDATE -> Adjust a platform
// export const updatePlatform = (user, updatedPlatform) => {
//     return axios({
//         url: `${apiUrl}/platforms/${updatedPlatform._id}`,
//         method: 'PATCH',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { platform: updatedPlatform }
//     })
// }

// // DELETE -> Delete platform
// export const removePlatform = (user, id) => {
//     return axios({
//         url: `${apiUrl}/platforms/${id}`,
//         method: 'DELETE',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         }
//     })
// }