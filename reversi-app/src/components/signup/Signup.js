import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { IP } from '../url/url';
import './Signup.css';
import { signupRequest } from '../requests/post';

export const Signup = () => {
    const { register, handleSubmit, errors } = useForm();
      
    const [isRepeat, setIsRepeat] = useState(true);
    const [result, setResult] = useState();
    const [error, setError] = useState();
    const [isError, setIsError] = useState();

    //get values from form and send sign up reuest to the database.
    function onSubmit(data) {
        let email = data.email;
        let username = data.username;
        let password = data.password;
        let repeat = data.repeat;
        
        if (password !== repeat) {
            setIsRepeat(false);

        } else { 
            signupRequest(email, username, password, setResult, setError);
            //console.log(error);
        } 
    }          

    useEffect(() => {
        if (result === 200) {
            window.location.assign(`http://${IP}:3000`);
        }
        if (error === "This username is already taken! Please choose another." || error === "This emailaddress is already in use! Please use it to login.") {
            setIsError(true)
        };    
        //console.log(error)
    }, [result, error]);

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
        <div className="signup-container">
            <h4 className="title-signup">Sign up</h4>
            
            <form className="form-signup" onSubmit={handleSubmit(onSubmit)}>
                <div className="label-input-form">
                    <label className="label-signup">Enter your email address:</label>
                    <input className="input-signup" ref= {register({required: true, minLength: 3, maxLength: 40, validate: (input) => isEmail(input)})} type="email" name="email" required
                    style={{ ...styles.input, borderColor: errors.email && "yellow" }}/>
                </div>
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
                <div className="label-input-form">
                    <label className="label-signup">Re-enter your password:</label>
                    <input className="input-signup" ref= {register({required: true, minLength: 8, maxLength: 20})} type="password" name="repeat"
                    style={{ ...styles.input, borderColor: errors.repeat && "yellow" }}/>
                </div>
                <button className="button-signup" type="submit">Sign Up</button>
            </form>

            <div>
                <p className="message-signup-visible"> {isRepeat ? "" : "The password and the repeated password do not match!"}</p>
                <p className="message-signup-visible"> {isError ? error : ""}</p>
            </div>
            <a className="link"
                       href={`http://${IP}:3000/`}>
                           Already a member? Log in here.
            </a>

        </div>
    );
}

export default Signup;