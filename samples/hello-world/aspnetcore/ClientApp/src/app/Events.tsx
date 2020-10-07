import React, { useContext } from "react";

import { observer } from "mobx-react-lite";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExtensionIcon from "@material-ui/icons/Extension";
import DesktopMacIcon from "@material-ui/icons/DesktopMac";
import { EventStoreContext } from "../stores/EventStore";
import moment from "moment";
import { useStyles } from "../styles/styles";

const Events: React.FC = observer(() => {
  const eventStore = useContext(EventStoreContext);
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        SDK events
      </Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="Events">
          <TableHead>
            <TableRow>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="left">Message</TableCell>
              <TableCell align="left">Context</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventStore.events.map((event, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell align="left">
                    <Chip
                      icon={
                        event.sender === "addon" ? (
                          <ExtensionIcon />
                        ) : (
                          <DesktopMacIcon />
                        )
                      }
                      label={event.type}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment(event.timestamp).format("lll")}
                  </TableCell>
                  <TableCell align="left">{event.message}</TableCell>
                  <TableCell align="left">{event.context}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
});

export default Events;
