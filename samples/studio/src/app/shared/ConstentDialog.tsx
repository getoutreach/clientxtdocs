import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import React from 'react';

interface IConsentDialogProps {
    open: boolean;
    title: string;
    description: string;
    onAccept: () => void;
    onCancel: () => void;
}

interface IConsentDialogState {
    open: boolean;
}

class ConsentDialog extends React.Component<
    IConsentDialogProps,
    IConsentDialogState
> {
    /**
     * Creates an instance of Consent.
     * @param {IConsentProps} props
     * @memberof Consent
     */
    constructor(props: IConsentDialogProps) {
        super(props);

        this.state = {
            open: props.open,
        };
    }

    public render() {
        const { title, description } = this.props;

        return (
            <Dialog
                open={this.state.open}
                onClose={this.onCancel}
                aria-labelledby="consent-dialog-title"
                aria-describedby="consent-dialog-description"
            >
                <DialogTitle id="consent-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="consent-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.onCancel}
                        variant="text"
                        autoFocus={true}
                    >
                        Cancel
                    </Button>
                    <Button onClick={this.onAccept} variant="text">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private onAccept = () => {
        this.props.onAccept();
        this.onClosed();
    };

    private onCancel = () => {
        this.props.onCancel();
        this.onClosed();
    };

    private onClosed = () => {
        this.setState({
            open: false,
        });
    };
}

export default ConsentDialog;
