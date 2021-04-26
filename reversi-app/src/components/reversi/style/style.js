import styled from 'styled-components';

export const Board = styled.div`
    width: 550px;
    margin-right: 10px;
`;

export const BoardRow = styled.div`
    margin-left: 35px;
`;

export const OneSquare = styled.button`
    width: 60px;
    height: 60px;
    margin-top: 1px;
    margin-bottom: 1px;
    margin-right: 1px;
    background-color: green;
    color: black;
    border: 1px solid black;
    border-radius: 6px;
        &:hover {
            background-color: rgb(57, 134, 57);
            cursor: pointer;
        }
`;

export const Stone = styled.img`
    height: 30px;
    width: 30px;
`;
