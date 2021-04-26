import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IP } from '../url/url';
import { loginRequest } from '../requests/post';
import { BoxColumn, Title, Form, InputBox, Button, Label, Input, Messagevisible, Link } from '../style/style.js';

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
        <BoxColumn style={{height: 400, width: 400, backgroundColor: 'red', borderRadius: 10}}>
            <Title>Login</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
                    <Label> Enter your username: </Label>
                    <Input ref={register({required: true, minLength: 3, maxLength: 20})} type="text" name="username" required 
                    style={{ ...styles.input, borderColor: errors.username && "yellow" }}/>
            </InputBox>
            <InputBox>
                <Label> Enter your password: </Label>
                <Input ref={register({required: true, minLength: 8, maxLength: 20, pattern: !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/})} type="password" name="password"
                style={{ ...styles.input, borderColor: errors.password && "yellow" }}/>
            </InputBox>
                <Button type="submit" style={{marginTop: 20}}>
                    Login
                </Button>
            </Form>
            <Link href={`http://${IP}:3000/signup`}>
                    Not a member? Sign up here.
            </Link>
            <Messagevisible> {isError ? "Not a valid username and/or password." : ""}</Messagevisible>
        </BoxColumn>
    );
}

export default Login;