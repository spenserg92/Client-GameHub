import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PlatformForm from '../shared/PlatformForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditPlatformModal = (props) => {
    const { user, show, handleClose, updatePlatform, msgAlert, triggerRefresh } = props
    const [platform, setPlatform] = useState(props.platform)

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
        updatePlatform(user, platform)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updatePlatformSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PlatformForm 
                    platform={platform}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Platform"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditPlatformModal