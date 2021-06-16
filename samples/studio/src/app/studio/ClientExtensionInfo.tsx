import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { PredefinedExtensionType } from '../enums/PredefinedExtensionType';

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
  })
);

interface IClientExtensionInfoProps {
  type: PredefinedExtensionType;
  index: number;
}

const ClientExtensionInfo: React.FC<IClientExtensionInfoProps> = observer(
  (props: IClientExtensionInfoProps) => {
    const classes = useStyles();

    console.log('[ClientExtensionInfo.tsx]::render');

    return (
      <div
        id={`ckt-extension-container-${props.index}`}
        className={classes.root}
      ></div>
    );
  }
);

export default ClientExtensionInfo;
