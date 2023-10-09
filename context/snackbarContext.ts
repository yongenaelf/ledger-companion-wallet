import {createContext, Dispatch, SetStateAction} from 'react';

export enum SnackbarType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export interface SnackbarContextType {
  type: SnackbarType,
  message: string,
}

export const SnackbarContext = createContext<{ 
    snackbar: SnackbarContextType; 
    setSnackbar: Dispatch<SetStateAction<SnackbarContextType>>
  }>({
    snackbar: {
      type: SnackbarType.SUCCESS,
      message: '',
    },
    setSnackbar: () => {}
});