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
            if (activeStep < 4) {
                props.onStepChanged(activeStep + 1);
                setActiveStep(activeStep + 1);
            }
        };
        return (
            <>
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    fullWidth={false}
                    onClick={() =>
                        (window.location.hash = `/${PredefinedRoute.STUDIO}`)
                    }
                >
                    Back to studio
                </Button>

                <div id="stepper-root" className={classes.root}>
                    <Typography variant="h6">Complete this steps</Typography>
                    <Typography variant="caption">
                        Complete these steps in order to distribute your app.
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
                            <StepLabel>General info</StepLabel>
                            <StepContent>
                                <Typography>
                                    Basic info about the application you are
                                    creating
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
                        <Step key="host-info">
                            <StepLabel>Host info</StepLabel>
                            <StepContent>
                                <Typography>
                                    Hosting information describing the addon
                                    attributes and requirements
                                </Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
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
                        <Step key="context-info">
                            <StepLabel>Context info</StepLabel>
                            <StepContent>
                                <Typography>
                                    Define contextual information Outreach
                                    application needs to share about current
                                    user session
                                </Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
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
                            <StepLabel>API info (optional)</StepLabel>
                            <StepContent>
                                <Typography>
                                    Define parameters needed for impersonated
                                    access to Outreach API
                                </Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
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
                        <Step key="config-info">
                            <StepLabel>Configuration (optional)</StepLabel>
                            <StepContent>
                                <Typography>
                                    Defines configuration values Outreach user
                                    needs to provide during the installation
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
                                        <Button
                                            disabled={true}
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Next
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
                            console.debug('[EditorStepper]', { manifest })
                        }
                    />
                </div>
            </>
        );
    }
);

export default EditorStepper;
