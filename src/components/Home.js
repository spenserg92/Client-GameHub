import PlatformsIndex from "./platforms/PlatformsIndex"

const Home = (props) => {
	const { msgAlert } = props
	// console.log('props in home', props)

	return (
		<>
			<h2>PlatForms</h2>
			<PlatformsIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
