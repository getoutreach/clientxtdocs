import {
  Button,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { PredefinedRoute } from '../enums/PredefinedRoute';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    capabilities: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
      flexGrow: 1,
    },
    categories: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
    },
    cta: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
    },
    featured: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
    },

    link: {
      paddingTop: theme.spacing(),
      paddingLeft: theme.spacing(),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      width: 300,
      borderRightColor: theme.palette.divider,
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      minWidth: 'fit-content',
    },
  })
);

const Featured = () => {
  const classes = useStyles();
  return (
    <div id="featured-container" className={classes.featured}>
      <Typography variant="subtitle1">Featured</Typography>
      <Link className={classes.link} href="/store/popular">
        Popular
      </Link>
      <Link className={classes.link} href="/store/top">
        Recommended
      </Link>
      <Link className={classes.link} href="/store/new">
        New extensions
      </Link>
    </div>
  );
};

const Categories = () => {
  const classes = useStyles();
  return (
    <div id="categories-container" className={classes.categories}>
      <Typography variant="subtitle1">Categories</Typography>
      <Link className={classes.link} href="/store/category/app">
        Application
      </Link>
      <Link className={classes.link} href="/store/category/account">
        Accounts
      </Link>
      <Link className={classes.link} href="/store/category/prospect">
        Prospects
      </Link>
      <Link className={classes.link} href="/store/category/opportunity">
        Opportunities
      </Link>
      <Link className={classes.link} href="/store/category/content">
        Content
      </Link>
      <Link className={classes.link} href="/store/category/data">
        Data
      </Link>
    </div>
  );
};

const Capabilities = () => {
  const classes = useStyles();
  return (
    <div id="capabilities-container" className={classes.capabilities}>
      <Typography variant="subtitle1">Capabilities</Typography>
      <Link className={classes.link} href="/store/app">
        App extensions
      </Link>
      <Link className={classes.link} href="/store/tab">
        Tab extensions
      </Link>
      <Link className={classes.link} href="/store/tiles">
        Intelligent tiles
      </Link>
      <Link className={classes.link} href="/store/composer">
        Composer extensions
      </Link>
      <Link className={classes.link} href="/store/emails">
        Email extensions
      </Link>
      <Link className={classes.link} href="/store/data">
        Data connectors
      </Link>
    </div>
  );
};

const Studio = () => {
  const classes = useStyles();
  return (
    <div id="studio-container" className={classes.featured}>
      <Typography variant="subtitle1">Developer tools</Typography>
      <Button href={`/#/${PredefinedRoute.STUDIO}`} variant="outlined">
        Extension studio
      </Button>
    </div>
  );
};

const Sidebar: React.FC = observer(() => {
  const classes = useStyles();

  console.log('[Sidebar.tsx]::render');

  return (
    <div id="sidebar-container" className={classes.root}>
      <Typography variant="h5">Apps</Typography>
      <Featured />
      <Categories />
      <Capabilities />
      <Studio />
    </div>
  );
});

export default Sidebar;
