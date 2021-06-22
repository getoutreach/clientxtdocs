import {
  MenuItem,
  Link,
  Typography,
  TextField,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { AddonCategory, AddonStore } from '@outreach/client-addon-sdk';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { EditorStoreContext } from '../../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    basic: {
      flexGrow: 1,
    },
    icon: {
      height: theme.spacing(6),
      width: theme.spacing(6),
    },
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    select: {},
    textField: {
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface Option {
  title: string;
  value: AddonCategory;
}

const CATEGORIES_DATA: Option[] = [
  {
    title: 'Account Based Marketing',
    value: AddonCategory.ACCOUNT_BASED_MARKETING,
  },
  { title: 'Chat', value: AddonCategory.CHAT },
  {
    title: 'Conversation Intelligence',
    value: AddonCategory.CONVERSATION_INTELLIGENCE,
  },
  { title: 'CRM', value: AddonCategory.CRM },
  { title: 'Direct Mail', value: AddonCategory.DIRECT_MAIL },
  { title: 'Inbox', value: AddonCategory.INBOX },
  { title: 'Integration Platform', value: AddonCategory.INTEGRATION_PLATFORM },
  { title: 'Marketing', value: AddonCategory.MARKETING },
  { title: 'Privacy & Security', value: AddonCategory.PRIVACY_SECURITY },
  {
    title: 'Sales assets management',
    value: AddonCategory.SALES_ASSETS_MANAGEMENT,
  },
  {
    title: 'Sales intelligence data',
    value: AddonCategory.SALES_INTELLIGENCE_DATA,
  },
  { title: 'Productivity', value: AddonCategory.SALES_PRODUCTIVITY },
  { title: 'Video', value: AddonCategory.VIDEO },
  { title: 'Voice', value: AddonCategory.VOICE },
];

const getSelectedOptions = (categories?: AddonCategory[]): Option[] => {
  if (!categories) {
    return [];
  }
  return categories
    .map((category) => CATEGORIES_DATA.find((p) => p.value === category))
    .filter((p) => p) as Option[];
};

const BasicInfo: React.FC = observer(() => {
  const classes = useStyles();
  const editorStore = useContext(EditorStoreContext);
  const [categories, setCategories] = useState<Option[]>([]);

  useEffect(() => {
    const selectedOptions = getSelectedOptions(
      editorStore.selectedManifest?.categories
    );

    setCategories(selectedOptions);
  }, [editorStore.selectedManifest?.categories]);

  return (
    <div className={classes.basic}>
      <div className={classes.title}>
        <Typography variant="h5">General extension info</Typography>
        <Typography>
          Provide some basic info about your app to get things going. Learn more
          about Outreach Apps{' '}
          <Link
            href="https://github.com/getoutreach/clientxtsdk/blob/main/docs/manifest.md"
            target="_blank"
          >
            here
          </Link>
        </Typography>
      </div>

      <Typography variant="h6">Marketplace info</Typography>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="text"
          label="App ID"
          variant="outlined"
          value={editorStore.selectedManifest?.identifier || ''}
          onChange={(e) => {
            const manifest = {
              ...editorStore.selectedManifest!,
              identifier: e.target.value,
            };

            editorStore.setSelectedManifestId(manifest.identifier);
          }}
        ></TextField>
        <TextField
          className={classes.textField}
          autoFocus={true}
          fullWidth={true}
          required={true}
          type="text"
          label="App version"
          variant="outlined"
          style={{
            marginLeft: 16,
          }}
          value={editorStore.selectedManifest?.version || ''}
          placeholder="ex. 0.10"
          onChange={(e) =>
            editorStore.addOrUpdateManifest({
              ...editorStore.selectedManifest!,
              version: e.target.value,
            })
          }
          inputProps={{
            className: classes.input,
            pattern: '\\d+.\\d+',
          }}
        ></TextField>
      </div>
      <div className={classes.row}>
        <TextField
          className={classes.textField}
          fullWidth={true}
          required={true}
          type="text"
          label="App name"
          variant="outlined"
          value={editorStore.selectedManifest?.title.en || ''}
          onChange={(e) => {
            const manifest = {
              ...editorStore.selectedManifest!,
              title: {
                en: e.target.value,
              },
            };
            editorStore.addOrUpdateManifest(manifest);
          }}
          inputProps={{
            className: classes.input,
          }}
        ></TextField>

        <TextField
          id="store-type"
          className={classes.textField}
          fullWidth={true}
          select={true}
          required={true}
          variant="outlined"
          label="Extension store"
          value={editorStore.selectedManifest?.store}
          style={{ marginLeft: 16 }}
          onChange={(e) => {
            const manifest = {
              ...editorStore.selectedManifest!,
              store: e.target.value as AddonStore,
            };
            editorStore.addOrUpdateManifest(manifest);
          }}
          inputProps={{
            className: classes.input,
          }}
        >
          <MenuItem key="personal" value={AddonStore.Personal}>
            Personal store
          </MenuItem>
          <MenuItem key="number" value={AddonStore.Private}>
            Private store
          </MenuItem>
          <MenuItem key="public" value={AddonStore.Public}>
            Public store
          </MenuItem>
        </TextField>
      </div>
      <TextField
        className={classes.textField}
        fullWidth={true}
        required={true}
        multiline={true}
        rows={3}
        type="text"
        label="App description"
        variant="outlined"
        value={editorStore.selectedManifest?.description.en || ''}
        onChange={(e) =>
          editorStore.addOrUpdateManifest({
            ...editorStore.selectedManifest!,
            description: {
              en: e.target.value,
            },
          })
        }
        inputProps={{}}
      ></TextField>
      <Autocomplete
        multiple={true}
        ChipProps={{
          color: 'primary',
        }}
        id="categories"
        options={CATEGORIES_DATA}
        value={categories}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            id="categories-editor"
            variant="outlined"
            className={classes.textField}
            label="Marketplace category"
            placeholder="Please select one or more categories"
          />
        )}
        onChange={(_: any, options: Option[]) => {
          setCategories(options);
          const categories = options.map((p) => p.value);
          console.log('[BasicInfo]::onChange', { categories });
          editorStore.addOrUpdateManifest({
            ...editorStore.selectedManifest!,
            categories,
          });
        }}
      />
    </div>
  );
});

export default BasicInfo;
