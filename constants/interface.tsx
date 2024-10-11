import {ReactNode} from 'react';

export interface IAuthContent {
  isLogin?: any;
  onAuthenticate?: any;
  onSubmit?: any;
  credentialsInvalid?: any;
  children?: ReactNode;
  onPress?: () => void;
  icon?: any;
  color?: string;
  size?: number;
  message?: ReactNode;
}

export interface CInput {
  label?: any;
  keyboardType?: any;
  secure?: any;
  onUpdateValue?: any;
  value?: any;
  isInvalid?: any;
}

export interface IAuthContext {
  children?: ReactNode;
}

export interface IcreateUser {
  axios?: any
}