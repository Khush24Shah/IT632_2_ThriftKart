import styled from "styled-components";
import {mobile} from "../responsive";
import { useState } from "react";
import { signin } from "../data/user";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(43, 119, 56, 0.42),
      rgba(43, 229, 56, 0.42)
    ),
    url("")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {

  const [userData,setUserData] = useState({
        email:"",
        password:"",
  });

  const {email,password} = userData;
  const handleChange = (name) => (event) => {
		setUserData({ ...userData, error: false, [name]: event.target.value });
	};

  const userSignIn = async(event) =>{
    event.preventDefault();
    await signin(userData);
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="email" type="email" value={email} onChange={handleChange("email")} />
          <Input type={"password"} placeholder="password" value={password} onChange={handleChange("password")} />
          <Button onClick={userSignIn} >LOGIN</Button>
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
