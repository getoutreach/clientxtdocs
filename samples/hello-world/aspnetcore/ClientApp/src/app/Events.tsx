import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { EventStoreContext } from '../stores/EventStore';
import { createStyles, Theme, Typography } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            padding: theme.spacing(2),
            paddingTop: theme.spacing(3),
            paddingBottom: 0,
        },

        table: {
            margin: theme.spacing(2), 
            marginTop: theme.spacing(1), 
        },
    })
);

const Events: React.FC = observer(() =>   {

  const eventStore = useContext(EventStoreContext);
  const classes = useStyles();

  return (<>
        <Typography variant="h5" className={classes.heading}>
            SDK events
        </Typography>
        <TableContainer component={Paper}  className={classes.table}>
            <Table aria-label="Events">
            <TableHead>
                <TableRow>
                <TableCell align="right" width={150}>Timestamp</TableCell>
                <TableCell align="right" width={100}>Type</TableCell>
                <TableCell align="right" width={100}>Sender</TableCell>
                <TableCell align="left">Message</TableCell>
                <TableCell align="left">Context</TableCell>
                </TableRow>
            </TableHead>          
            <TableBody>
                { eventStore.events.map((event, idx) =>  {
                    return <TableRow key={idx}>
                        <TableCell component="th" scope="row">
                            { moment(event.timestamp).format('lll')}
                        </TableCell>
                        <TableCell align="right">{event.type}</TableCell>
                        <TableCell align="right">{event.sender}</TableCell>
                        <TableCell align="left">{event.message}</TableCell>
                        <TableCell align="left">{event.context}</TableCell>
                    </TableRow>
                }
                )}
            </TableBody>
            </Table>
        </TableContainer>
      </>);
});

export default Events;
