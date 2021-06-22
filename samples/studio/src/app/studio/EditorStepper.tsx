import {
  Button,
  createStyles,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { EditorStoreContext } from '../../stores/EditorStore';
import Tile from '../marketplace/Tile';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { PredefinedRoute } from '../enums/PredefinedRoute';
import { Done } from '@material-ui/icons';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    manifest: {
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
    },
  })
);

interface IEditorStepperProps {
  onStepChanged: (step: number) => void;
}

const EditorStepper: React.FC<IEditorStepperProps> = observer(
  (props: IEditorStepperProps) => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleBack = () => {
      if (activeStep > 0) {
        props.onStepChanged(activeStep - 1);
        setActiveStep(activeStep - 1);
      }
    };

    const handleNext = () => {
      if (activeStep < 5) {
        props.onStepChanged(activeStep + 1);
        setActiveStep(activeStep + 1);
      }
    };

    return (
      <div id="sidebar">
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          fullWidth={false}
          onClick={() => (window.location.hash = `/${PredefinedRoute.STUDIO}`)}
        >
          Back to studio
        </Button>

        <div id="stepper-root" className={classes.root}>
          <Typography variant="h6">Complete this steps</Typography>
          <Typography variant="caption">
            Complete these steps in order to create an Outreach app.
          </Typography>

          <Stepper
            orientation="vertical"
            activeStep={activeStep}
            nonLinear={true}
            style={{
              width: 250,
            }}
          >
            <Step key="app-info">
              <StepLabel>
                General info {editorStore.generalInfoValid && <Done />}
              </StepLabel>
              <StepContent>
                <Typography>
                  Basic info about the application you are creating
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={true}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step key="api-info">
              <StepLabel>
                API info (optional) {editorStore.apiInfoValid && <Done />}
              </StepLabel>
              <StepContent>
                <Typography>
                  Define parameters needed for impersonated access to Outreach
                  API
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step key="config-info">
              <StepLabel>
                Configuration (optional){' '}
                {editorStore.configInfoValid && <Done />}
              </StepLabel>
              <StepContent>
                <Typography>
                  Defines configuration values Outreach user needs to provide
                  during the installation
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step key="extensions-info">
              <StepLabel>
                Extension configuration {editorStore.hostInfoValid && <Done />}
              </StepLabel>
              <StepContent>
                <Typography>
                  Define the extension configuration needed for proper
                  integration with Outreach
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>

            <Step key="manifest-info">
              <StepLabel>Manifest file</StepLabel>
              <StepContent>
                <Typography>
                  View and download your extension manifest
                </Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>

          <Typography
            variant="overline"
            style={{
              marginTop: 32,
              marginBottom: -16,
              marginLeft: 16,
            }}
          >
            Application tile Preview
          </Typography>
          <Tile
            manifest={editorStore.selectedManifest}
            onSelected={(manifest) =>
              console.info('[EditorStepper.tsx]::Tile selected', {
                manifest,
              })
            }
          />
        </div>
      </div>
    );
  }
);

export default EditorStepper;
