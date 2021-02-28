import { IP } from '../url/url';

//request to delete image in database
export const deleteImage = (id, setSecondResult, setError) => {
    let req = new XMLHttpRequest();
    let token = JSON.parse(localStorage.getItem('token'));

    try {
        console.log(id);
        req.open('DELETE', `http://${IP}:8080/api/image/deleteimage/${id}`, true);
        req.setRequestHeader('Authorization', 'Bearer ' + token);
        req.setRequestHeader('Accept', 'application/json');
        req.send();
        console.log(req.readyState);
        console.log(req.status);
        req.onreadystatechange = function() {

            if (req.readyState === 4){
                
                if(req.status === 200){
                    setSecondResult(200);                   
                }
            } 
        }
    } catch (err) {
        let error = err
        if (error) {
            console.log(error)


        }
    }
}