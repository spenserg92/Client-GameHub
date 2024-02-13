import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOnePlatform } from '../../api/platform'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'


const PlatformShow = (props) => {
    const { platformId } = useParams()
    const { user, msgAlert } = props

    const [platform, setPlatform] = useState(null)
    console.log('this is the id param in PlatformShow', platformId)

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
    }, [])

    console.log('the platform in showPlatform', platform)
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
                </Card>
            </Container>
        </>
    )

}

export default PlatformShow