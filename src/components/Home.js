import PlatformsIndex from "./platforms/PlatformsIndex"

const Home = (props) => {
	const { msgAlert } = props
	// console.log('props in home', props)

	return (
		<>
			<h2 
			style={{
				color: 'white',
				display: "flex",
				justifyContent: 'center',
				margin: "2rem"
		}} 
			
			>Platforms</h2>
			<PlatformsIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
