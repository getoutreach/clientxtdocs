import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite'

import { Typography } from '@material-ui/core'

import { EventStoreContext } from '../stores/EventStore';


const App: React.FC = observer(() =>   {

  const eventStore = useContext(EventStoreContext);

  return (
    <div className="App">
      { eventStore.events.map(event => {
        return <Typography>
            {event.payload}
        </Typography>
      })}
    </div>
  );
});

export default App;
