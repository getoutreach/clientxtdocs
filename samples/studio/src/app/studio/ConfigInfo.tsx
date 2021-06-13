import { Button, IconButton } from '@material-ui/core';
import {
    createStyles,
    Link,
    makeStyles,
    MenuItem,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import { ConfigurationItem } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItem';
import { ConfigurationItemType } from '@outreach/client-addon-sdk/store/configuration/ConfigurationItemType';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { EditorStoreContext } from '../../stores/EditorStore';
import Configuration from '../marketplace/Configuration';

import DeleteIcon from '@material-ui/icons/Delete';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            alignSelf: 'flex-start',
            marginBottom: theme.spacing(2),
        },
        configCard: {
            alignSelf: 'center',
            backgroundColor: theme.palette.grey[100],
            borderColor: theme.palette.divider,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: theme.spacing(2),
            width: 350,
            marginTop: theme.spacing(8),
        },
        config: {
            display: 'flex',
            flexDirection: 'column',
        },
        configItem: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: theme.spacing(2),
        },
        configItems: {
            display: 'flex',
            flexDirection: 'row',
        },
        configItemOptions: {
            display: 'flex',
            flexDirection: 'column',
        },
        heading: {
            marginBottom: theme.spacing(2),
        },
        input: {
            '&:invalid': {
                borderLeft: 'red solid 4px',
            },
        },
        invalid: {
            borderLeft: 'red solid 4px',
            paddingLeft: theme.spacing(0.5),
        },
        option: {
            display: 'flex',
            flexDirection: 'column',
            borderColor: theme.palette.divider,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: theme.spacing(),
            margin: theme.spacing(),
        },
        optionHeading: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        optionGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        select: {
            width: 250,
            marginBottom: theme.spacing(1.5),
        },
        textField: {
            width: 250,
            marginBottom: theme.spacing(1.5),
        },
    })
);

interface IConfigItemOptionsProps {
    item: ConfigurationItem;
    index: number;
}

