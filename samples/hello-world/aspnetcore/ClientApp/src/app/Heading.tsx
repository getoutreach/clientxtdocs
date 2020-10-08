import React from "react";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "../styles/styles";

const Heading: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        Client extensibility demo addon
      </Typography>

      <Typography variant="body1" className={classes.paragraph}>
        This is a demo addon where you can see how the addon gets initialized,
        what events are sent and received, and try out supported actions:
        authenticate, notify and decorate.
      </Typography>
    </Container>
  );
});

export default Heading;
