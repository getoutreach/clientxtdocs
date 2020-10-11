import React, { useState, useEffect } from 'react';
import { useStyles } from '../../styles/styles';
import { Box, Container, TextField } from '@material-ui/core';
import MockManifest from '../../mock/MockManifest';
import { Manifest, validate } from '@outreach/client-addon-sdk';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid/Grid';

enum ManifestValidatorMessages {
  Valid = 'is-valid',
  NotValid = 'not-valid',
  InValidJson = 'invalid-json',
}

function getManifestValidatorMessages(key: ManifestValidatorMessages): string {
  switch (key) {
    case ManifestValidatorMessages.Valid:
      return 'Manifest is valid. ';
    case ManifestValidatorMessages.NotValid:
      return 'Manifest is not valid. ';
    case ManifestValidatorMessages.InValidJson:
      return 'Invalid JSON format. ';
  }
}

const ManifestValidator = () => {
  const [text, setText] = useState<string>(JSON.stringify(MockManifest, null, 2));
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const classes = useStyles();

  const changeHandler = (text: string) => {
    setText(text);

    try {
      const manifest = JSON.parse(text) as Manifest;
      setValidationIssues(validate(manifest));
    } catch (e) {
      setValidationIssues([getManifestValidatorMessages(ManifestValidatorMessages.InValidJson)]);
    }
  };

  useEffect(() => {
    changeHandler(text);
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <TextField
        className={classes.manifestTextField}
        onChange={e => changeHandler(e.currentTarget.value)}
        value={text}
        multiline
      />
      <Box className={validationIssues.length === 0 ? classes.validationSuccess : classes.validationError}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          {validationIssues.length === 0 ? (
            <>
              <CheckIcon />
              {getManifestValidatorMessages(ManifestValidatorMessages.Valid)}
            </>
          ) : (
            <>
              <CloseIcon />
              <>{getManifestValidatorMessages(ManifestValidatorMessages.NotValid)}</>
              <>{validationIssues.join(' ')}</>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ManifestValidator;
