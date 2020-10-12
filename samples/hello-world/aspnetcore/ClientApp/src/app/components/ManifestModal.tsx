import React from 'react';
import ManifestValidator from './ManifestValidator';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalWrapper: { background: 'white', margin: theme.spacing(6), padding: theme.spacing(4) },
  })
);

const ManifestModal = (props: { open: boolean; onHandleClose: any }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.onHandleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Container className={classes.modalWrapper}>
          <Grid container direction="row" justify="flex-end" alignItems="flex-start">
            <CloseIcon onClick={props.onHandleClose} />
          </Grid>
          <ManifestValidator />
        </Container>
      </Fade>
    </Modal>
  );
};

export default ManifestModal;
