import { useState } from "react";
import messages from "../shared/AutoDismissAlert/messages";
import GameForm from "../shared/GameForm";
import { useNavigate } from 'react-router-dom'
import { createGame } from "../../api/game";

const CreateGame = (props) => {

    const { user, msgAlert } = props
    const navigate = useNavigate()
    const [game, setGame] = useState({
        name: '',
        releaseYear: '',
        developer: '',
        price: '',

    })

    const onChange = (e) => {
        e.persist()

        setGame(prevGame => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }


            const updatedGame = { [updatedName] : updatedValue }

            return {
                ...prevGame, ...updatedGame
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createGame(user, game)
            .then(res => { navigate(`/games/${res.data.game._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createGameSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        
        <GameForm
            game={game}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new game!"
        
        >
        </GameForm>
    )


}

export default CreateGame