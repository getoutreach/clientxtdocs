import React from "react";

import { observer } from "mobx-react-lite";
import Actions from "./Actions";
import Events from "./Events";
import Heading from "./Heading";
import Url from "./Url";
import Container from "@material-ui/core/Container";
import AppHeader from "./AppHeader";
import { useStyles } from "../styles/styles";

const App: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg" className={classes.main}>
        <Heading />
        <Url />
        <Events />
        <Actions />
      </Container>
    </>
  );
});

export default App;
