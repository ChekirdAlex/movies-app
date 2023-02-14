import React from 'react';
import './error-alert.css';
import { Alert } from 'antd';

function ErrorAlert({ errorText }) {
  return <Alert message="Error: " description={errorText} type="error" showIcon className="app-alert" />;
}
export default ErrorAlert;
