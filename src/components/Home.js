import PlatformsIndex from "./Platforms/PlatformsIndex"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<PlatformsIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
