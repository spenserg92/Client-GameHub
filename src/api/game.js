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

// CREATE -> Game
export const createGame = (user, newGame) => {
    return axios({
        url: `${apiUrl}/games`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: newGame }
    })
}

// UPDATE -> Adjust a game
export const updateGame = (user, updatedGame) => {
    return axios({
        url: `${apiUrl}/games/${updatedGame._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { game: updatedGame }
    })
}

// DELETE -> Delete game
export const removeGame = (user, id) => {
    return axios({
        url: `${apiUrl}/games/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}