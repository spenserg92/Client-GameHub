import { useState } from "react";
import messages from "../shared/AutoDismissAlert/messages";
import PlatformForm from "../shared/PlatformForm";
import { useNavigate } from 'react-router-dom'
import { createPlatform } from "../../api/platform";

const CreatePlatform = (props) => {

    const { user, msgAlert } = props
    const navigate = useNavigate()
    const [platform, setPlatform] = useState({
        name: "",
        releaseYear: '',
        manufacturer: '',
        price: '',

    })

    const onChange = (e) => {
        e.persist()

        setPlatform(prevPlatform => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // if (updatedName === 'adoptable' && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === 'adoptable' && !e.target.checked) {
            //     updatedValue = false
            // }

            const updatedPlatform = { [updatedName] : updatedValue }

            return {
                ...prevPlatform, ...updatedPlatform
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createPlatform(user, platform)
            .then(res => { navigate(`/platforms/${res.data.platform._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createPlatformSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        
        <PlatformForm
            platform={platform}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new platform!"
        
        >
        </PlatformForm>
    )


}

export default CreatePlatform