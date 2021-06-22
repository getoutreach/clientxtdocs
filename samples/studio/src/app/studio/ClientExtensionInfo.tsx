import React, { useContext, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  useTheme,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import HostInfo from './HostInfo';
import TabContainer from '../shared/TabContainer';
import UserContextInfo from './context/UserContextInfo';
import AccountContextInfo from './context/AccountContextInfo';
import ProspectContextInfo from './context/ProspectContextInfo';
import OpportunityContextInfo from './context/OpportunityContextInfo';
import { EditorStoreContext } from '../../stores/EditorStore';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      '&:invalid': {
        borderLeft: 'red solid 4px',
      },
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    select: {
      width: 250,
      marginBottom: theme.spacing(1.5),
    },
    tab: {
      padding: theme.spacing(),
    },
  })
);

interface IClientExtensionInfoProps {
  index: number;
}

const ClientExtensionInfo: React.FC<IClientExtensionInfoProps> = observer(
  (props: IClientExtensionInfoProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const editorStore = useContext(EditorStoreContext);

    const [value, setValue] = useState<number>(0);
    // const [setAddonType] = useState<AddonType>(
    //   AddonType.LeftSideMenu
    // );

    const handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
      setValue(value);
    };

    const getTabA11yProps = (index: number) => {
      return {
        id: `options-tab-${index}`,
        'aria-controls': `tab-panel-${index}`,
      };
    };

    const getUserChecked = () => {
      if (!editorStore.selectedManifest) {
        return 0;
      }

      return editorStore.selectedManifest?.context.filter((p) =>
        p.startsWith('usr')
      ).length;
    };

    const getAccountChecked = () => {
      if (!editorStore.selectedManifest) {
        return false;
      }

      return editorStore.selectedManifest?.context.filter((p) =>
        p.startsWith('acc')
      ).length;
    };

    const getProspectChecked = () => {
      if (!editorStore.selectedManifest) {
        return false;
      }

      return editorStore.selectedManifest?.context.filter((p) =>
        p.startsWith('pro')
      ).length;
    };

    const getOpportunityChecked = () => {
      if (!editorStore.selectedManifest) {
        return false;
      }

      return editorStore.selectedManifest?.context.filter((p) =>
        p.startsWith('opp')
      ).length;
    };

    return (
      <div
        id={`ckt-extension-container-${props.index}`}
        className={classes.root}
      >
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Host configuration" {...getTabA11yProps(0)} />
          <Tab
            label={`User context (${getUserChecked()})`}
            {...getTabA11yProps(1)}
          />
          <Tab
            // disabled={addonType !== AddonType.AccountTab}
            label={`Account context (${getAccountChecked()})`}
            {...getTabA11yProps(2)}
          />
          <Tab
            // disabled={addonType !== AddonType.ProspectTab}
            label={`Prospect context (${getProspectChecked()})`}
            {...getTabA11yProps(3)}
          />
          <Tab
            // disabled={addonType !== AddonType.OpportunityTab}
            label={`Opportunity context (${getOpportunityChecked()})`}
            {...getTabA11yProps(4)}
          />
        </Tabs>
        <TabContainer index={0} value={value} dir={theme.direction}>
          <HostInfo
            onChange={(type) =>
              console.log('[ClientExtensionInfo]::onChangeHostInfo', { type })
            }
          />
        </TabContainer>
        <TabContainer
          index={1}
          value={value}
          dir={theme.direction}
          className={classes.tab}
        >
          <UserContextInfo />
        </TabContainer>
        <TabContainer
          index={2}
          value={value}
          dir={theme.direction}
          className={classes.tab}
        >
          <AccountContextInfo />
        </TabContainer>
        <TabContainer
          index={3}
          value={value}
          dir={theme.direction}
          className={classes.tab}
        >
          <ProspectContextInfo />
        </TabContainer>
        <TabContainer
          index={4}
          value={value}
          dir={theme.direction}
          className={classes.tab}
        >
          <OpportunityContextInfo />
        </TabContainer>
      </div>
    );
  }
);

export default ClientExtensionInfo;
