import React from 'react';
import { Typography } from '@material-ui/core';

interface ITabContainerProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  dir?: string;
  className?: string;
}

const TabContainer: React.FC<ITabContainerProps> = (
  props: ITabContainerProps
) => {
  const { children, index, value, ...other } = props;

  return (
    <Typography
      className={props.className}
      component="div"
      role="tabpanel"
      dir={props.dir}
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`options-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
};

export default TabContainer;
