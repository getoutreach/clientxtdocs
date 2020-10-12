import React from "react";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from '@material-ui/core';

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
    key: {
      display: 'inline',
      fontSize: 14,
      paddingRight: 5,
      fontWeight: 300,
    },
    value: {
      display: 'inline',
      fontFamily: 'monospace',
      fontSize: 16,
      paddingRight: 0,
      fontWeight: 700,
    },
    params: {
      display: 'inline',
      fontSize: 14,
      paddingRight: 20,
    },    
    paragraph: {
      fontSize: 16,
      paddingTop: 20,
      paddingBottom: 20,
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

interface QueryParam {
  key: string;
  value: string;
}

const Url: React.FC = observer(() => {
  const classes = useStyles();

  let queryParams: QueryParam[] = [];
  const urlSearchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlSearchParams) {
    queryParams.push({ key, value });
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h2" color="primary" className={classes.subtitle}>
        Iframe source url
      </Typography>

      <Typography variant="body1" className={classes.paragraph}>
        {window.location.href}
        <br />
        {queryParams.length > 0 && (
          <>
            {queryParams.map((param, index) => (
              <Typography
                variant="caption"
                className={classes.params}
                key={index}
              >
                <span className={classes.key}>{param["key"]}</span>
                <span className={classes.value}>{param["value"]}</span>
              </Typography>
            ))}
          </>
        )}
      </Typography>
    </Container>
  );
});

export default Url;
