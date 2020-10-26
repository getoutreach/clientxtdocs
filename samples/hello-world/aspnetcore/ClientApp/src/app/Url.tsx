import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Parameter from "./components/Paramater";
import { EventStoreContext } from '../stores/EventStore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButton: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    actionHeading: {
      paddingBottom: theme.spacing(),
    },
    actionOptions: {
      marginTop: theme.spacing(),
    },
    actionRoot: {
      alignSelf: 'flex-start',
      borderColor: theme.palette.divider,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.spacing(),
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(2),
      padding: theme.spacing(),
    },
    paragraph: {
      fontSize: 16,
      paddingTop: 10,
      paddingBottom: 15,
      fontWeight: 500,
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

export interface QueryParam {
  key: string;
  value: string;
}

const Url: React.FC = observer(() => {
  const classes = useStyles();
  const eventStore = useContext(EventStoreContext);

  let queryParams: QueryParam[] = [];
  const urlSearchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlSearchParams) {
    queryParams.push({ key, value });
  }

  const params: { name: string, params: QueryParam[] }[] = [{ name: "URL", params: queryParams }];
  if (eventStore.configuration && eventStore.configuration.length > 0) {
    params.push({ name: "Configuration", params: eventStore.configuration });
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        Iframe source values
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        {window.location.href}
      </Typography>

      {params.map(paramGroup => paramGroup.params.length > 0 &&
        <Typography key={paramGroup.name} variant="body1" className={classes.paragraph}>
          <Typography variant="caption" className={classes.paragraph}>
            {paramGroup.name}
          </Typography>
          <br />
          {paramGroup.params.length > 0 && paramGroup.params.map((param) => (
            <Parameter key={param.key} parameter={param} />
          ))}
        </Typography>
      )}
    </Container>
  );
});

export default Url;
