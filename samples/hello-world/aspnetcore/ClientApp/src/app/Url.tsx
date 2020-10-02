import React from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            padding: theme.spacing(2),
            paddingTop: theme.spacing(3),
            paddingBottom: 0,
        },
        subtitle: {
            paddingLeft: theme.spacing(2),
        },
        table: {
            margin: theme.spacing(2), 
            marginTop: theme.spacing(1), 
            width: 200
        },
        container: {
            display: 'flex',
            flexDirection: 'row'
        }
    })
);

interface QueryParam {
    key: string;
    value: string;
}

const Url: React.FC = observer(() =>   {

  const classes = useStyles();

  var queryParams: QueryParam[] = [];
  const urlSearchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlSearchParams) {
    queryParams.push({ key, value } );
  }

  return (<>
            <Typography variant="h5" className={classes.heading}>
                Iframe source url
            </Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
                {window.location.href}
            </Typography>
    </>);
});

export default Url;