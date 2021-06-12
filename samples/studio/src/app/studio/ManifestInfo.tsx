import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import React from "react";
import ReactJson from "react-json-view";
import GetAppIcon from "@material-ui/icons/GetApp";
import { downloadFile } from "../utils";
import { Manifest } from "@outreach/client-addon-sdk";
import { validate } from "@outreach/client-addon-sdk/";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import StorefrontIcon from "@material-ui/icons/Storefront";
import BugReportIcon from "@material-ui/icons/BugReport";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      alignSelf: "flex-start",
      marginLeft: theme.spacing(0),
      marginTop: theme.spacing(-2),
      margin: theme.spacing(2),
    },
    cta: {
      display: "flex",
      flexDirection: "row",
    },
    heading: {
      fontWeight: 600,
      marginBottom: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      justifyItems: "center",
    },
    root: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(2),
      height: "100%",
    },
  })
);

interface IManifestInfoProps {
  manifest: Manifest;
}

const ManifestInfo: React.FC<IManifestInfoProps> = (
  props: IManifestInfoProps
) => {
  const classes = useStyles();

  const issues = validate(props.manifest);

  return (
    <div className={classes.root}>
      <div
        className={classes.cta}
        title={
          issues.length > 0
            ? "Please resolve all of the validation issues before downloading the manifest"
            : ""
        }
      >
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<GetAppIcon />}
          disabled={issues.length > 0}
          onClick={() =>
            downloadFile(
              `manifest-${props.manifest.identifier}`,
              JSON.stringify(props.manifest, null, 2)
            )
          }
        >
          Download manifest file
        </Button>
        <div title="Install extension for yourself and test it">
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<BugReportIcon />}
            disabled={true}
          >
            Test extension
          </Button>
        </div>

        <div title="Publish extension to Outreach extension store">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<StorefrontIcon />}
            disabled={true}
          >
            Publish to store
          </Button>
        </div>
      </div>
      {issues.length === 0 && (
        <Typography variant="overline" className={classes.heading}>
          No validation issues
          <CheckCircleIcon color="secondary" style={{ marginLeft: 4 }} />
        </Typography>
      )}
      {issues.length > 0 && (
        <div>
          <Typography variant="subtitle1" className={classes.heading}>
            Validation issues
            <ErrorIcon color="error" style={{ marginLeft: 4 }} />
          </Typography>
          <ul>
            {issues.map((i) => (
              <li>
                <Typography variant="body1">{i}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ReactJson src={props.manifest} />
    </div>
  );
};

export default ManifestInfo;
