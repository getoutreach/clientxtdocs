import React, { useState } from 'react';
import {
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  Theme,
  useTheme,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { PredefinedExtensionType } from '../enums/PredefinedExtensionType';
import HostInfo from './HostInfo';
import ContextInfo from './ContextInfo';
import TabContainer from '../shared/TabContainer';

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
  type: PredefinedExtensionType;
  index: number;
}

const ClientExtensionInfo: React.FC<IClientExtensionInfoProps> = observer(
  (props: IClientExtensionInfoProps) => {
    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, value: number) => {
      setValue(value);
    };

    const getTabA11yProps = (index: number) => {
      return {
        id: `options-tab-${index}`,
        'aria-controls': `tab-panel-${index}`,
      };
    };

    return (
      <div
        id={`ckt-extension-container-${props.index}`}
        className={classes.root}
      >
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Host configuration" {...getTabA11yProps(0)} />
          <Tab label="Context info" {...getTabA11yProps(1)} />
        </Tabs>
        <TabContainer index={0} value={value} dir={theme.direction}>
          <HostInfo />
        </TabContainer>
        <TabContainer
          index={1}
          value={value}
          dir={theme.direction}
          className={classes.tab}
        >
          <ContextInfo />
        </TabContainer>
      </div>
    );
  }
);

export default ClientExtensionInfo;
