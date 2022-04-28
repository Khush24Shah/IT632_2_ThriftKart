import styled from "styled-components";

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
  return <Container>OUR FAMOUS CATEGORIES!! </Container>;
};

export default Announcement1;
