import axios from 'axios';
import { IP } from '../url/url';

    //request to get scores from database fro scorepage
    export const getScore = async (setGamesPlayed, setGamesWon, setStonesWon) => {
        const id = JSON.parse(localStorage.getItem('id'));
        const token = JSON.parse(localStorage.getItem('token'));
        let gp;
        let gw;
        let sw
    
        axios.get(`http://${IP}:8080/api/score/getscore/${id}`,
        { headers: { "Authorization": `Bearer ${token}` }})
            .then(response => {
                let result = response.status;
                //console.log(response)
                if (result === 200) {
                    //setResult(200);
                    gp = response.data.gamesPlayed;
                    gw = response.data.gamesWon;
                    sw = response.data.stoneswon;
                    setGamesPlayed(gp);
                    setGamesWon(gw);
                    setStonesWon(sw)                  
                }
            })
            .catch(error => {
                if (error.response) {
                    //setError(error);
                    //console.log(error.response.data)
                }
            });
        }


    //request to get image from database           
    export const getImage = async (setResult, setError) => {
        const userid = JSON.parse(localStorage.getItem('id'));
        const token = JSON.parse(localStorage.getItem('token'));

    await axios.get(`http://${IP}:8080/api/image/getimage/${userid}`,
    { headers: { "Authorization": `Bearer ${token}` }})
        .then(response => {
            let result = response.status;
            //console.log(response)
            if (result === 200) {
                setResult(result);
                //console.log(response.data);
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

    //request to get image for Reversi page
    export const getImageForReversi = async (userid, setImage, setResult) => {
        const token = JSON.parse(localStorage.getItem('token'));

    await axios.get(`http://${IP}:8080/api/image/getimage/${userid}`,
    { headers: { "Authorization": `Bearer ${token}` }})
        .then(response => {
            let result = response.status;
            //console.log(response)
            if (result === 200) {
                setResult(true);
                let image = response.data;
                setImage(image.data);
                //console.log(image.data);
            }
        })
        .catch(err => {
            let error = err.response;
            //console.log(error.data.status);
            if (error) {
                //setError(error.status);
                //console.log(error)
            }
        });
    }