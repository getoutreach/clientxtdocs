import {
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { EditorStoreContext } from '../../../stores/EditorStore';
import BasicInfo from './BasicInfo';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    basic: {
      flexGrow: 1,
    },
    icon: {
      height: theme.spacing(6),
      width: theme.spacing(6),
    },
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    select: {},
    textField: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

const AuthorInfo: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  return (
    <div className={classes.basic}>
      <Typography variant="h6">Author info</Typography>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="text"
          label="Developer/Company Name"
          placeholder="ex: Contoso Ltd"
          variant="outlined"
          value={editorStore.selectedManifest?.author.company || ''}
          onChange={(e) => editorStore.setAuthorCompany(e.target.value)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Website"
          variant="outlined"
          placeholder="ex: https://www.contoso.com"
          style={{
            marginLeft: 16,
          }}
          value={editorStore.selectedManifest?.author.websiteUrl || ''}
          onChange={(e) => editorStore.setAuthorWebsite(e.target.value)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Privacy statement"
          placeholder="ex: https://www.contoso.com/privacy"
          variant="outlined"
          value={editorStore.selectedManifest?.author.privacyUrl || ''}
          onChange={(e) => editorStore.setAuthorPrivacyUrl(e.target.value)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Terms of use"
          variant="outlined"
          placeholder="ex: https://www.contoso.com/tos"
          style={{
            marginLeft: 16,
          }}
          value={editorStore.selectedManifest?.author.termsOfUseUrl || ''}
          onChange={(e) => editorStore.setAuthorTermsOfUseUrl(e.target.value)}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
      </div>
    </div>
  );
});

const GeneralInfo: React.FC = observer(() => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BasicInfo />
      <AuthorInfo />
    </div>
  );
});

export default GeneralInfo;
