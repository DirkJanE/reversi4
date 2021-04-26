import styled from 'styled-components';

export const Nav = styled.div`
    width: 100%;
    background: red;
`;

export const NavBar = styled.nav`
    display: flex;
    align-items: center;
`;

export const Logo = styled.div`
    color: black;
    text-decoration: none;
    font-size: 3rem;
    padding-left: 1rem;
`;

export const Space = styled.div`
    flex: 1;
`;

export const Unordered = styled.ul`
    list-style: none;
    margin: 0;
    padding-right: 1;
    display: flex;
`;

export const Ordered = styled.li`
    padding: 0 1rem;
`;

export const Link = styled.a` 
    color: black;
    text-decoration: none;
        &: hover, active {
            color: grey
        }
`;