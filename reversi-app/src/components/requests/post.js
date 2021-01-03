import axios from 'axios';
import { IP } from '../url/url';

//request to store user data in the database
export const signupRequest = async (email, username, password, result, error, isError) => {
    
    axios.post(`http://${IP}:8080/api/auth/signup`, 
        { email: email,
        username: username,
        password: password,
        role: ["user"]
        })
    
    .then(response => {
        //console.log(response.status);
        result = response.status
        if (result === 200) {
            //console.log(result)
            window.location.assign(`http://${IP}:3000/`);
        }
        //console.log(typeof(result));
    })
    .catch(err => {
        if (err.response) {
            error = err.response.data;
            isError = true;
            //console.log(error);
            
        }
    });
};

//request to verify user data
export const loginRequest = async (username, password, setResult, setError) => {

        axios.post(`http://${IP}:8080/api/auth/signin`, 
            { username: username,
                password: password
            })
        
        .then(response => {
            let result = response.status;
            //console.log(response)                
            if (result === 200) {
                setResult(200);
                localStorage.setItem("id", JSON.stringify(response.data.id));
                localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                localStorage.setItem("name", JSON.stringify(response.data.username));
            }
        })
        
        .catch(error => {
            if (error.response) {
                error = error.response.data;
                setError(error.status)
                //console.log(error)                
            }
        });
    };

    //request to store an image in the database
    export const postImage = async (formData) => {
        let req = new XMLHttpRequest();
        let token = JSON.parse(localStorage.getItem('token'));
    
        try {
                
            req.open('POST', `http://${IP}:8080/api/image/postimage`, true);
            req.setRequestHeader('Authorization', 'Bearer ' + token);
            req.setRequestHeader('Accept', 'application/json');
            req.send(formData);
            //req.onreadystatechange = function receiveResponse() {
    
        } catch (err) {
    
            if (err.response.status) {
                console.log(err)
    
    
            }
        }
    }