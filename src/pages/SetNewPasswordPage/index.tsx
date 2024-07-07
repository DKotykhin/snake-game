import SetNewPasswordForm from 'components/Forms/SetNewPassword';
import React from 'react';
import { useParams } from 'react-router-dom';

const SetNewPasswordPage = () => {

  const { token } = useParams();

  return <SetNewPasswordForm token={token} />;
};

export default SetNewPasswordPage;
