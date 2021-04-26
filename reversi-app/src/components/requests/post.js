import axios from 'axios';
import { IP } from '../url/url';

//request to store user data in the database
export const signupRequest = async (email, username, password, setResult, setError) => {
    
    axios.post(`http://localhost:8080/api/auth/signup`, 
        { email: email,
        username: username,
        password: password,
        role: ["user"]
        })
    
    .then(response => {
        //console.log(response.status);
        let result = response.status
        if (result === 200) {
            //console.log(response)
            setResult(200);
        }
        //console.log(typeof(result));
    })
    .catch(error => {
        if (error.response) {
            error = error.response.data;
            setError(error.message);
            //console.log(error.message);
            
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
        let id = JSON.parse(localStorage.getItem('id'));
    
        try {
                
            req.open('POST', `http://${IP}:8080/api/image/postimage/${id}`, true);
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