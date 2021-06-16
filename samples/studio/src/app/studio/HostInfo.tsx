import React, { useContext } from "react";

import {
  Checkbox,
  createStyles,
  FormControlLabel,
  Link,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react-lite";

import { EditorStoreContext } from "../../stores/EditorStore";
import { AddonType } from "@outreach/client-addon-sdk";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
    },
    formControlLabel: {
      width: 350,
    },
    input: {
      "&:invalid": {
        borderLeft: "red solid 4px",
      },
    },
    root: {
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flexDirection: "row",
    },
    textField: {
      marginTop: theme.spacing(),
      marginBottom: theme.spacing(),
    },
  })
);

const HostInfo: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const appExtension =
    editorStore.selectedManifest!.host.type === AddonType.LeftSideMenu;

  return (
    <div className={classes.root}>
      <Typography variant="h6">Host configuration</Typography>
      <Typography variant="caption" style={{ marginBottom: 8 }}>
        Describe the type of extension and where it will be hosted. To learn
        more click
        <Link
          href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/manifest.md#host"
          target="_blank"
        >
          here
        </Link>
      </Typography>

      <TextField
        className={classes.textField}
        fullWidth={true}
        required={true}
        select={true}
        label="Addon type"
        variant="outlined"
        value={editorStore.selectedManifest?.host.type}
        onChange={(e) => {
          const manifest = {
            ...editorStore.selectedManifest!,
            host: {
              ...editorStore.selectedManifest!.host,
              type: e.target.value as AddonType,
            },
          };
          editorStore.addOrUpdateManifest(manifest);
        }}
      >
        <MenuItem key={`type-app-extension`} value={AddonType.LeftSideMenu}>
          Application extension
        </MenuItem>
        <MenuItem key={`type-pro-extension`} value={AddonType.ProspectTab}>
          Prospect tab extension
        </MenuItem>
        <MenuItem key={`type-acc-extension`} value={AddonType.AccountTab}>
          Account tab extension
        </MenuItem>
        <MenuItem key={`type-opp-extension`} value={AddonType.OpportunityTab}>
          Opportunity tab extension
        </MenuItem>
      </TextField>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="url"
          label="Hosting url"
          title="A publicly accessible web address where addon web page is hosted"
          placeholder="ex. https://www.addon-host.com/addon"
          variant="outlined"
          value={editorStore.selectedManifest?.host.url}
          onChange={(e) => {
            const manifest = {
              ...editorStore.selectedManifest!,
              host: {
                ...editorStore.selectedManifest!.host,
                url: e.target.value,
              },
            };
            editorStore.addOrUpdateManifest(manifest);
          }}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>

        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="text"
          label="Icon url or data uri"
          title="Url of the application tile icon file or a data URI value of the icon file"
          placeholder="ex. https://www.addon-host.com/icon.png"
          variant="outlined"
          value={editorStore.selectedManifest?.host.icon}
          onChange={(e) => {
            const manifest = {
              ...editorStore.selectedManifest!,
              host: {
                ...editorStore.selectedManifest!.host,
                icon: e.target.value,
              },
            };
            editorStore.addOrUpdateManifest(manifest);
          }}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>
      </div>
      <Typography
        variant="h6"
        style={{
          marginTop: 8,
        }}
      >
        Environment requirements
      </Typography>
      {!appExtension && (
        <FormControlLabel
          className={classes.formControlLabel}
          control={
            <Checkbox
              checked={
                editorStore.selectedManifest?.host.environment?.fullWidth ||
                false
              }
              onChange={(e) => {
                const manifest = {
                  ...editorStore.selectedManifest!,
                  host: {
                    ...editorStore.selectedManifest!.host,
                    environment: {
                      ...(editorStore.selectedManifest!.host.environment || {
                        fullWidth: false,
                        decoration: "none",
                      }),
                      fullWidth: e.target.checked,
                    },
                  },
                };
                editorStore.addOrUpdateManifest(manifest);
              }}
            />
          }
          label={`Request full width (hide Outreach sidebar)`}
        />
      )}

      {appExtension && (
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          select={true}
          label="Badge decoration type"
          variant="outlined"
          value={
            editorStore.selectedManifest?.host.environment?.decoration || "none"
          }
          onChange={(e) => {
            const manifest = {
              ...editorStore.selectedManifest!,
              host: {
                ...editorStore.selectedManifest!.host,
                environment: {
                  ...(editorStore.selectedManifest!.host.environment || {
                    fullWidth: false,
                    decoration: "none",
                  }),
                  decoration: e.target.value as any,
                },
              },
            };
            editorStore.addOrUpdateManifest(manifest);
          }}
        >
          <MenuItem key="none" value="none">
            None
          </MenuItem>
          <MenuItem key="simple" value="simple">
            Simple
          </MenuItem>
          <MenuItem key="full" value="full">
            Full
          </MenuItem>
        </TextField>
      )}
    </div>
  );
});

export default HostInfo;
