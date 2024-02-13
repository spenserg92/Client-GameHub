import { Form, Button, Container } from 'react-bootstrap'

const PlatformForm = (props) => {
    const { platform, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control 
                        placeholder="What is the platform?"
                        id="name"
                        name="name"
                        value={ platform.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Manufacturer: </Form.Label>
                    <Form.Control 
                        placeholder="What is the manufacturer?"
                        id="manufacturer"
                        name="manufacturer"
                        value={ platform.manufacturer }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Release Year: </Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How old is your pet?"
                        id="releaseYear"
                        name="releaseYear"
                        value={ platform.releaseYear }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Check 
                        type="number"
                        placeholder="What is the MSRP of this platform?"
                        id="price"
                        name="price"
                        value={ platform.price }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default PlatformForm 