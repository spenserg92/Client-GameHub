import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePlatform, updatePlatform, removePlatform } from '../../api/platform'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import EditPlatformModal from './EditPlatformModal'



const PlatformShow = (props) => {
    const { platformId } = useParams()
    const { user, msgAlert } = props

    const [platform, setPlatform] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)

    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()

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

    const deletePlatform = () => {
        // we want to remove the pet
        removePlatform(user, platform._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deletePlatformSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page(Home)(/)
            .then(() => navigate('/'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    if (!platform) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>
                        {platform.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Release Year: {platform.releaseYear}</small><br />
                            <small>Manufacturer: {platform.manufacturer}</small><br />
                            <small>MSRP: {platform.price}</small>
                        </Card.Text>
                        <Card.Text>
                            <small>Games: {platform.games}</small>
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
                            platform.owner && user && platform.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className='m-2'
                                    variant='warning'
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit platform
                                </Button>
                                <Button
                                    className='m-2'
                                    variant='danger'
                                    onClick={() => deletePlatform()}
                                >
                                    Set Pet Free
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
            <EditPlatformModal 
                user={user}
                show={editModalShow}
                updatePet={updatePlatform}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                platform={platform}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )

}

export default PlatformShow