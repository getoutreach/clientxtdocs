import React from "react";
import { Box, Direction, Typography } from "@material-ui/core";

interface ITabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
  dir: Direction;
}

const TabPanel: React.FC<ITabPanelProps> = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-item-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
