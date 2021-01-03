import React, { useState } from 'react';
import { postImage } from '../requests/post';
import { deleteImage } from '../requests/delete';
import { getImageForDelete } from '../requests/get';
import './Options.css';


function Options () {
    //set usestate variables and setters and a variable
    const [result, setResult] = useState();
    const [secondResult, setSecondResult] = useState();
    const [error, setError] = useState();
    const [id, setId] = useState();
    const [image, setImage] = useState();
    const formData = new FormData();


    //get image from form and check if there is in the database
    const handleChange = (e) => {
        let imagename = 'image' + localStorage.getItem('id') + '.JPG';
        let image =  e.target.files[0];
        formData.append('file', image, imagename);
        getImageForDelete(setId, setResult, setError);
        setImage(formData);
    }

    //upload the image to the database, if there is an image in the database delete it and upload the new image
    const handleClick = (e) => {
        e.preventDefault();
        
        if (result === 200) {
            deleteImage(id, setSecondResult, setError);
        }
        console.log(secondResult)
        if (secondResult === 200 || error === 500) {
            postImage(image);
        }
    };
/*
    useEffect (() => {
    console.log(id);
    },[id])
*/
    return (
        <div>
            <p className="text-color"> Choose your background: </p>
                <form method="POST" encType="multipart/form-data" action="/">
                    <input onChange={handleChange}                            
                            type="file"
                            name="background"
                            className="options-button"
                            />
                    <br/>
                    <button className="options-button" onClick={handleClick}>
                        Click here to upload your background!
                    </button>
                </form>               
        </div>
    );
}

export default Options;