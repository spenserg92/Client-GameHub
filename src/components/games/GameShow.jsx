import { useState } from 'react'
import { removeGame } from '../../api/game'
import { Button, Card } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'
import EditGameModal from './EditGameModal'

const GameShow = (props) => {
    const { game, user, platform, triggerRefresh, msgAlert } = props
    const [editModalShow, setEditModalShow] = useState(false)
    const deleteGame = () => {
        removeGame(user, platform._id, game._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteGameSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card 
                border="white" 
                bg='dark'
                style={{color: 'white'}}
            >
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
                    <>
                        <Button
                            className='m-2 btn btn-outline-primary'
                            variant='dark'
                            onClick={() => setEditModalShow(true)}
                        >
                            Edit Game
                        </Button>
                        <Button
                            className='m-2 btn btn-outline-danger'
                            variant='dark'
                            onClick={() => deleteGame()}
                        >
                            Remove Game
                        </Button>
                    </>

                    <br />
                    {
                        game.owner ? `owner: ${game.owner.email}` : null
                    }
                </Card.Footer>
            </Card>

            <EditGameModal
                user={user}
                platform={platform}
                game={game}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )

}


export default GameShow