import { Button, TextField } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authentication, firebaseNotificationConfig } from '../../../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from 'firebase/app';

import "./Authentication.css";
import { LoginPayload } from '../../../types/authen/Login';
import { loginUser, loginUserByGoogle } from '../../../redux/apiRequest';

const Register = () => {
    const user = useSelector((state: any) => state.auth.login.currentUser);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [messageRegister, setMessageRegister] = useState<string>("");
    const [messageLogin, setMessageLogin] = useState<string>("");

    useEffect(() => {
        if (user !== null) {
            navigate('/');
        }
        setMessageLogin("");
        setMessageRegister("");

    }, [])

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const userLogin: LoginPayload = {
                email: username,
                password: password
            }

            if (await loginUser(userLogin, dispatch, navigate) == "Login Fail") {
                setMessageLogin("The user or password that you've entered is incorrect.")
            } else if (await loginUser(userLogin, dispatch, navigate) == "DISABLE") {
                setMessageLogin("Your account is disable, please contact to us!");
            } else {

            }
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle = (isRegister: boolean) => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider).then((result: any) => {
            loginUserByGoogle(result, dispatch, navigate, isRegister)
        }).catch((error: any) => {
            console.log(error);
        });
    }

    const registerHandler = () => {
        if (password == confirm) {
            const newUser: LoginPayload = {
                email: username,
                password: password,
            }
            // registerCandidate(newUser, navigate, dispatch);
            setMessageRegister("");
        }
        else {
            setMessageRegister("Password confirm and password not match!");
        }
    }
    return (
        <div id='Login'>
            <img className='icon' src="https://www.weddingwire.com/assets/img/logos/gen_logoHeader.svg" alt="" />

            <div className="login-cover">
                <div className="col-left" style={{ backgroundImage: 'url(https://cdn1.weddingwire.com/assets/img/layer-alta/default_en-US.jpg)' }}>
                </div>
                <form onSubmit={loginHandler} className="col-right">
                    <div className="item">
                        <div className="login-header">Log in to your account</div>
                    </div>
                    <div className="item">
                        <div className='already-register'>Not a remember yet? <strong>Join now</strong></div>
                    </div>
                    <div className="item">
                        <input className='input' placeholder="Your username" onChange={(e) => { setUsername(e.target.value) }} />
                        <input className='input' placeholder="Your password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                        <div className="forgot">Forgot your password?</div>
                    </div>
                    <div className="item">
                        <Button type='submit' className="btn-login" variant="contained">Log in</Button>
                    </div>
                    <div className="item">
                        <div className="question">Are you a vendor?</div>
                        <div className="vendor-login">Vendor login</div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register