import apiUrl from '../apiConfig'
import axios from 'axios'


// CREATE -> games/:platformID
export const createGame = (platform, newGame) => {
    return axios({
        url: `${apiUrl}/games/${platform._id}`,
        method: 'POST',
        data: { game: newGame }
    })
}

// UPDATE -> Adjust a game
export const updateGame = (user, platform, updatedGame) => {
    return axios({
        url: `${apiUrl}/games/${platform._id}/${updatedGame._id}`,
        method: 'PATCH',
        data: { game: updatedGame }
    })
}

// DELETE -> Delete game
export const removeGame = (user, platformId, gameId) => {
    return axios({
        url: `${apiUrl}/games/${platformId}/${gameId}`,
        method: 'DELETE',
    })
}