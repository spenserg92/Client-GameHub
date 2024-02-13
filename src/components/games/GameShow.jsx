import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneGame, removeGame, updateGame } from '../../api/game'
import { Container, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditGameModal from './EditGameModal'

const GameShow = (props) => {
    const { gameId } = useParams()
    const { user, msgAlert } = props

    const [game, setGame] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)

    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getOneGame(gameId)
            .then(res => setGame(res.data.game))
            .catch(err => {
                msgAlert({
                    heading: "Uh oh",
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])

    const deleteGame = () => {
        // we want to remove the pet
        removeGame(user, game._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteGameSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/games'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }
    if (!game) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>
                        {game.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Release Year: {game.releaseYear}</small><br />
                            <small>Developer: {game.developer}</small><br />
                            <small>Price: {game.price}</small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button
                            className='m-2'
                            variant='info'
                            onClick={() => setToyModalShow(true)}
                        >
                            Give {pet.name} a toy!
                        </Button> */}
                        {
                            game.owner && user && game.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Game
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => deleteGame()}
                                >
                                    Remove Game
                                </Button>
                            </>
                            :
                            null
                        }
                        <br/>
                        {
                            game.owner ? `owner: ${game.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditGameModal 
                user={user}
                show={editModalShow}
                updateGame={updateGame}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                game={game}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )

}


export default GameShow