import React, { useState } from 'react';
import { postImage } from '../requests/post';
import { Form, Input, Button, Text, Box, BoxColumn } from '../style/style.js';

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
        <BoxColumn style={{height: 300, width: 500, marginTop: 200, backgroundColor: 'red', borderRadius: 10}}>
            <Box style={{flexFlow: 'column', alignItems: 'center'}}>
                <Text style={{fontSize: 30, color: 'black', marginTop: 30, marginBottom: 20}}> Choose your avatar: </Text>
                    <Form style={{marginLeft: 40}} method="POST" encType="multipart/form-data" action="/">
                        <Input onChange={handleChange}                            
                                type="file"
                                name="background"
                                className="options-button"
                                />
                        <br/>
                        <Button style={{marginTop: 20, width: 250}} onClick={handleClick}>
                            Click here to upload your avatar!
                        </Button>
                    </Form>
                <Text style={{width: 250, color: 'black', marginTop: 20}}>
                    Please note that uploaded avatars or pictures will be visible for other player in the game Reversi!
                </Text>
            </Box>
        </BoxColumn>
    );
}

export default Options;