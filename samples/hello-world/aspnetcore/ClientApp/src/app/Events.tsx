import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { EventStoreContext } from '../stores/EventStore';
import { useStyles } from '../styles/styles';
import EventSenderIcon from './components/EventSenderIcons';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';

const Events: React.FC = observer(() => {
  const classes = useStyles();

  const eventStore = useContext(EventStoreContext);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const [page, setPage] = React.useState(1);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    eventStore.setFilter({
      internalLogMessages: event.target.checked
    })
  };

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const eventsPerPage = 5;
  const pagesCount = Math.round(eventStore.filteredEvents.length / eventsPerPage +.44);

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
            .slice(eventsPerPage * (page - 1), eventsPerPage * (page - 1) + eventsPerPage)
            .map((event, idx) => {
              const id = `row-${idx}`;
              return (
                <Accordion expanded={expanded === id} onChange={handleChange(id)} key={id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${id}-content`} id={`${id}-header`}>
                    <Box>
                      <Typography variant="caption">
                        <Chip icon={<EventSenderIcon origin={event.origin} type={event.type} />} />
                      </Typography>
                      <Typography variant="caption" className={classes.eventDate}>
                        {moment(event.timestamp).format('HH:mm:ss (MMM Do, YYYY)')}
                      </Typography>
                      <Typography variant="caption" className={classes.eventMessage}>
                        {event.message}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className={classes.eventDetails}>
                      { event.context.map((ctx, idx) => 
                         <Typography key={`ctx-${idx}`} className={classes.eventContext}>
                           {ctx}
                        </Typography>
                      )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Container>
      )}
      {pagesCount > 1 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination count={pagesCount} shape="rounded" page={page} onChange={handlePagination} />
          {eventStore.filteredEvents.length} events
        </Grid>
      )}
    </Container>
  );
});

export default Events;
