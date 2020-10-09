import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

enum colors {
  primary = '#3f51b5',
  headline = '#bbb',
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      color: 'white',
      fontSize: 44,
      fontWeight: 700,
      background: colors.primary,
      padding: 15,
    },
    subtitle: {
      fontSize: 28,
      fontWeight: 500,
    },
    paragraph: {
      fontSize: 16,
      paddingTop: 20,
      paddingBottom: 20,
      fontWeight: 500,
    },
    main: {
      paddingTop: 80,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
    table: {
      margin: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
    },
    eventTable: {
      padding: 0,
      marginTop: 10,
      marginBottom: 20,
    },
    eventDate: {
      paddingLeft: 10,
    },
    eventSender: {
      paddingTop: 5,
      paddingLeft: 10,
    },
    eventMessage: {
      paddingLeft: 20,
      fontSize: 16,
    },
    eventContext: {
      fontFamily: 'monospace',
      fontSize: 14,
    },
    params: {
      display: 'inline',
      fontSize: 14,
      paddingRight: 20,
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
    actionButton: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
    actionHeading: {
      paddingBottom: theme.spacing(),
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
    actionOptions: {
      marginTop: theme.spacing(),
    },
    manifestTextField: { width: '100%' },
    validationSuccess: {},
    validationError: { color: 'red' },
    modalWrapper: { background: 'white', margin: 50, padding: 30 },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);
