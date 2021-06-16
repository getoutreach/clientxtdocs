import React, { useContext } from "react";

import {
  Button,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import { ConfigurationItem } from "@outreach/client-addon-sdk/store/configuration/ConfigurationItem";
import { observer } from "mobx-react-lite";
import { EditorStoreContext } from "../../stores/EditorStore";
import Configuration from "../marketplace/Configuration";

import ConfigItemInfo from "./ConfigItemInfo";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      alignSelf: "flex-start",
    },

    config: {
      display: "flex",
      flexDirection: "column",
    },
    configCard: {
      alignSelf: "center",
      backgroundColor: theme.palette.grey[100],
      borderColor: theme.palette.divider,
      borderStyle: "solid",
      borderWidth: 1,
      padding: theme.spacing(2),
      width: 350,
      marginTop: theme.spacing(8),
    },
    configEditor: {},

    configItems: {
      display: "flex",
      flexDirection: "row",
    },

    formControl: {
      margin: theme.spacing(1),
    },
    heading: {
      marginBottom: theme.spacing(2),
    },
    root: {
      display: "flex",
      flexDirection: "row",
    },
  })
);

const ConfigInfo: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);

  const handleConfigInfoItemChange = (
    item: ConfigurationItem,
    index: number
  ) => {
    editorStore.updateConfigurationItem(item, index);
  };

  const handleConfigInfoItemDelete = (index: number) => {
    editorStore.deleteConfigurationItem(index);
  };

  const renderConfigItems = () => {
    if (editorStore.selectedManifest?.configuration?.length === 0) {
      return <></>;
    }

    <div className={classes.configCard}>
      <Typography variant="overline">Config screen preview</Typography>

      <Configuration
        configuration={editorStore.selectedManifest!.configuration}
      />
    </div>;
  };

  const renderConfigEditor = () => {
    return (
      <div className={classes.configEditor}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => editorStore.createNewConfigurationItem()}
        >
          Add config item
        </Button>

        <div className={classes.configItems}>
          {editorStore.selectedManifest!.configuration?.map((cfg, idx) => (
            <ConfigItemInfo
              key={`cfg-${idx}`}
              item={cfg}
              index={idx}
              onChange={handleConfigInfoItemChange}
              onDelete={handleConfigInfoItemDelete}
            />
          ))}
        </div>
        {renderConfigItems()}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.config}>
        <div className={classes.heading}>
          <Typography variant="h6">Configuration (optional)</Typography>
          <Typography variant="body2" style={{ marginBottom: 8 }}>
            Define configuration values Outreach application will collect from
            user installing the addon with client extension. To learn more click
            <Link
              href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/configuration.md"
              target="_blank"
            >
              {" "}
              here
            </Link>
          </Typography>
        </div>
        {renderConfigEditor()}
      </div>
    </div>
  );
});

export default ConfigInfo;
