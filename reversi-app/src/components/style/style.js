import styled from 'styled-components';
    
export const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const BoxColumn = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 10px 10px 5px grey;
`;

export const BoxRow = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 10px 10px 5px grey;
`;

export const Title = styled.h4`
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 30px;
    align-self: center;
`;

export const Form = styled.form`
    font-size: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    width: 300px;
`;

export const InputBox = styled.div`
    margin-top: 10px;
`;

export const Button = styled.button`
    width: 305px;
    font-family: 'Arial';
    background-color: lightgrey;
    border-radius: 7px;
    padding: 3px 0px;
    text-align: center;
    text-decoration: none;
    font-size: 14px;
    font-family: 'Oxygen', sans-serif;
    cursor: pointer;
`;

export const Label = styled.label`
    color: black;
`;

export const Input = styled.input`
    border-radius: 7px;
    background-color: lightgrey;
`;

export const Messagevisible = styled.p`
    margin-left: 10px;
    margin-top: 10px;
    font-size: 15px;
    opacity: 1;
    color: yellow;
`;

export const Link = styled.a`
    margin-top: 10px;
    color: blue;
    font-size: 15px;
        &:hover { 
            color: darkblue
        };
`;

export const Text = styled.div`
    font-size: 15px;
`;

export const Image = styled.img`
    height: 120px;
    width: 120px;
    border-radius: 7px;
`;