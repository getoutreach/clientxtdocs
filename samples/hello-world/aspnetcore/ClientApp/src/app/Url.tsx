import React from 'react';

import { observer } from 'mobx-react-lite'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
        },
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
                Query parameters
            </Typography>
            <Typography variant="subtitle2" className={classes.subtitle}>
                {window.location.href}
            </Typography>

            <TableContainer component={Paper} className={classes.table} >
                <Table aria-label="Url parameters">
                <TableHead>
                    <TableRow>
                    <TableCell align="left" width={100}>Param</TableCell>
                    <TableCell align="left">Value</TableCell>
                    </TableRow>
                </TableHead>          
                <TableBody>
                    { queryParams.map((p, idx) => 
                        <TableRow key={idx}>
                            <TableCell align="left">{p.key}</TableCell>
                            <TableCell align="left">{p.value}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
        </>
    );
});

export default Url;