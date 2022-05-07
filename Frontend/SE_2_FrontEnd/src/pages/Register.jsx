import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {generateOTP} from "../helper/generateOTP"
import {signup} from "../data/user"
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.freepik.com/free-vector/online-shopping-store-with-mobile-shopping-cart-mail-clouds-realistic-style-vector-illustration_21869807.htm#query=ecommerce%20background&position=16&from_view=keyword")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: 0;
  padding: 15px 20px;
  margin: 8px;
  background-color: chocolate;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [userData,setUserData] = useState({
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        address:"",
        dob:"",
        password:"",
        otp:"",
        hashedOTP:"",

  });

  const {fname,lname,email,mobile,dob,address,password,otp} = userData;
  const handleChange = (name) => (event) => {
		setUserData({ ...userData, error: false, [name]: event.target.value });
	};

  const generate = async(event) =>{
    event.preventDefault();
      await generateOTP({email},(data)=>{
        setUserData({
          ...userData,
          hashedOTP:data?.hashedOTP,
        })
      })
  }

  const userSignUp = async(event) =>{
    event.preventDefault();
    await signup(userData);
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT AND JOIN US!!</Title>
        <Form>
          <Input placeholder="first name" type="text" value={fname}
											onChange={handleChange("fname")}/>
          <Input placeholder="last name" type="text" value={lname}
											onChange={handleChange("lname")} />
          <Input placeholder="email" type="email" value={email.toLowerCase()}
											onChange={handleChange("email")} />
          <Input placeholder="mobile" type="text" value={mobile}
											onChange={handleChange("mobile")} />
          <Input placeholder="address" type="text" value={address}
											onChange={handleChange("address")} />
          <Input placeholder="dob" type="date" />
          <Input type="password" placeholder="password" value={password}
											onChange={handleChange("password")} />
          {/* <Input type="password" placeholder="confirm password" value={password2}
											onChange={handleChange("password2")} /> */}
          <Input type="text" placeholder="OTP" value={otp} onChange={handleChange("otp")} />
          <Button onClick={generate}  >Generate OTP</Button>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={userSignUp} >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;


