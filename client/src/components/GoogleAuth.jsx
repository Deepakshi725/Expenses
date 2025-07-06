import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = ({ onLogin, onError }) => {
  const handleSuccess = (credentialResponse) => {
    console.log('Google login successful:', credentialResponse);
    
    // In a real application, you would send this credential to your backend
    // to verify it with Google and create a user session
    if (onLogin) {
      onLogin({
        type: 'google',
        credential: credentialResponse.credential,
        // You can decode the JWT token to get user info
        // For now, we'll simulate a successful login
        user: {
          id: 'google_user_' + Date.now(),
          email: 'user@example.com', // This would come from decoded JWT
          name: 'Google User', // This would come from decoded JWT
          picture: 'https://via.placeholder.com/40' // This would come from decoded JWT
        }
      });
    }
  };

  const handleError = () => {
    console.log('Google login failed');
    if (onError) {
      onError('Google authentication failed. Please try again.');
    }
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '20px'
    }}>
      <div style={{
        marginBottom: '16px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          right: '0',
          height: '1px',
          background: '#e2e8f0',
          transform: 'translateY(-50%)'
        }}></div>
        <span style={{
          background: 'white',
          padding: '0 16px',
          color: '#64748b',
          fontSize: '14px',
          position: 'relative',
          zIndex: 1
        }}>
          or continue with
        </span>
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </div>
    </div>
  );
};

export default GoogleAuth; 