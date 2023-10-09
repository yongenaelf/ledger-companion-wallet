import {useContext} from 'react';
import {SnackbarContext, SnackbarType} from '../context/snackbarContext';

function useSnackbar() {
    const {snackbar, setSnackbar} = useContext(SnackbarContext);

    const error = (message) => setSnackbar({type: SnackbarType.ERROR, message});

    const success = (message) => setSnackbar({type: SnackbarType.SUCCESS, message});

    const info = (message) => setSnackbar({type: SnackbarType.INFO, message});

    const warning = (message) => setSnackbar({type: SnackbarType.WARNING, message});

    return {error, success, info, warning}
}

export default useSnackbar;