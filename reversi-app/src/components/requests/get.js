import axios from 'axios';
import { IP } from '../url/url';

    //request to get scores from database fro scorepage
    export const getScore = async (setResult, setError) => {
        const id = JSON.parse(localStorage.getItem('id'));
        const token = JSON.parse(localStorage.getItem('token'));
    
        axios.get(`http://${IP}:8080/api/score/getscore/${id}`,
        { headers: { "Authorization": `Bearer ${token}` }})
            .then(response => {
                let result = response.status;
                //console.log(response)
                if (result === 200) {
                    setResult(200);
                    localStorage.setItem('gamesPlayed', response.data.gamesPlayed);
                    localStorage.setItem('gamesWon', response.data.gamesWon);
                    localStorage.setItem('stonesWon', response.data.stoneswon);                  
                }
            })
            .catch(error => {
                if (error.response) {
                    setError(error);
                    //console.log(error.response.data)
                }
            });
        }


    //request to get image from database           
    export const getImage = async (setResult, setError) => {
        const id = JSON.parse(localStorage.getItem('id'));
        const token = JSON.parse(localStorage.getItem('token'));
        const imageid = 'image' + id + '.JPG';

    await axios.get(`http://${IP}:8080/api/image/getimage/${imageid}`,
    { headers: { "Authorization": `Bearer ${token}` }})
        .then(response => {
            let result = response.status;
            //console.log(response)
            if (result === 200) {
                setResult(result);
                /*
                let convert = URL.createObjectURL(new Blob([response.data]));
                convert = convert.slice(5);
                const link = document.createElement('a',);
                link.href = convert;
                //console.log(link);
                setBackgroundUrl(convert);           
                */
            }
        })
        .catch(err => {
            let error = err.response;
            //console.log(error.data.status);
            if (error) {
                setError(error.status);
                //console.log(error)
            }
        });
    }

    //request to get image from database that is to be deleted
    export const getImageForDelete = async (setId, setResult, setError) => {
        const id = JSON.parse(localStorage.getItem('id'));
        const token = JSON.parse(localStorage.getItem('token'));
        const imageid = 'image' + id + '.JPG';

    axios.get(`http://${IP}:8080/api/image/getimage/${imageid}`,
    { headers: { "Authorization": `Bearer ${token}` }})
        .then(response => {
            let result = response.status;
            let id = response.data.id
            if (result === 200) {
                //console.log(id)
                setResult(result);
                setId(id);
            }
        })
        .catch(err => {
            let error = err.response;
            //console.log(error.data.status);
            if (error) {
                setError(error.data.status);
                //console.log(error)
            }
        });
    }