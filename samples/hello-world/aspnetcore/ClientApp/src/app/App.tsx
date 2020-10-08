import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import Actions from './Actions';
import Events from './Events';
import Heading from './Heading';
import Url from './Url';
import Container from '@material-ui/core/Container';
import AppHeader from './AppHeader';
import { useStyles } from '../styles/styles';
import ManifestModal from './components/ManifestModal';

const App: React.FC = observer(() => {
  const classes = useStyles();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AppHeader onInfoClick={() => setModalOpen(!isModalOpen)} />
      <Container maxWidth="lg" className={classes.main}>
        <Heading />
        <Url />
        <Actions />
        <Events />
      </Container>
      <ManifestModal open={isModalOpen} onHandleClose={() => setModalOpen(false)} />
    </>
  );
});

export default App;
