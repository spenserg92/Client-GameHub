import {useState, useEffect} from 'react'
import { getAllPlatforms } from "../../api/platform"
// used for rendering things
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'


const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    opacity: 0.6,

}

const PlatformsIndex = (props) => {
    const [platforms, setPlatforms] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    useEffect(() => {
        getAllPlatforms()
        .then(res => {
            console.log('useEffect hook ran')
            setPlatforms(res.data.platforms)
        })
        .catch(error => {
            msgAlert({
                heading: 'Oh no!',
                message: messages.generalError,
                variant: 'danger'
            })
            setError(true)
        })
    }, [])

    if (error) {
        return <LoadingScreen />
    } 
    
    if (!platforms) {
        return <LoadingScreen />
    }else if (platforms.length === 0) {
        return <p>No Platforms yet, go add a few!</p>
    }


    const platformCards = platforms.map(platform => (
        <Card key={platform.id} style={{width: "30%", margin: 5, color: "white"  }}
        border="white" bg='dark' 
        >
            <Card.Header>
                {platform.name}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/platforms/${platform._id}`} className='btn  btn-outline-primary' >
                        View {platform.name}
                    </Link>
                </Card.Text>
                { platform.owner ?
                    <Card.Footer>owner: {platform.owner.email}</Card.Footer>
                    :
                    null
                }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" style={cardContainerLayout} >
            { platformCards }
        </div>
    )
}

export default PlatformsIndex