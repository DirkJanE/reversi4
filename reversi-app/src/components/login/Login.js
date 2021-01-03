import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IP } from '../url/url';
import { loginRequest } from '../requests/post';
import './Login.css';

function Login() {
    //initialize usestate variables and setters and other variables
    const { register, handleSubmit, errors } = useForm();
    const [isError, setIsError] = useState();
    const [result, setResult] = useState();
    const [error, setError] = useState();

    //handle submit of form and execute login request
    const onSubmit = (data) => {
        let username = data.username;
        let password = data.password;
        //console.log('test')
        loginRequest(username, password, setResult, setError);
        };

    //if server replies with 200 show reversipage, if server replies with error show error
    useEffect(() => {
        if (result === 200) {
            window.location.assign(`http://${IP}:3000/reversi`);
        }
        if (error === 401) {
            setIsError(true)
        };    
        //console.log(error)
    }, [result, error]);

    //styles for form
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
    
    return (
        <div className="login-container">
            <h4 className="title-login">Login</h4>
            <form className="form-signup" onSubmit={handleSubmit(onSubmit)}>
            <div className="label-input-form">
                    <label className="label-signup">Enter your username:</label>
                    <input className="input-signup" ref= {register({required: true, minLength: 3, maxLength: 20})} type="text" name="username" required 
                    style={{ ...styles.input, borderColor: errors.username && "yellow" }}/>
                </div>
                <div className="label-input-form">
                    <label className="label-signup">Enter your password:</label>
                    <input className="input-signup" ref= {register({required: true, minLength: 8, maxLength: 20, pattern: !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/})} type="password" name="password"
                    style={{ ...styles.input, borderColor: errors.password && "yellow" }}/>
                </div>
                <button className="button-signup" type="submit">Login</button>
            </form>
            <div>
                <p className="message-login-visible"> {isError ? "Not a valid username and/or password." : ""}</p>
            </div>
            <a className="link-login"
                href={`http://${IP}:3000/signup`}>
                    Not a member? Sign up here.
            </a>        
        </div>

    );
}

export default Login;