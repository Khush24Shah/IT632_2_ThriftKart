import styled from "styled-components";


import { useNavigate } from "react-router-dom";


const Container = styled.div`
  height: 30px;
  background-color: chocolate;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement1 = () => {


  let navigate = useNavigate();

  return <Container>OUR FAMOUS CATEGORIES!! </Container>;
};

export default Announcement1;
