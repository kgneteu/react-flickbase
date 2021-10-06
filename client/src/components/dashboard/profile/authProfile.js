import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, Container, Dialog, DialogContent, FormGroup, Modal, TextField} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import EmailStepper from "./stepper/emailStepper";

const AuthProfile = () => {
    const [emailModal, setEmailModal] = useState(false);
    const users = useSelector(state => state.user);
    const notifications = useSelector(state => state.notifications);

    const closeModal = () => setEmailModal(false);
    const openModal = () => setEmailModal(true);

    useEffect(() => {
        if (notifications && notifications.success) {
            closeModal()
        }
    }, [notifications])

    return (
        <Box mb={3}>
            <Container maxWidth={'xs'} style={{marginLeft: 0}}>
                <FormGroup row>
                    <TextField value={users.data.email} disabled style={{flexGrow: 1}}/>
                    <EditIcon color="primary" onClick={openModal}/>
                </FormGroup>
                <FormGroup row>
                    <TextField value="**********" disabled style={{flexGrow: 1}}/>
                    <EditIcon color="primary" onClick={openModal}/>
                </FormGroup>

                <Dialog open={emailModal} onClose={closeModal}>
                    <DialogContent>
                        <EmailStepper user={users}/>
                    </DialogContent>
                </Dialog>

            </Container>

        </Box>
    )
}

export default AuthProfile;
