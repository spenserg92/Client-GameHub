import { useState, useEffect } from 'react'
import { getAllGames } from "../../api/game"
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'




const GamesIndex = (props) => {
    const [games, setGames] = useState(null)
    const [error, setError] = useState(false)
    const { msgAlert } = props
    useEffect(() => {
        getAllGames()
            .then(res => {
                console.log('useEffect hook ran')
                setGames(res.data.games)
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
    
    if (!games) {
        return <LoadingScreen />
    }else if (games.length === 0) {
        return <p>No Games yet, go add a few!</p>
    }

    const gameCards = games.map(game => (
        <Card key={game.id} style={{width: "30%", margin: 5}} >
            <Card.Header>
                {game.name}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/games/${game._id}`} className='btn btn-info'>
                        View {game.name}
                    </Link>
                </Card.Text>
                { game.owner ?
                    <Card.Footer>owner: {game.owner.email}</Card.Footer>
                    :
                    null
                }
            </Card.Body>
        </Card>
    ))

    return (
        <div className="container-md" >
            { gameCards}
        </div>
    )
}

export default GamesIndex