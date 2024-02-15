import React, { useState } from "react";
import { Modal } from 'react-bootstrap'
import messages from "../shared/AutoDismissAlert/messages";
import GameForm from "../shared/GameForm";
import { createGame } from "../../api/game";

const NewGameModal = (props) => {

    const { platform, show, handleClose, msgAlert, triggerRefresh } = props
    const [game, setGame] = useState({})

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
        createGame(platform, game)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createGameSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .then(() => setGame({}))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <GameForm 
                    game={game}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${platform.name} a game!`}
                />
            </Modal.Body>
        </Modal>
    )


}

export default NewGameModal