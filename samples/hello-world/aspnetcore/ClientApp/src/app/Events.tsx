import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { EventStoreContext } from '../stores/EventStore';
import EventSenderIcon from './components/EventSenderIcons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core';


export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    eventBlock: {
      overflow: 'scroll',
    },
    eventContext: {
      fontFamily: 'monospace',
      fontSize: 14,
      marginBottom: theme.spacing(1),
    },
    eventDate: {
      marginLeft: theme.spacing(),
      marginRight: theme.spacing(),
    },
    eventDetails: {
      overflow: 'scroll',
    },
    eventMessage: {
      fontSize: 16,
      padding: theme.spacing(),
    },
    eventSender: {
      padding: theme.spacing(),
    },
    eventTable: {
      padding: 0,
      marginTop: 10,
      marginBottom: 20,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    subtitle: {
      fontSize: 28,
      fontWeight: 500,
    },
  })
);

const Events: React.FC = observer(() => {
  const classes = useStyles();

  const eventStore = useContext(EventStoreContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    eventStore.setFilter({
      internalLogMessages: event.target.checked
    })
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          SDK events
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={eventStore.filter.internalLogMessages}
                  onChange={handleFilter}
                  name="debugMessages"
                />
              }
              label="Show debug messages"
            />
          </FormGroup>
        </Grid>
      </Typography>

      {eventStore.filteredEvents.length > 0 && (
        <Container className={classes.eventTable}>
          {eventStore.filteredEvents
            .map((event, idx) => {
              const id = `row-${idx}`;
              return (
                <Accordion expanded={expanded === id} onChange={handleChange(id)} key={id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${id}-content`} id={`${id}-header`}>
                    <Box className={classes.box}>
                      <Typography variant="caption">
                        <EventSenderIcon origin={event.origin} type={event.type} />
                      </Typography>
                      <Typography variant="caption" className={classes.eventDate}>
                        {moment(event.timestamp).format('HH:mm:ss (MMM Do, YYYY)')}
                      </Typography>
                      <Typography variant="caption" className={classes.eventMessage}>
                        {event.message}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography className={classes.eventContext}>{event.context}</Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Container>
      )}
    </Container>
  );
});

export default Events;
