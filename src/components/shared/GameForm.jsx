import { Form, Button, Container } from 'react-bootstrap'

const GameForm = (props) => {
    const { game, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is the game?"
                        id="name"
                        name="name"
                        value={ game.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Developer: </Form.Label>
                    <Form.Control 
                        placeholder="Who is the developer?"
                        id="developer"
                        name="developer"
                        value={ game.developer }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Release Year: </Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Year of Release?"
                        id="releaseYear"
                        name="releaseYear"
                        value={ game.releaseYear }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                <Form.Label>price: </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="What is the price of this game?"
                        id="price"
                        name="price"
                        value={ game.price }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default GameForm 