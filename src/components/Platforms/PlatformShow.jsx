import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePlatform, updatePlatform, removePlatform } from '../../api/platform'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPlatformModal from './EditPlatformModal'
import GameShow from '../games/GameShow'
import NewGameModal from '../games/NewGameModal'
import Image from 'react-bootstrap/Image'

const gameCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap',
    opacity: 0.6,
    color: 'white',
}

const PlatformShow = (props) => {
    const { platformId } = useParams()
    const { user, msgAlert } = props

    const [platform, setPlatform] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [gameModalShow, setGameModalShow] = useState(false)

    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()
    console.log('the platform in the show page', platform)
    useEffect(() => {
        getOnePlatform(platformId)
            .then(res => setPlatform(res.data.platform))
            .catch(err => {
                msgAlert({
                    heading: "Uh oh",
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])

    const closeModal = () => {
        setEditModalShow(false)
        setUpdated(prev => !prev)
    }

    const deletePlatform = () => {
        removePlatform(user, platform._id)
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deletePlatformSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/'))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    let gameCards
    if (platform) {
        if (platform.games.length > 0) {
            gameCards = platform.games.map(game => (
                <GameShow 
                    key={game.id}
                    game={game}
                    platform={platform}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        } else {
            gameCards = <p>Platform has no games currently, Go add one!</p>
        }
    }

    if (!platform) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card 
                    key={platform.id}
                    className='m-2'
                    border="white" 
                    bg='dark' 
                    style={{color: 'white', opacity: 0.6}} >
                    
                    <Card.Header>
                        {platform.name}
                    </Card.Header>
                    <Card.Body>
                    <Image src='/background.jpg' style={{width: "25%"}} />
                        <Card.Text>
                            <small>Release Year: {platform.releaseYear}</small><br />
                            <small>Manufacturer: {platform.manufacturer}</small><br />
                            <small>MSRP: {platform.price}</small>
                        </Card.Text>
                        
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            className='m-2 btn btn-outline-light'
                            variant='dark'
                            onClick={() => setGameModalShow(true)}
                            
                        >
                            Give {platform.name} a game!
                        </Button>
                        {
                            platform.owner && user && platform.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2 btn btn-outline-primary'
                                    variant='dark'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Platform
                                </Button>
                                <Button
                                    className='m-2 btn btn-outline-danger'
                                    variant='dark'
                                    onClick={() => deletePlatform()}
                                >
                                    Delete Platform
                                </Button>
                            </>
                            :
                            null
                        }
                        <br/>
                        {
                            platform.owner ? `owner: ${platform.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container 
                style={gameCardContainerLayout}
                bg='dark'
            >
                {gameCards}
            </Container>
            <EditPlatformModal 
                user={user}
                show={editModalShow}
                platform={platform}
                updatePlatform={updatePlatform}
                msgAlert={msgAlert}
                handleClose={closeModal}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
            <NewGameModal 
                platform={platform}
                show={gameModalShow}
                msgAlert={msgAlert}
                handleClose={() => setGameModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )

}

export default PlatformShow