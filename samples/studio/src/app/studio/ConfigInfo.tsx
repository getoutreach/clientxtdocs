import { Button } from '@material-ui/core';
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

        option: {
            display: 'flex',
            flexDirection: 'column',
            borderColor: theme.palette.divider,
            borderStyle: 'solid',
            borderWidth: 1,
            padding: theme.spacing(),
            margin: theme.spacing(),
        },
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        select: {
            width: 250,
            marginBottom: theme.spacing(),
        },
        textField: {
            width: 250,
            marginBottom: theme.spacing(),
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
        editorStore.addConfigurationOption(props.item, props.index);
    };

    const handleOptionTextChanged = (value: string, index: number) => {
        const configItem: ConfigurationItem = { ...props.item };

        if (configItem.options) {
            const option = configItem.options[index];
            option.text.en = value;
            editorStore.addOrUpdateConfiguration(configItem, props.index);
        }
    };
    const handleOptionValueChanged = (value: string, index: number) => {
        const configItem: ConfigurationItem = { ...props.item };

        if (configItem.options) {
            const option = configItem.options[index];
            option.value = value;
            editorStore.addOrUpdateConfiguration(configItem, props.index);
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
                    ></TextField>
                </div>
            ))}
        </div>
    );
};

interface IConfigItemInfoProps {
    item: ConfigurationItem;
    index: number;
    onChange: (item: ConfigurationItem, index: number) => void;
}

const ConfigItemInfo: React.FC<IConfigItemInfoProps> = (
    props: IConfigItemInfoProps
) => {
    const classes = useStyles();

    return (
        <div className={classes.configItem}>
            <Typography variant="subtitle1">
                Configuration item # {props.index + 1}
            </Typography>

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
            />

            <TextField
                id="data-type"
                className={classes.select}
                select={true}
                required={true}
                variant="outlined"
                label="Data type"
                value={props.item.type}
                onChange={(e) =>
                    props.onChange(
                        {
                            ...props.item,
                            type: e.target.value as ConfigurationItemType,
                        },
                        props.index
                    )
                }
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

    const handleAddConfigItem = () => {
        editorStore.configuration.push({
            id: Date.now(),
            key: '',
            text: {
                en: '',
            },
            required: true,
            type: 'string',
            urlInclude: true,
            defaultValue: '',
            validator: '',
            options: [{ text: { en: '' }, value: '' }],
        } as ConfigurationItem);
    };
    const handleConfigInfoItemChange = (
        item: ConfigurationItem,
        index: number
    ) => {
        editorStore.addOrUpdateConfiguration(item, index);
    };

    return (
        <div className={classes.root}>
            <div className={classes.config}>
                <div className={classes.heading}>
                    <Typography variant="h6">Configuration</Typography>
                    <Typography variant="caption" style={{ marginBottom: 8 }}>
                        Define configuration values Outreach should collect
                        during the addon installation. To learn more click
                        <Link href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/configuration.md">
                            {' '}
                            here
                        </Link>
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={handleAddConfigItem}
                >
                    Add config item
                </Button>

                <div className={classes.configItems}>
                    {editorStore.configuration.map((cfg, idx) => (
                        <ConfigItemInfo
                            key={`cfg-${idx}`}
                            item={cfg}
                            index={idx}
                            onChange={handleConfigInfoItemChange}
                        />
                    ))}
                </div>
            </div>
            {editorStore.configuration.length > 0 && (
                <div className={classes.configCard}>
                    <Typography variant="overline">
                        Config screen preview
                    </Typography>

                    <Configuration configuration={editorStore.configuration} />
                </div>
            )}
        </div>
    );
});

export default ConfigInfo;
