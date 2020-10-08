import React from "react";
import { observer } from "mobx-react-lite";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/styles";

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
