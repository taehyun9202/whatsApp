import { Button } from '@material-ui/core';
import React from 'react'
import './Login.css';
import { auth, provider } from '../firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{}, dispatch] = useStateValue();

    const singIn = () => {
        auth.signInWithPopup(provider)
            .then(res => 
                dispatch({
                    type: actionTypes.SET_USER,
                    user: res.user,
                })
            )
            .catch(err => alert(err.message));
    }
    return (
        <div className="login">
            <div className="loginContainer">
                <h1>Sign in to WhatsApp</h1>
                <Button onClick={singIn}>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
