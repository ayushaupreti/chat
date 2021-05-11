import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch(err => alert(err.message));
    };

    return (
        <div className="login">
            <div className="login_container">
                <div className="login-text">
                    <h1>Sign in to Whatsapp!</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign in With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
