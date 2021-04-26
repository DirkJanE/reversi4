import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { IP } from '../url/url';
import { BoxColumn, Title, Form, InputBox, Button, Label, Input, Messagevisible, Link } from '../style/style.js';
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
        <BoxColumn style={{height: 420, width: 400, backgroundColor: 'red', borderRadius: 10}}>
            <Title> Sign up </Title>            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                    <Label> Enter your email address: </Label>
                    <Input ref= {register({required: true, minLength: 3, maxLength: 40, validate: (input) => isEmail(input)})} type="email" name="email" required
                    style={{ ...styles.input, borderColor: errors.email && "yellow" }}/>
                </InputBox>
                <InputBox>
                    <Label> Enter your username: </Label>
                    <Input ref= {register({required: true, minLength: 3, maxLength: 20})} type="text" name="username" required 
                    style={{ ...styles.input, borderColor: errors.username && "yellow" }}/>
                </InputBox>
                <InputBox>
                    <Label> Enter your password: </Label>
                    <Input ref= {register({required: true, minLength: 8, maxLength: 20, pattern: !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/})} type="password" name="password"
                    style={{ ...styles.input, borderColor: errors.password && "yellow" }}/>
                </InputBox>
                <InputBox>
                    <Label> Re-enter your password: </Label>
                    <Input ref= {register({required: true, minLength: 8, maxLength: 20})} type="password" name="repeat"
                    style={{ ...styles.input, borderColor: errors.repeat && "yellow" }}/>
                </InputBox>
                <Button type="submit" style={{marginTop: 20}}>Sign Up</Button>
            </Form>
            <Link className="link"
                       href={`http://${IP}:3000/`}>
                           Already a member? Log in here.
            </Link>
            <Messagevisible> {isRepeat ? "" : "The password and the repeated password do not match!"}</Messagevisible>
            <Messagevisible> {isError ? error : ""}</Messagevisible>
        </BoxColumn>
    );
}