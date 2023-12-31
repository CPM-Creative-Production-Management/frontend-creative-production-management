import React from 'react';
import LoginImg from '../../assets/login.svg'
import {Button, Card, Icon, Input} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {showToast} from "../../App";
import {LoginReq} from "../api/loginReq";
import {useDispatch} from "react-redux";
import {SiAntdesign} from "react-icons/si";


export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const emailRef = React.useRef('');
    const passwordRef = React.useRef('');

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const login = () => {
        // check for valid email (regex)
        let password = passwordRef.current.inputRef.current.value;
        let email = emailRef.current.inputRef.current.value

      

        if (email.length === 0 || !validateEmail(email)) {
            showToast("Please enter a valid email", "error")
            return
        } else if (password.length < 5) {
            console.log("Password must be at least 5 characters long")
            showToast("Password must be at least 5 characters long", "error")
            return
        }

        const loginBody = {
            email: email,
            password: password
        }

        LoginReq(loginBody, navigate, dispatch)

    }

    return (
        <div className={'row'}>

            <center>
                <br/>
                <br/>
                <br/>

                <center>
                    <SiAntdesign className='mt-3' size="10em"/>
                    <br/>
                    <h1>
                        Welcome back to CommuniCreate</h1>
                </center>
                <div className={'col-xs-12 col-sm-3 col-md-3 mb-4 mt-5'}>

                    <center>
                        <h2>Login to your account</h2>
                    </center>


                    <Input iconPosition={'left'} icon={'mail'} required ref={emailRef} type='email' className='mt-4'
                           fluid
                           size='large' placeholder='Email'/>
                    <Input iconPosition={'left'} icon={'lock'} required ref={passwordRef} className='mt-3' fluid
                           size='large'
                           placeholder='Password'
                           type='password'/>

                    <Button onClick={() => {
                        login()
                    }} primary className='mt-3' size='large' fluid>Login</Button>

                    <br/>

                    {/*<img width='60%' src={LoginImg} alt="LoginImg"/>*/}

                    Don't have an account?
                    <a className={'link-text'} onClick={()=>{
                        navigate('/register')
                    }}> &nbsp;&nbsp;Register Now </a>


                </div>


            </center>


        </div>


    )
}