const ConfigItemOptions: React.FC<IConfigItemOptionsProps> = (
    props: IConfigItemOptionsProps
) => {
    const classes = useStyles();
    const editorStore = useContext(EditorStoreContext);

    const handleAddConfigItemOption = () => {
        editorStore.addNewConfigurationOption(props.index);
    };

    const handleOptionTextChanged = (value: string, index: number) => {
        const configItem: ConfigurationItem = { ...props.item };

        if (configItem.options) {
            const option = configItem.options[index];
            option.text.en = value;
            editorStore.updateConfigurationItem(configItem, props.index);
        }
    };
    const handleOptionValueChanged = (value: string, index: number) => {
        const configItem: ConfigurationItem = { ...props.item };

        if (configItem.options) {
            const option = configItem.options[index];
            option.value = value;
            editorStore.updateConfigurationItem(configItem, props.index);
        }
    };

    const handleDeleteConfigurationItem = (index: number) => {
        const configItem: ConfigurationItem = { ...props.item };

        if (configItem.options && configItem.options.length > index) {
            configItem.options.splice(index, 1);
            editorStore.updateConfigurationItem(configItem, props.index);
        }
    };

    return (
        <div className={classes.configItemOptions}>
            <Button
                variant="outlined"
                className={classes.button}
                onClick={handleAddConfigItemOption}
            >
                Add config option
            </Button>
            {props.item.options!.map((opt, idx) => (
                <div className={classes.optionGroup}>
                    <div className={classes.optionHeading}>
                        <Typography variant="subtitle1">
                            Option # {idx + 1}
                        </Typography>
                        <IconButton
                            style={{ marginLeft: 4 }}
                            title="Delete configuration item option"
                            onClick={() => handleDeleteConfigurationItem(idx)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <div className={classes.option}>
                        <TextField
                            key={`opt-${idx}-key`}
                            className={classes.textField}
                            required={true}
                            type="text"
                            label={`Option #${idx + 1} text`}
                            variant="outlined"
                            value={opt.text.en}
                            onChange={(e) =>
                                handleOptionTextChanged(e.target.value, idx)
                            }
                            inputProps={{
                                className: classes.input,
                            }}
                        ></TextField>
                        <TextField
                            key={`opt-${idx}-value`}
                            className={classes.textField}
                            required={true}
                            type="text"
                            label={`Option #${idx + 1} value`}
                            variant="outlined"
                            value={opt.value}
                            onChange={(e) =>
                                handleOptionValueChanged(e.target.value, idx)
                            }
                            inputProps={{
                                className: classes.input,
                            }}
                        ></TextField>
                    </div>
                </div>
            ))}
        </div>
    );
};

interface IConfigItemInfoProps {
    item: ConfigurationItem;
    index: number;
    onChange: (item: ConfigurationItem, index: number) => void;
    onDelete: (index: number) => void;
}

const ConfigItemInfo: React.FC<IConfigItemInfoProps> = (
    props: IConfigItemInfoProps
) => {
    const classes = useStyles();

    return (
        <div className={classes.configItem}>
            <div className={classes.optionHeading}>
                <Typography variant="subtitle1">
                    Configuration item # {props.index + 1}
                </Typography>
                <IconButton
                    style={{ marginLeft: 4 }}
                    onClick={() => props.onDelete(props.index)}
                    title="Delete configuration item option"
                >
                    <DeleteIcon />
                </IconButton>
            </div>

            <TextField
                id="key"
                className={classes.textField}
                variant="outlined"
                label="Key"
                required={true}
                placeholder="ex. api-key"
                value={props.item.key}
                title="This is the key which Outreach will use when sending you the current user configuration value"
                onChange={(e) =>
                    props.onChange(
                        { ...props.item, key: e.target.value },
                        props.index
                    )
                }
                inputProps={{
                    className: classes.input,
                }}
            />

            <TextField
                id="label"
                className={classes.textField}
                variant="outlined"
                label="Label"
                required={true}
                placeholder="ex. Your Contoso API key"
                value={props.item.text.en}
                title="This is the key which Outreach will use when sending you the current user configuration value"
                style={{
                    width: 250,
                }}
                onChange={(e) =>
                    props.onChange(
                        {
                            ...props.item,
                            text: {
                                en: e.target.value,
                            },
                        },
                        props.index
                    )
                }
                inputProps={{
                    className: classes.input,
                }}
            />

            <TextField
                id="data-type"
                className={classes.select}
                select={true}
                required={true}
                variant="outlined"
                label="Data type"
                value={props.item.type}
                onChange={(e) => {
                    const configurationItem = {
                        ...props.item,
                        type: e.target.value as ConfigurationItemType,
                    } as ConfigurationItem;
                    if (
                        configurationItem.type !== 'options' &&
                        configurationItem.type !== 'select'
                    ) {
                        delete configurationItem.options;
                    }
                    props.onChange(configurationItem, props.index);
                }}
                inputProps={{
                    className: classes.input,
                }}
            >
                <MenuItem key="string" value="string">
                    Text
                </MenuItem>
                <MenuItem key="number" value="number">
                    Number
                </MenuItem>
                <MenuItem key="date" value="date">
                    Date
                </MenuItem>
                <MenuItem key="uri" value="uri">
                    Uri
                </MenuItem>
                <MenuItem key="options" value="options">
                    Options
                </MenuItem>
                <MenuItem key="select" value="select">
                    Select
                </MenuItem>
            </TextField>

            <TextField
                id="required"
                className={classes.select}
                select={true}
                variant="outlined"
                required={true}
                label="Is mandatory?"
                value={props.item.required}
                onChange={(e) =>
                    props.onChange(
                        {
                            ...props.item,
                            required: e.target.value === 'true',
                        },
                        props.index
                    )
                }
                inputProps={{
                    className: classes.input,
                }}
            >
                <MenuItem key="required-yes" value="true">
                    Yes
                </MenuItem>
                <MenuItem key="required-no" value="false">
                    No
                </MenuItem>
            </TextField>
            <TextField
                id="urlIncluded"
                className={classes.select}
                select={true}
                variant="outlined"
                required={true}
                label="Visible in url"
                value={props.item.urlInclude}
                onChange={(e) =>
                    props.onChange(
                        {
                            ...props.item,
                            urlInclude: e.target.value === 'true',
                        },
                        props.index
                    )
                }
                inputProps={{
                    className: classes.input,
                }}
            >
                <MenuItem key="included-yes" value="true">
                    Yes
                </MenuItem>
                <MenuItem key="included-no" value="false">
                    No
                </MenuItem>
            </TextField>
            <TextField
                id="default-value"
                className={classes.textField}
                variant="outlined"
                label="Default value"
                required={false}
                value={props.item.defaultValue}
                onChange={(e) =>
                    props.onChange(
                        {
                            ...props.item,
                            defaultValue: e.target.value,
                        },
                        props.index
                    )
                }
                inputProps={{
                    className: classes.input,
                }}
            />
            <TextField
                id="regex-validation"
                className={classes.textField}
                variant="outlined"
                label="Regex validator"
                required={false}
                value={props.item.validator}
                onChange={(e) =>
                    props.onChange(
                        {
                            ...props.item,
                            validator: e.target.value,
                        },
                        props.index
                    )
                }
                inputProps={{
                    className: classes.input,
                }}
            />

            {(props.item.type === 'options' ||
                props.item.type === 'select') && (
                <ConfigItemOptions item={props.item} index={props.index} />
            )}
        </div>
    );
};

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

    return (
        <div className={classes.root}>
            <div className={classes.config}>
                <div className={classes.heading}>
                    <Typography variant="h6">Configuration</Typography>
                    <Typography variant="caption" style={{ marginBottom: 8 }}>
                        Define configuration values Outreach should collect
                        during the addon installation. To learn more click
                        <Link
                            href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/configuration.md"
                            target="_blank"
                        >
                            {' '}
                            here
                        </Link>
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => editorStore.createNewConfigurationItem()}
                >
                    Add config item
                </Button>

                <div className={classes.configItems}>
                    {editorStore.selectedManifest!.configuration!.map(
                        (cfg, idx) => (
                            <ConfigItemInfo
                                key={`cfg-${idx}`}
                                item={cfg}
                                index={idx}
                                onChange={handleConfigInfoItemChange}
                                onDelete={handleConfigInfoItemDelete}
                            />
                        )
                    )}
                </div>
            </div>
            {editorStore.selectedManifest!.configuration!.length > 0 && (
                <div className={classes.configCard}>
                    <Typography variant="overline">
                        Config screen preview
                    </Typography>

                    <Configuration
                        configuration={
                            editorStore.selectedManifest!.configuration
                        }
                    />
                </div>
            )}
        </div>
    );
});

export default ConfigInfo;
