import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EventStoreContext } from '../stores/EventStore';
import { useStyles } from '../styles/styles';
import EventSenderIcon from './components/EventSenderIcons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

const Events: React.FC = observer(() => {
  const classes = useStyles();

  const eventStore = useContext(EventStoreContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [page, setPage] = React.useState<number>(1);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean): void => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    eventStore.setFilter({
      internalLogMessages: event.target.checked,
    });
  };

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };

  const eventsPerPage: number = 5;
  const pagesCount: number = Math.round(eventStore.filteredEvents.length / eventsPerPage + 0.44);
  const eventStartIndex: number = eventsPerPage * (page - 1);

  return (
    <div className={classes.root}>
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
          <Timeline align="alternate">
            {eventStore.filteredEvents.slice(eventStartIndex, eventStartIndex + eventsPerPage).map((event, idx) => {
              const id = `row-${idx}`;
              return (
                <TimelineItem key={`${idx}-message`}>
                  <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary" className={classes.eventDate}>
                      {moment(event.timestamp).format('HH:mm:ss (MMM Do, YYYY)')}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <EventSenderIcon origin={event.origin} type={event.type} />
                    {eventStore.filteredEvents.length > eventStartIndex + idx + 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent className={classes.eventBlock}>
                    <Accordion expanded={expanded === id} onChange={handleChange(id)} key={id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${id}-content`}
                        id={`${id}-header`}
                      >
                        <Typography variant="caption" className={classes.eventMessage}>
                          {event.message}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.eventDetails}>
                        {event.context.map((ctx, idx) => (
                          <Typography key={`ctx-${idx}`} className={classes.eventContext}>
                            {ctx}
                          </Typography>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Container>
      )}
      {pagesCount > 1 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination count={pagesCount} shape="rounded" page={page} onChange={handlePagination} />
          {eventStore.filteredEvents.length} events
        </Grid>
      )}
    </div>
  );
});

export default Events;
