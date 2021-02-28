import axios from 'axios';
import { IP } from '../url/url';

//request to store scores in the database
export const setScore = async (id, updategamesplayed, updategameswon, updatestoneswon) => {

    const token = JSON.parse(localStorage.getItem('token'));

    axios.put(`http://${IP}:8080/api/score/putscore/${id}`,
    {
        "stoneswon": updatestoneswon,
        "gamesPlayed": updategamesplayed,
        "gamesWon": updategameswon
    },
    { headers: { "Authorization": `Bearer ${token}` }})
        .then(response => {
            let result = response.status;
            //console.log(response)
            if (result === 200) {
                //setResult(result);                  
                //console.log('test')
            }
        })
        .catch(error => {
            if (error.response) {
                //setError(error.response)
                console.log(error.response)
            }
        });
    }