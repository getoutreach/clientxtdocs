import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginBottom: theme.spacing(2),
        },
        code: {
            padding: theme.spacing(0.5),
            fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
            fontWeight: "lighter"
          },
        divider: {
            marginBottom: theme.spacing(0.5),
        },
        heading: {
            paddingBottom: theme.spacing(),
        },
        root: {
            alignSelf: "flex-start",
            borderColor: theme.palette.divider,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: theme.spacing(),
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(2),
            padding: theme.spacing()
        },
        options: {
            marginBottom: theme.spacing(),
            marginTop: theme.spacing(),
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        actionButton: {
            marginTop: theme.spacing(),
            marginBottom: theme.spacing(),
        },
        actionHeading: {
            paddingBottom: theme.spacing(),
        },
        actionOptions: {
            marginTop: theme.spacing(),
            marginBottom: theme.spacing(), // ??????
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
    })
);
