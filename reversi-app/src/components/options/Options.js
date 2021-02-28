import React, { useState } from 'react';
import { postImage } from '../requests/post';
import './Options.css';


function Options () {
    //set usestate variables and setters and a variable
    const [image, setImage] = useState();
    const formData = new FormData();


    //get image from form
    const handleChange = (e) => {
        let image =  e.target.files[0];
        formData.append('file', image);
        setImage(formData);
    }

    //upload the image to the database
    const handleClick = (e) => {
        e.preventDefault();
        postImage(image);
    };

    return (
        <div>
            <p className="text-color"> Choose your avatar: </p>
                <form method="POST" encType="multipart/form-data" action="/">
                    <input onChange={handleChange}                            
                            type="file"
                            name="background"
                            className="options-button"
                            />
                    <br/>
                    <button className="options-button" onClick={handleClick}>
                        Click here to upload your avatar!
                    </button>
                </form>
                <p className="options-text">
                    Please not that uploaded avatars or pictures will be visible for other player in the game Reversi!
                </p>
        </div>
    );
}

export default Options;