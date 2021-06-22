import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { EditorStoreContext } from "../../stores/EditorStore";
import ApiInfo from "./ApiInfo";
import ConfigInfo from "./config/ConfigInfo";
import EditorStepper from "./EditorStepper";
import ExtensionsInfo from "./ExtensionContainer";
import GeneralInfo from "./general/GeneralInfo";
import ManifestInfo from "./ManifestInfo";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bold: {
      fontWeight: 600,
    },

    details: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      margin: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
    root: {
      display: "flex",
      flexDirection: "row",
      height: "100%",
      margin: theme.spacing(2),
    },
    stepper: {
      borderRightColor: theme.palette.divider,
      borderRightStyle: "solid",
      borderRightWidth: 1,
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface IEditorProps {
  id: string;
}

const Editor: React.FC<RouteComponentProps<IEditorProps>> = observer(
  (props: RouteComponentProps<IEditorProps>) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState<number>(0);
    const editorStore = useContext(EditorStoreContext);

    useEffect(() => {
      const manifestId = props.match.params.id;
      if (editorStore.selectedManifest?.identifier !== manifestId) {
        editorStore.setSelectedManifestId(manifestId);
      }
    }, [editorStore, props.match.params.id]);

    return (
      <div className={classes.root}>
        <div className={classes.stepper}>
          <EditorStepper onStepChanged={(step) => setActiveStep(step)} />
        </div>
        <div className={classes.details}>
          {activeStep === 0 && <GeneralInfo />}
          {activeStep === 1 && <ApiInfo />}
          {activeStep === 2 && <ConfigInfo />}
          {activeStep === 3 && <ExtensionsInfo />}
          {activeStep === 4 && (
            <>
              <Typography variant="subtitle1" style={{ marginBottom: 8 }}>
                App manifest
              </Typography>
              <ManifestInfo manifest={editorStore.selectedManifest!} />
            </>
          )}
        </div>
      </div>
    );
  }
);

export default Editor;
