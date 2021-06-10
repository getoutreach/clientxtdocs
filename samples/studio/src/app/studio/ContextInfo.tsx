import React, { useContext } from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    createStyles,
    FormControl,
    FormControlLabel,
    FormGroup,
    Link,
    makeStyles,
    Theme,
    Typography,
} from '@material-ui/core';
import {
    AccountContextKeys,
    AllContextKeys,
    Manifest,
    OpportunityContextKeys,
    ProspectContextKeys,
    UserContextKeys,
} from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { EditorStoreContext } from '../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        accordion: {
            margin: theme.spacing(),
            paddingLeft: theme.spacing(),
        },
        bold: {
            fontWeight: 800,
        },
        formControl: {
            margin: theme.spacing(1),
        },
        formControlLabel: {
            width: 350,
        },
        root: {
            display: 'flex',
            flexDirection: 'column',
        },
    })
);

const ContextInfo: React.FC = observer(() => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const contextKey = event.target.value as AllContextKeys;
        const ctx = [...editorStore.selectedManifest!.context];
        const selectedIndex = ctx.findIndex((p) => p === contextKey);
        if (selectedIndex === -1) {
            ctx.push(contextKey);
        } else {
            ctx.splice(selectedIndex, 1);
        }

        const manifest = {
            ...editorStore.selectedManifest!,
            context: ctx,
        } as Manifest;
        editorStore.addOrUpdateManifest(manifest);
    };

    const isChecked = (key: AllContextKeys) => {
        if (!editorStore.selectedManifest) {
            return false;
        }

        return (
            editorStore.selectedManifest.context.findIndex((p) => p === key) >
            -1
        );
    };

    const hasUserChecked = () => {
        if (!editorStore.selectedManifest) {
            return false;
        }

        return (
            editorStore.selectedManifest.context.findIndex((p) =>
                p.startsWith('usr')
            ) > -1
        );
    };

    const hasAccountChecked = () => {
        if (!editorStore.selectedManifest) {
            return false;
        }

        return (
            editorStore.selectedManifest.context.findIndex((p) =>
                p.startsWith('acc')
            ) > -1
        );
    };

    const hasProspectChecked = () => {
        if (!editorStore.selectedManifest) {
            return false;
        }

        return (
            editorStore.selectedManifest.context.findIndex((p) =>
                p.startsWith('pro')
            ) > -1
        );
    };

    const hasOpportunityChecked = () => {
        if (!editorStore.selectedManifest) {
            return false;
        }

        return (
            editorStore.selectedManifest.context.findIndex((p) =>
                p.startsWith('opp')
            ) > -1
        );
    };

    const renderUserContextPicker = () => {
        return (
            <Accordion
                className={classes.accordion}
                defaultExpanded={hasUserChecked()}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                        User contextual information
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormGroup row={true}>
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.EMAIL
                                        )}
                                        value={UserContextKeys.EMAIL}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User email address (${UserContextKeys.EMAIL})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.FIRST_NAME
                                        )}
                                        value={UserContextKeys.FIRST_NAME}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User first name (${UserContextKeys.FIRST_NAME})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(UserContextKeys.ID)}
                                        value={UserContextKeys.ID}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User identifier (${UserContextKeys.ID})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.LAST_NAME
                                        )}
                                        value={UserContextKeys.LAST_NAME}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User last name (${UserContextKeys.LAST_NAME})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.TITLE
                                        )}
                                        value={UserContextKeys.TITLE}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User title (${UserContextKeys.TITLE})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.USERNAME
                                        )}
                                        value={UserContextKeys.USERNAME}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User name (${UserContextKeys.USERNAME})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.CUSTOM_FIELD_1
                                        )}
                                        value={UserContextKeys.CUSTOM_FIELD_1}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User custom field 1 (${UserContextKeys.CUSTOM_FIELD_1})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.CUSTOM_FIELD_2
                                        )}
                                        value={UserContextKeys.CUSTOM_FIELD_2}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User custom field 2 (${UserContextKeys.CUSTOM_FIELD_2})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.CUSTOM_FIELD_3
                                        )}
                                        value={UserContextKeys.CUSTOM_FIELD_3}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User custom field 3 (${UserContextKeys.CUSTOM_FIELD_3})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.CUSTOM_FIELD_4
                                        )}
                                        value={UserContextKeys.CUSTOM_FIELD_4}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User custom field 4 (${UserContextKeys.CUSTOM_FIELD_4})`}
                            />
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            UserContextKeys.CUSTOM_FIELD_5
                                        )}
                                        value={UserContextKeys.CUSTOM_FIELD_5}
                                        onChange={handleChange}
                                    />
                                }
                                label={`User custom field 5 (${UserContextKeys.CUSTOM_FIELD_5})`}
                            />
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        );
    };

    const renderAccountContextPicker = () => {
        return (
            <Accordion
                className={classes.accordion}
                defaultExpanded={hasAccountChecked()}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                        Account contextual information
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormGroup row={true}>
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_ID
                                        )}
                                        value={AccountContextKeys.CUSTOM_ID}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom id (${AccountContextKeys.CUSTOM_ID})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.DESCRIPTION
                                        )}
                                        value={AccountContextKeys.DESCRIPTION}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account description (${AccountContextKeys.DESCRIPTION})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.EXTERNAL
                                        )}
                                        value={AccountContextKeys.EXTERNAL}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account external info (${AccountContextKeys.EXTERNAL})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.ID
                                        )}
                                        value={AccountContextKeys.ID}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account identifier (${AccountContextKeys.ID})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.LOCALITY
                                        )}
                                        value={AccountContextKeys.LOCALITY}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account locality (${AccountContextKeys.LOCALITY})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.NAME
                                        )}
                                        value={AccountContextKeys.NAME}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account name (${AccountContextKeys.NAME})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.TAGS
                                        )}
                                        value={AccountContextKeys.TAGS}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account tags (${AccountContextKeys.TAGS})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_1
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_1
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 1 (${AccountContextKeys.CUSTOM_FIELD_1})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_2
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_2
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 2 (${AccountContextKeys.CUSTOM_FIELD_2})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_3
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_3
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 3 (${AccountContextKeys.CUSTOM_FIELD_3})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_4
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_4
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 4 (${AccountContextKeys.CUSTOM_FIELD_4})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_5
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_5
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 5 (${AccountContextKeys.CUSTOM_FIELD_5})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_6
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_6
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 6 (${AccountContextKeys.CUSTOM_FIELD_6})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_7
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_7
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 7 (${AccountContextKeys.CUSTOM_FIELD_7})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_8
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_8
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 8 (${AccountContextKeys.CUSTOM_FIELD_8})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_9
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_9
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 9 (${AccountContextKeys.CUSTOM_FIELD_9})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_10
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_10
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 10 (${AccountContextKeys.CUSTOM_FIELD_10})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_11
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_11
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 11 (${AccountContextKeys.CUSTOM_FIELD_11})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_12
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_12
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 12 (${AccountContextKeys.CUSTOM_FIELD_12})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_13
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_13
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 13 (${AccountContextKeys.CUSTOM_FIELD_13})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_14
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_14
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 14 (${AccountContextKeys.CUSTOM_FIELD_14})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_15
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_15
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 15 (${AccountContextKeys.CUSTOM_FIELD_15})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_16
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_16
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 16 (${AccountContextKeys.CUSTOM_FIELD_16})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_17
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_17
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 17 (${AccountContextKeys.CUSTOM_FIELD_17})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_18
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_18
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 18 (${AccountContextKeys.CUSTOM_FIELD_18})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_19
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_19
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 19 (${AccountContextKeys.CUSTOM_FIELD_19})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_20
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_20
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 20 (${AccountContextKeys.CUSTOM_FIELD_20})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_21
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_21
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 21 (${AccountContextKeys.CUSTOM_FIELD_21})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_22
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_22
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 22 (${AccountContextKeys.CUSTOM_FIELD_22})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_23
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_23
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 23 (${AccountContextKeys.CUSTOM_FIELD_23})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_24
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_24
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 24 (${AccountContextKeys.CUSTOM_FIELD_24})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_25
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_25
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 25 (${AccountContextKeys.CUSTOM_FIELD_25})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_26
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_26
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 26 (${AccountContextKeys.CUSTOM_FIELD_26})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_27
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_27
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 27 (${AccountContextKeys.CUSTOM_FIELD_27})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_28
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_28
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 28 (${AccountContextKeys.CUSTOM_FIELD_28})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_29
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_29
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 29 (${AccountContextKeys.CUSTOM_FIELD_29})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_30
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_30
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 30 (${AccountContextKeys.CUSTOM_FIELD_30})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_31
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_31
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 31 (${AccountContextKeys.CUSTOM_FIELD_31})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_32
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_32
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 32 (${AccountContextKeys.CUSTOM_FIELD_32})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_33
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_33
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 33 (${AccountContextKeys.CUSTOM_FIELD_33})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_34
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_34
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 34 (${AccountContextKeys.CUSTOM_FIELD_34})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_35
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_35
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 35 (${AccountContextKeys.CUSTOM_FIELD_35})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_36
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_36
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 36 (${AccountContextKeys.CUSTOM_FIELD_36})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_37
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_37
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 37 (${AccountContextKeys.CUSTOM_FIELD_37})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_38
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_38
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 38 (${AccountContextKeys.CUSTOM_FIELD_38})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_39
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_39
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 39 (${AccountContextKeys.CUSTOM_FIELD_39})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_40
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_40
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 40 (${AccountContextKeys.CUSTOM_FIELD_40})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_41
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_41
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 41 (${AccountContextKeys.CUSTOM_FIELD_41})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_42
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_42
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 42 (${AccountContextKeys.CUSTOM_FIELD_42})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_43
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_43
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 43 (${AccountContextKeys.CUSTOM_FIELD_43})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_44
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_44
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 44 (${AccountContextKeys.CUSTOM_FIELD_44})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_45
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_45
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 45 (${AccountContextKeys.CUSTOM_FIELD_45})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_46
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_46
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 46 (${AccountContextKeys.CUSTOM_FIELD_46})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_47
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_47
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 47 (${AccountContextKeys.CUSTOM_FIELD_47})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_48
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_48
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 48 (${AccountContextKeys.CUSTOM_FIELD_48})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_49
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_49
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 49 (${AccountContextKeys.CUSTOM_FIELD_49})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_50
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_50
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 50 (${AccountContextKeys.CUSTOM_FIELD_50})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_51
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_51
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 51 (${AccountContextKeys.CUSTOM_FIELD_51})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_52
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_52
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 52 (${AccountContextKeys.CUSTOM_FIELD_52})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_53
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_53
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 53 (${AccountContextKeys.CUSTOM_FIELD_53})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_54
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_54
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 54 (${AccountContextKeys.CUSTOM_FIELD_54})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_55
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_55
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 55 (${AccountContextKeys.CUSTOM_FIELD_55})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_56
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_56
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 56 (${AccountContextKeys.CUSTOM_FIELD_56})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_57
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_57
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 57 (${AccountContextKeys.CUSTOM_FIELD_57})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_58
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_58
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 58 (${AccountContextKeys.CUSTOM_FIELD_58})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_59
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_59
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 59 (${AccountContextKeys.CUSTOM_FIELD_59})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_60
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_60
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 60 (${AccountContextKeys.CUSTOM_FIELD_60})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_61
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_61
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 61 (${AccountContextKeys.CUSTOM_FIELD_61})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_62
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_62
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 62 (${AccountContextKeys.CUSTOM_FIELD_62})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_63
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_63
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 63 (${AccountContextKeys.CUSTOM_FIELD_63})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_64
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_64
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 64 (${AccountContextKeys.CUSTOM_FIELD_64})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_65
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_65
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 65 (${AccountContextKeys.CUSTOM_FIELD_65})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_66
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_66
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 66 (${AccountContextKeys.CUSTOM_FIELD_66})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_67
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_67
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 67 (${AccountContextKeys.CUSTOM_FIELD_67})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_68
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_68
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 68 (${AccountContextKeys.CUSTOM_FIELD_68})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_69
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_69
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 69 (${AccountContextKeys.CUSTOM_FIELD_69})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_20
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_20
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 70 (${AccountContextKeys.CUSTOM_FIELD_70})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_71
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_71
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 71 (${AccountContextKeys.CUSTOM_FIELD_71})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_72
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_72
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 72 (${AccountContextKeys.CUSTOM_FIELD_72})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_73
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_73
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 73 (${AccountContextKeys.CUSTOM_FIELD_73})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_74
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_74
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 74 (${AccountContextKeys.CUSTOM_FIELD_74})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_75
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_75
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 75 (${AccountContextKeys.CUSTOM_FIELD_75})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_76
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_76
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 76 (${AccountContextKeys.CUSTOM_FIELD_76})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_77
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_77
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 77 (${AccountContextKeys.CUSTOM_FIELD_77})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_78
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_78
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 78 (${AccountContextKeys.CUSTOM_FIELD_78})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_79
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_79
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 79 (${AccountContextKeys.CUSTOM_FIELD_79})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_80
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_80
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 80 (${AccountContextKeys.CUSTOM_FIELD_80})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_81
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_81
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 81 (${AccountContextKeys.CUSTOM_FIELD_81})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_82
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_82
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 82 (${AccountContextKeys.CUSTOM_FIELD_82})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_83
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_83
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 83 (${AccountContextKeys.CUSTOM_FIELD_83})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_84
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_84
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 84 (${AccountContextKeys.CUSTOM_FIELD_84})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_85
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_85
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 85 (${AccountContextKeys.CUSTOM_FIELD_85})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_86
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_86
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 86 (${AccountContextKeys.CUSTOM_FIELD_86})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_87
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_87
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 87 (${AccountContextKeys.CUSTOM_FIELD_87})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_88
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_88
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 88 (${AccountContextKeys.CUSTOM_FIELD_88})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_89
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_89
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 89 (${AccountContextKeys.CUSTOM_FIELD_89})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_90
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_90
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 90 (${AccountContextKeys.CUSTOM_FIELD_90})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_91
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_91
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 91 (${AccountContextKeys.CUSTOM_FIELD_91})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_92
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_92
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 92 (${AccountContextKeys.CUSTOM_FIELD_92})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_93
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_93
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 93 (${AccountContextKeys.CUSTOM_FIELD_93})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_94
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_94
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 94 (${AccountContextKeys.CUSTOM_FIELD_94})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_95
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_95
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 95 (${AccountContextKeys.CUSTOM_FIELD_95})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_96
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_96
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 96 (${AccountContextKeys.CUSTOM_FIELD_96})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_97
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_97
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 97 (${AccountContextKeys.CUSTOM_FIELD_97})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_98
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_98
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 98 (${AccountContextKeys.CUSTOM_FIELD_98})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_99
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_99
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 99 (${AccountContextKeys.CUSTOM_FIELD_99})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            AccountContextKeys.CUSTOM_FIELD_100
                                        )}
                                        value={
                                            AccountContextKeys.CUSTOM_FIELD_100
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Account custom field 100 (${AccountContextKeys.CUSTOM_FIELD_100})`}
                            />
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        );
    };

    const renderProspectContextPicker = () => {
        return (
            <Accordion
                className={classes.accordion}
                defaultExpanded={hasProspectChecked()}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                        Prospect contextual information
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormGroup row={true}>
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.AVAILABLE_AT
                                        )}
                                        value={ProspectContextKeys.AVAILABLE_AT}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect available at (${ProspectContextKeys.AVAILABLE_AT})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.COMPANY
                                        )}
                                        value={ProspectContextKeys.COMPANY}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect company (${ProspectContextKeys.COMPANY})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.COMPANY_LOCALITY
                                        )}
                                        value={
                                            ProspectContextKeys.COMPANY_LOCALITY
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect company locality (${ProspectContextKeys.COMPANY_LOCALITY})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.EMAILS
                                        )}
                                        value={ProspectContextKeys.EMAILS}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect emails (${ProspectContextKeys.EMAILS})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.EXTERNAL
                                        )}
                                        value={ProspectContextKeys.EXTERNAL}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect external info (${ProspectContextKeys.EXTERNAL})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.ID
                                        )}
                                        value={ProspectContextKeys.ID}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect identifier (${ProspectContextKeys.ID})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.TAGS
                                        )}
                                        value={ProspectContextKeys.TAGS}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect tags (${ProspectContextKeys.TAGS})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.TIMEZONE
                                        )}
                                        value={ProspectContextKeys.TIMEZONE}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect timezone (${ProspectContextKeys.TIMEZONE})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.TITLE
                                        )}
                                        value={ProspectContextKeys.TITLE}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect title (${ProspectContextKeys.TITLE})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_1
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_1
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 1 (${ProspectContextKeys.CUSTOM_FIELD_1})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_2
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_2
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 2 (${ProspectContextKeys.CUSTOM_FIELD_2})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_3
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_3
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 3 (${ProspectContextKeys.CUSTOM_FIELD_3})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_4
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_4
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 4 (${ProspectContextKeys.CUSTOM_FIELD_4})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_5
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_5
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 5 (${ProspectContextKeys.CUSTOM_FIELD_5})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_6
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_6
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 6 (${ProspectContextKeys.CUSTOM_FIELD_6})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_7
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_7
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 7 (${ProspectContextKeys.CUSTOM_FIELD_7})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_8
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_8
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 8 (${ProspectContextKeys.CUSTOM_FIELD_8})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_9
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_9
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 9 (${ProspectContextKeys.CUSTOM_FIELD_9})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_10
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_10
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 10 (${ProspectContextKeys.CUSTOM_FIELD_10})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_11
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_11
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 11 (${ProspectContextKeys.CUSTOM_FIELD_11})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_12
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_12
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 12 (${ProspectContextKeys.CUSTOM_FIELD_12})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_13
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_13
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 13 (${ProspectContextKeys.CUSTOM_FIELD_13})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_14
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_14
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 14 (${ProspectContextKeys.CUSTOM_FIELD_14})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_15
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_15
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 15 (${ProspectContextKeys.CUSTOM_FIELD_15})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_16
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_16
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 16 (${ProspectContextKeys.CUSTOM_FIELD_16})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_17
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_17
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 17 (${ProspectContextKeys.CUSTOM_FIELD_17})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_18
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_18
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 18 (${ProspectContextKeys.CUSTOM_FIELD_18})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_19
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_19
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 19 (${ProspectContextKeys.CUSTOM_FIELD_19})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_20
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_20
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 20 (${ProspectContextKeys.CUSTOM_FIELD_20})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_21
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_21
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 21 (${ProspectContextKeys.CUSTOM_FIELD_21})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_22
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_22
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 22 (${ProspectContextKeys.CUSTOM_FIELD_22})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_23
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_23
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 23 (${ProspectContextKeys.CUSTOM_FIELD_23})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_24
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_24
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 24 (${ProspectContextKeys.CUSTOM_FIELD_24})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_25
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_25
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 25 (${ProspectContextKeys.CUSTOM_FIELD_25})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_26
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_26
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 26 (${ProspectContextKeys.CUSTOM_FIELD_26})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_27
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_27
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 27 (${ProspectContextKeys.CUSTOM_FIELD_27})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_28
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_28
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 28 (${ProspectContextKeys.CUSTOM_FIELD_28})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_29
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_29
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 29 (${ProspectContextKeys.CUSTOM_FIELD_29})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_30
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_30
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 30 (${ProspectContextKeys.CUSTOM_FIELD_30})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_31
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_31
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 31 (${ProspectContextKeys.CUSTOM_FIELD_31})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_32
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_32
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 32 (${ProspectContextKeys.CUSTOM_FIELD_32})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_33
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_33
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 33 (${ProspectContextKeys.CUSTOM_FIELD_33})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_34
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_34
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 34 (${ProspectContextKeys.CUSTOM_FIELD_34})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_35
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_35
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 35 (${ProspectContextKeys.CUSTOM_FIELD_35})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_36
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_36
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 36 (${ProspectContextKeys.CUSTOM_FIELD_36})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_37
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_37
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 37 (${ProspectContextKeys.CUSTOM_FIELD_37})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_38
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_38
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 38 (${ProspectContextKeys.CUSTOM_FIELD_38})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_39
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_39
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 39 (${ProspectContextKeys.CUSTOM_FIELD_39})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_40
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_40
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 40 (${ProspectContextKeys.CUSTOM_FIELD_40})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_41
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_41
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 41 (${ProspectContextKeys.CUSTOM_FIELD_41})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_42
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_42
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 42 (${ProspectContextKeys.CUSTOM_FIELD_42})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_43
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_43
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 43 (${ProspectContextKeys.CUSTOM_FIELD_43})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_44
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_44
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 44 (${ProspectContextKeys.CUSTOM_FIELD_44})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_45
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_45
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 45 (${ProspectContextKeys.CUSTOM_FIELD_45})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_46
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_46
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 46 (${ProspectContextKeys.CUSTOM_FIELD_46})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_47
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_47
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 47 (${ProspectContextKeys.CUSTOM_FIELD_47})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_48
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_48
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 48 (${ProspectContextKeys.CUSTOM_FIELD_48})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_49
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_49
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 49 (${ProspectContextKeys.CUSTOM_FIELD_49})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_50
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_50
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 50 (${ProspectContextKeys.CUSTOM_FIELD_50})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_51
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_51
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 51 (${ProspectContextKeys.CUSTOM_FIELD_51})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_52
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_52
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 52 (${ProspectContextKeys.CUSTOM_FIELD_52})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_53
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_53
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 53 (${ProspectContextKeys.CUSTOM_FIELD_53})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_54
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_54
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 54 (${ProspectContextKeys.CUSTOM_FIELD_54})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_55
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_55
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 55 (${ProspectContextKeys.CUSTOM_FIELD_55})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_56
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_56
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 56 (${ProspectContextKeys.CUSTOM_FIELD_56})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_57
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_57
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 57 (${ProspectContextKeys.CUSTOM_FIELD_57})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_58
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_58
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 58 (${ProspectContextKeys.CUSTOM_FIELD_58})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_59
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_59
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 59 (${ProspectContextKeys.CUSTOM_FIELD_59})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_60
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_60
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 60 (${ProspectContextKeys.CUSTOM_FIELD_60})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_61
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_61
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 61 (${ProspectContextKeys.CUSTOM_FIELD_61})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_62
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_62
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 62 (${ProspectContextKeys.CUSTOM_FIELD_62})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_63
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_63
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 63 (${ProspectContextKeys.CUSTOM_FIELD_63})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_64
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_64
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 64 (${ProspectContextKeys.CUSTOM_FIELD_64})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_65
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_65
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 65 (${ProspectContextKeys.CUSTOM_FIELD_65})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_66
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_66
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 66 (${ProspectContextKeys.CUSTOM_FIELD_66})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_67
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_67
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 67 (${ProspectContextKeys.CUSTOM_FIELD_67})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_68
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_68
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 68 (${ProspectContextKeys.CUSTOM_FIELD_68})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_69
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_69
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 69 (${ProspectContextKeys.CUSTOM_FIELD_69})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_70
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_70
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 70 (${ProspectContextKeys.CUSTOM_FIELD_70})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_70
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_71
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 71 (${ProspectContextKeys.CUSTOM_FIELD_71})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_72
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_72
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 72 (${ProspectContextKeys.CUSTOM_FIELD_72})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_73
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_73
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 73 (${ProspectContextKeys.CUSTOM_FIELD_73})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_74
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_74
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 74 (${ProspectContextKeys.CUSTOM_FIELD_74})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_75
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_75
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 75 (${ProspectContextKeys.CUSTOM_FIELD_75})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_76
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_76
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 76 (${ProspectContextKeys.CUSTOM_FIELD_76})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_77
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_77
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 77 (${ProspectContextKeys.CUSTOM_FIELD_77})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_78
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_78
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 78 (${ProspectContextKeys.CUSTOM_FIELD_78})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_79
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_79
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 79 (${ProspectContextKeys.CUSTOM_FIELD_79})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_80
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_80
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 80 (${ProspectContextKeys.CUSTOM_FIELD_80})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_81
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_81
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 81 (${ProspectContextKeys.CUSTOM_FIELD_81})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_82
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_82
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 82 (${ProspectContextKeys.CUSTOM_FIELD_82})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_83
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_83
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 83 (${ProspectContextKeys.CUSTOM_FIELD_83})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_84
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_84
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 84 (${ProspectContextKeys.CUSTOM_FIELD_84})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_85
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_85
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 85 (${ProspectContextKeys.CUSTOM_FIELD_85})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_86
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_86
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 86 (${ProspectContextKeys.CUSTOM_FIELD_86})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_87
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_87
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 87 (${ProspectContextKeys.CUSTOM_FIELD_87})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_88
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_88
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 88 (${ProspectContextKeys.CUSTOM_FIELD_88})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_89
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_89
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 89 (${ProspectContextKeys.CUSTOM_FIELD_89})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_90
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_90
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 90 (${ProspectContextKeys.CUSTOM_FIELD_90})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_91
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_91
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 91 (${ProspectContextKeys.CUSTOM_FIELD_91})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_92
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_92
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 92 (${ProspectContextKeys.CUSTOM_FIELD_92})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_93
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_93
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 93 (${ProspectContextKeys.CUSTOM_FIELD_93})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_94
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_94
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 94 (${ProspectContextKeys.CUSTOM_FIELD_94})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_95
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_95
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 95 (${ProspectContextKeys.CUSTOM_FIELD_95})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_96
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_96
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 96 (${ProspectContextKeys.CUSTOM_FIELD_96})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_97
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_97
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 97 (${ProspectContextKeys.CUSTOM_FIELD_97})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_98
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_98
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 98 (${ProspectContextKeys.CUSTOM_FIELD_98})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_99
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_99
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 99 (${ProspectContextKeys.CUSTOM_FIELD_99})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            ProspectContextKeys.CUSTOM_FIELD_100
                                        )}
                                        value={
                                            ProspectContextKeys.CUSTOM_FIELD_100
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Prospect custom field 100 (${ProspectContextKeys.CUSTOM_FIELD_100})`}
                            />
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        );
    };

    const renderOpportunityContextPicker = () => {
        return (
            <Accordion
                className={classes.accordion}
                defaultExpanded={hasOpportunityChecked()}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">
                        Opportunity contextual information
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormGroup row={true}>
                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.AMOUNT
                                        )}
                                        value={OpportunityContextKeys.AMOUNT}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity amount at (${OpportunityContextKeys.AMOUNT})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.DESCRIPTION
                                        )}
                                        value={
                                            OpportunityContextKeys.DESCRIPTION
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity description (${OpportunityContextKeys.DESCRIPTION})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.EXTERNAL
                                        )}
                                        value={OpportunityContextKeys.EXTERNAL}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity external info (${OpportunityContextKeys.EXTERNAL})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.EXTERNAL_CREATED_AT
                                        )}
                                        value={
                                            OpportunityContextKeys.EXTERNAL_CREATED_AT
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity external created at (${OpportunityContextKeys.EXTERNAL_CREATED_AT})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.ID
                                        )}
                                        value={OpportunityContextKeys.ID}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity identifier (${OpportunityContextKeys.ID})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.NAME
                                        )}
                                        value={OpportunityContextKeys.NAME}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity name (${OpportunityContextKeys.NAME})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.NEXT_STEP
                                        )}
                                        value={OpportunityContextKeys.NEXT_STEP}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity next step (${OpportunityContextKeys.NEXT_STEP})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.PROBABILITY
                                        )}
                                        value={
                                            OpportunityContextKeys.PROBABILITY
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity probability (${OpportunityContextKeys.PROBABILITY})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.TAGS
                                        )}
                                        value={OpportunityContextKeys.TAGS}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity tags (${OpportunityContextKeys.TAGS})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.TYPE
                                        )}
                                        value={OpportunityContextKeys.TYPE}
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity type (${OpportunityContextKeys.TYPE})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_1
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_1
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 1 (${OpportunityContextKeys.CUSTOM_FIELD_1})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_2
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_2
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 2 (${OpportunityContextKeys.CUSTOM_FIELD_2})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_3
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_3
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 3 (${OpportunityContextKeys.CUSTOM_FIELD_3})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_4
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_4
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 4 (${OpportunityContextKeys.CUSTOM_FIELD_4})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_5
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_5
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 5 (${OpportunityContextKeys.CUSTOM_FIELD_5})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_6
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_6
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 6 (${OpportunityContextKeys.CUSTOM_FIELD_6})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_7
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_7
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 7 (${OpportunityContextKeys.CUSTOM_FIELD_7})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_8
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_8
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 8 (${OpportunityContextKeys.CUSTOM_FIELD_8})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_9
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_9
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 9 (${OpportunityContextKeys.CUSTOM_FIELD_9})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_10
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_10
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 10 (${OpportunityContextKeys.CUSTOM_FIELD_10})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_11
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_11
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 11 (${OpportunityContextKeys.CUSTOM_FIELD_11})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_12
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_12
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 12 (${OpportunityContextKeys.CUSTOM_FIELD_12})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_13
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_13
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 13 (${OpportunityContextKeys.CUSTOM_FIELD_13})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_14
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_14
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 14 (${OpportunityContextKeys.CUSTOM_FIELD_14})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_15
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_15
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 15 (${OpportunityContextKeys.CUSTOM_FIELD_15})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_16
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_16
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 16 (${OpportunityContextKeys.CUSTOM_FIELD_16})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_17
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_17
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 17 (${OpportunityContextKeys.CUSTOM_FIELD_17})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_18
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_18
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 18 (${OpportunityContextKeys.CUSTOM_FIELD_18})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_19
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_19
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 19 (${OpportunityContextKeys.CUSTOM_FIELD_19})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_20
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_20
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 20 (${OpportunityContextKeys.CUSTOM_FIELD_20})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_21
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_21
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 21 (${OpportunityContextKeys.CUSTOM_FIELD_21})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_22
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_22
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 22 (${OpportunityContextKeys.CUSTOM_FIELD_22})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_23
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_23
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 23 (${OpportunityContextKeys.CUSTOM_FIELD_23})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_24
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_24
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 24 (${OpportunityContextKeys.CUSTOM_FIELD_24})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_25
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_25
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 25 (${OpportunityContextKeys.CUSTOM_FIELD_25})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_26
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_26
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 26 (${OpportunityContextKeys.CUSTOM_FIELD_26})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_27
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_27
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 27 (${OpportunityContextKeys.CUSTOM_FIELD_27})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_28
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_28
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 28 (${OpportunityContextKeys.CUSTOM_FIELD_28})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_29
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_29
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 29 (${OpportunityContextKeys.CUSTOM_FIELD_29})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_30
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_30
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 30 (${OpportunityContextKeys.CUSTOM_FIELD_30})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_31
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_31
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 31 (${OpportunityContextKeys.CUSTOM_FIELD_31})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_32
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_32
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 32 (${OpportunityContextKeys.CUSTOM_FIELD_32})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_33
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_33
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 33 (${OpportunityContextKeys.CUSTOM_FIELD_33})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_34
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_34
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 34 (${OpportunityContextKeys.CUSTOM_FIELD_34})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_35
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_35
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 35 (${OpportunityContextKeys.CUSTOM_FIELD_35})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_36
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_36
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 36 (${OpportunityContextKeys.CUSTOM_FIELD_36})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_37
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_37
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 37 (${OpportunityContextKeys.CUSTOM_FIELD_37})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_38
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_38
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 38 (${OpportunityContextKeys.CUSTOM_FIELD_38})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_39
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_39
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 39 (${OpportunityContextKeys.CUSTOM_FIELD_39})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_40
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_40
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 40 (${OpportunityContextKeys.CUSTOM_FIELD_40})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_41
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_41
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 41 (${OpportunityContextKeys.CUSTOM_FIELD_41})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_42
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_42
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 42 (${OpportunityContextKeys.CUSTOM_FIELD_42})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_43
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_43
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 43 (${OpportunityContextKeys.CUSTOM_FIELD_43})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_44
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_44
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 44 (${OpportunityContextKeys.CUSTOM_FIELD_44})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_45
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_45
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 45 (${OpportunityContextKeys.CUSTOM_FIELD_45})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_46
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_46
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 46 (${OpportunityContextKeys.CUSTOM_FIELD_46})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_47
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_47
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 47 (${OpportunityContextKeys.CUSTOM_FIELD_47})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_48
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_48
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 48 (${OpportunityContextKeys.CUSTOM_FIELD_48})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_49
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_49
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 49 (${OpportunityContextKeys.CUSTOM_FIELD_49})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_50
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_50
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 50 (${OpportunityContextKeys.CUSTOM_FIELD_50})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_51
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_51
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 51 (${OpportunityContextKeys.CUSTOM_FIELD_51})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_52
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_52
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 52 (${OpportunityContextKeys.CUSTOM_FIELD_52})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_53
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_53
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 53 (${OpportunityContextKeys.CUSTOM_FIELD_53})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_54
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_54
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 54 (${OpportunityContextKeys.CUSTOM_FIELD_54})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_55
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_55
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 55 (${OpportunityContextKeys.CUSTOM_FIELD_55})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_56
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_56
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 56 (${OpportunityContextKeys.CUSTOM_FIELD_56})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_57
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_57
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 57 (${OpportunityContextKeys.CUSTOM_FIELD_57})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_58
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_58
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 58 (${OpportunityContextKeys.CUSTOM_FIELD_58})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_59
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_59
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 59 (${OpportunityContextKeys.CUSTOM_FIELD_59})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_60
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_60
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 60 (${OpportunityContextKeys.CUSTOM_FIELD_60})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_61
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_61
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 61 (${OpportunityContextKeys.CUSTOM_FIELD_61})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_62
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_62
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 62 (${OpportunityContextKeys.CUSTOM_FIELD_62})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_63
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_63
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 63 (${OpportunityContextKeys.CUSTOM_FIELD_63})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_64
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_64
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 64 (${OpportunityContextKeys.CUSTOM_FIELD_64})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_65
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_65
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 65 (${OpportunityContextKeys.CUSTOM_FIELD_65})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_66
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_66
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 66 (${OpportunityContextKeys.CUSTOM_FIELD_66})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_67
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_67
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 67 (${OpportunityContextKeys.CUSTOM_FIELD_67})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_68
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_68
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 68 (${OpportunityContextKeys.CUSTOM_FIELD_68})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_69
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_69
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 69 (${OpportunityContextKeys.CUSTOM_FIELD_69})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_70
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_70
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 70 (${OpportunityContextKeys.CUSTOM_FIELD_70})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_71
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_71
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 71 (${OpportunityContextKeys.CUSTOM_FIELD_71})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_72
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_72
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 72 (${OpportunityContextKeys.CUSTOM_FIELD_72})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_73
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_73
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 73 (${OpportunityContextKeys.CUSTOM_FIELD_73})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_74
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_74
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 74 (${OpportunityContextKeys.CUSTOM_FIELD_74})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_75
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_75
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 75 (${OpportunityContextKeys.CUSTOM_FIELD_75})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_76
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_76
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 76 (${OpportunityContextKeys.CUSTOM_FIELD_76})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_77
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_77
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 77 (${OpportunityContextKeys.CUSTOM_FIELD_77})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_78
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_78
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 78 (${OpportunityContextKeys.CUSTOM_FIELD_78})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_79
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_79
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 79 (${OpportunityContextKeys.CUSTOM_FIELD_79})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_80
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_80
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 80 (${OpportunityContextKeys.CUSTOM_FIELD_80})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_81
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_81
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 81 (${OpportunityContextKeys.CUSTOM_FIELD_81})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_82
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_82
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 82 (${OpportunityContextKeys.CUSTOM_FIELD_82})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_83
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_83
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 83 (${OpportunityContextKeys.CUSTOM_FIELD_83})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_84
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_84
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 84 (${OpportunityContextKeys.CUSTOM_FIELD_84})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_85
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_85
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 85 (${OpportunityContextKeys.CUSTOM_FIELD_85})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_86
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_86
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 86 (${OpportunityContextKeys.CUSTOM_FIELD_86})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_87
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_87
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 87 (${OpportunityContextKeys.CUSTOM_FIELD_87})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_88
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_88
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 88 (${OpportunityContextKeys.CUSTOM_FIELD_88})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_89
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_89
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 89 (${OpportunityContextKeys.CUSTOM_FIELD_89})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_90
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_90
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 90 (${OpportunityContextKeys.CUSTOM_FIELD_90})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_91
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_91
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 91 (${OpportunityContextKeys.CUSTOM_FIELD_91})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_92
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_92
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 92 (${OpportunityContextKeys.CUSTOM_FIELD_92})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_93
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_93
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 93 (${OpportunityContextKeys.CUSTOM_FIELD_93})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_94
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_94
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 94 (${OpportunityContextKeys.CUSTOM_FIELD_94})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_95
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_95
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 95 (${OpportunityContextKeys.CUSTOM_FIELD_95})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_96
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_96
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 96 (${OpportunityContextKeys.CUSTOM_FIELD_96})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_97
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_97
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 97 (${OpportunityContextKeys.CUSTOM_FIELD_97})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_98
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_98
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 98 (${OpportunityContextKeys.CUSTOM_FIELD_98})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_99
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_99
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 99 (${OpportunityContextKeys.CUSTOM_FIELD_99})`}
                            />

                            <FormControlLabel
                                className={classes.formControlLabel}
                                control={
                                    <Checkbox
                                        checked={isChecked(
                                            OpportunityContextKeys.CUSTOM_FIELD_100
                                        )}
                                        value={
                                            OpportunityContextKeys.CUSTOM_FIELD_100
                                        }
                                        onChange={handleChange}
                                    />
                                }
                                label={`Opportunity custom field 100 (${OpportunityContextKeys.CUSTOM_FIELD_100})`}
                            />
                        </FormGroup>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <div className={classes.root}>
            <Typography variant="h6">
                Outreach contextual information{' '}
            </Typography>
            <Typography variant="caption" style={{ marginBottom: 8 }}>
                To learn more read{' '}
                <Link href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/context.md">
                    here
                </Link>
            </Typography>

            <Typography variant="overline" style={{ marginLeft: 8 }}>
                Select the contextual information your application needs from
                Outreach
            </Typography>

            {renderUserContextPicker()}
            {renderAccountContextPicker()}
            {renderProspectContextPicker()}
            {renderOpportunityContextPicker()}
        </div>
    );
});

export default ContextInfo;
