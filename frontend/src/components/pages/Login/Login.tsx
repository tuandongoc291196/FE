import { Button, TextField } from '@mui/material'
import React from 'react'
import "./Login.css";

const Login = () => {
    return (
        <div id='Login'>
            <img className='icon' src="https://www.weddingwire.com/assets/img/logos/gen_logoHeader.svg" alt="" />

            <div className="login-cover">
                <div className="col-left" style={{ backgroundImage: 'url(https://cdn1.weddingwire.com/assets/img/layer-alta/default_en-US.jpg)' }}>
                </div>
                <div className="col-right">
                    <div className="item">
                        <div className="login-header">Log in to your account</div>
                    </div>
                    <div className="item">
                        <div className='already-register'>Not a remember yet? <strong>Join now</strong></div>
                    </div>
                    <div className="item">
                        <input className='input' placeholder="Your email" />
                        <input className='input' placeholder="Your password" />
                        <div className="forgot">Forgot your password?</div>
                    </div>
                    <div className="item">
                        <Button className="btn-login" variant="contained">Log in</Button>
                    </div>
                    <div className="item">
                        <div className="question">Are you a vendor?</div>
                        <div className="vendor-login">Vendor login</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login