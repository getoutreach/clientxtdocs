import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { EventStoreContext } from "../stores/EventStore";
import moment from "moment";
import { useStyles } from "../styles/styles";
import EventSenderIcon from "./components/EventSenderIcons";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";

const Events: React.FC = observer(() => {
  const eventStore = useContext(EventStoreContext);
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        SDK events
      </Typography>

      {eventStore.events.map((event, idx) => {
        const id = `row-${idx}`;
        return (
          <Accordion
            expanded={expanded === id}
            onChange={handleChange(id)}
            key={id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Box>
                <Typography variant="caption">
                  <Chip
                    icon={<EventSenderIcon sender={event.sender} />}
                    label={event.type}
                  />
                </Typography>
                <Typography variant="caption" className={classes.eventDate}>
                  {moment(event.timestamp).format("lll")}
                </Typography>
                <Typography variant="caption" className={classes.eventMessage}>
                  {event.message}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.eventContext}>
                {event.context}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
});

export default Events;
