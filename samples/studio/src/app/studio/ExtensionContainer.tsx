import React, { useState } from 'react';
import {
  createStyles,
  Link,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { PredefinedExtensionType } from '../enums/PredefinedExtensionType';
import ClientExtensionInfo from './ClientExtensionInfo';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    select: {
      width: 250,
      marginBottom: theme.spacing(1.5),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

const ExtensionContainer: React.FC = observer(() => {
  const classes = useStyles();
  const [type, setType] = useState<PredefinedExtensionType>(
    PredefinedExtensionType.EXTENSION_CLIENT_APP
  );

  return (
    <div id="extensions-container" className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h5">Outreach app extension type</Typography>
        <Typography>
          Please select the type of extension which you want to include in your
          Outreach application extension. To learn more click{' '}
          <Link
            href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/manifest.md"
            target="_blank"
          >
            here
          </Link>
        </Typography>
      </div>
      <TextField
        id="extension-type"
        className={classes.select}
        select={true}
        required={true}
        variant="outlined"
        label="Extension type"
        value={type}
        onChange={(e) => setType(e.target.value as PredefinedExtensionType)}
        inputProps={{
          className: classes.input,
        }}
      >
        <MenuItem
          key="extension-client-app"
          value={PredefinedExtensionType.EXTENSION_CLIENT_APP}
        >
          Client extension
        </MenuItem>
        <MenuItem
          key="extension-tile"
          value={PredefinedExtensionType.EXTENSION_TILE}
        >
          Intelligent tile
        </MenuItem>
        <MenuItem
          key="extension-composer"
          value={PredefinedExtensionType.EXTENSION_COMPOSER}
        >
          Composer extensions
        </MenuItem>
        <MenuItem
          key="extension-email"
          value={PredefinedExtensionType.EXTENSION_EMAIL}
        >
          Email extensions
        </MenuItem>
        <MenuItem
          key="extension-oauth"
          value={PredefinedExtensionType.EXTENSION_OAUTH}
        >
          OAuth app
        </MenuItem>
        <MenuItem
          key="extension-data"
          value={PredefinedExtensionType.EXTENSION_DATA}
        >
          Data connector
        </MenuItem>
        <MenuItem
          key="extension-voice"
          value={PredefinedExtensionType.EXTENSION_VOICE}
        >
          Voice connector
        </MenuItem>
      </TextField>

      {type === PredefinedExtensionType.EXTENSION_CLIENT_APP && (
        <ClientExtensionInfo type={type} index={0} />
      )}
    </div>
  );
});

export default ExtensionContainer;
