import styled from 'styled-components';

// Define a wrapper component that will wrap the entire app
const Main = styled.main`
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 400px;
    background-color: #262A2C;
    border-radius: 6px;
`;

export default function Wrapper({children}) {
    return (
        <Main>
            {children}
        </Main>
    )
}