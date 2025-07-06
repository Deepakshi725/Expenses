import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitchToSignup={switchToSignup} onLogin={onLogin} />
      ) : (
        <Signup onSwitchToLogin={switchToLogin} onLogin={onLogin} />
      )}
    </div>
  );
};

export default Auth; 