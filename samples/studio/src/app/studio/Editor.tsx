import { Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import ApiInfo from './ApiInfo';
import ConfigInfo from './ConfigInfo';
import ContextInfo from './ContextInfo';
import EditorStepper from './EditorStepper';
import GeneralInfo from './GeneralInfo';
import HostInfo from './HostInfo';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 600,
        },

        details: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            margin: theme.spacing(2),
        },
        root: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            margin: theme.spacing(2),
        },
        stepper: {
            borderRightColor: theme.palette.divider,
            borderRightStyle: 'solid',
            borderRightWidth: 1,
        },
        title: {
            marginBottom: theme.spacing(2),
        },
    })
);

const Editor: React.FC = observer(() => {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState<number>(0);

    return (
        <div className={classes.root}>
            <div className={classes.stepper}>
                <EditorStepper onStepChanged={(step) => setActiveStep(step)} />
            </div>
            <div className={classes.details}>
                <div className={classes.title}>
                    <Typography variant="h5">App details</Typography>
                    <Typography>
                        Provide some basic info about your app to get things
                        going. Learn more about Outreach Apps and the &nbsp;
                        <Link href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/manifest.md">
                            Manifest Schema
                        </Link>
                    </Typography>
                </div>

                {activeStep === 0 && <GeneralInfo />}
                {activeStep === 1 && <HostInfo />}
                {activeStep === 2 && <ContextInfo />}
                {activeStep === 3 && <ApiInfo />}
                {activeStep === 4 && <ConfigInfo />}
            </div>
        </div>
    );
});

export default Editor;
