import * as React from 'react';

import { Alert } from '@material-ui/lab';
import { NotificationStoreContext } from '../../stores/NotificationStore';
import Snackbar from '@material-ui/core/Snackbar';
import { observer } from 'mobx-react-lite';

const Toast: React.FC = observer(() => {
    const notificationStore = React.useContext(NotificationStoreContext);

    const onClose = () => {
        notificationStore.closeToast();
    };

    return (
        <Snackbar
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
            onClick={onClose}
            autoHideDuration={notificationStore.timeout}
            onClose={onClose}
            open={notificationStore.visible}
        >
            <Alert
                onClose={onClose}
                severity={notificationStore!.type}
                variant="filled"
                elevation={6}
                action={notificationStore.action}
            >
                {notificationStore!.text}
            </Alert>
        </Snackbar>
    );
});

export default Toast;
