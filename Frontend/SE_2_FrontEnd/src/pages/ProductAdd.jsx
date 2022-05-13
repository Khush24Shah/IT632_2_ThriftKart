import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {generateOTP} from "../helper/generateOTP"
import {padd} from "../data/ProductAdd"


import Navbar from "../components/Navbar"; 

import { useNavigate } from "react-router-dom";





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

const ProductAdd = () => {



  let navigate = useNavigate();



  
  const [userData,setUserData] = useState({
        name:"",
        categories:"",
        stock:"",
        gender:"",
        price:"",
        featured:"",
        rating:"",
    

  });

  const {name, categories, stock, gender, price, featured, rating,} = userData;
  const handleChange = (name) => (event) => {
		setUserData({ ...userData, error: false, [name]: event.target.value });
	};

  const generate = async(event) =>{
    event.preventDefault();
      await generateOTP({},(data)=>{
        setUserData({
          ...userData,
          // hashedOTP:data?.hashedOTP,
        })
      })
  }

  const AddingProducts = async(event) =>{
    if(userData.name && userData.stock && userData.categories && userData.featured && userData.gender && userData.price && userData.rating)
    {
    event.preventDefault();
    await padd(userData,d=>{console.log(d)});
    alert("product added");
    window.location.reload();
    }
    else
    {
      alert("field icomplete");
    }
  
  }
  return (
    <>
      <Navbar/>
    <Container>
      <Wrapper>
        <Title>Add Products</Title>
        <Form>
          <Input placeholder="name" type="text" value={name}
											onChange={handleChange("name")}/>
          <Input placeholder="categories" type="text" value={categories}
											onChange={handleChange("categories")} />
          <Input placeholder="stock" type="number" value={stock}
											onChange={handleChange("stock")} />
          <Input placeholder="gender" type="text" value={gender}
											onChange={handleChange("gender")} />
          <Input placeholder="price" type="number" value={price}
											onChange={handleChange("price")} />
          <Input placeholder="featured" type="text"  value={featured}
                                             onChange={handleChange("featured")} />
          <Input type="number" placeholder="rating" value={rating}
											onChange={handleChange("rating")} />
          {/* <Input type="password" placeholder="confirm password" value={password2}
											onChange={handleChange("password2")} /> */}
          <Button onClick={AddingProducts} >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
    </>
  );
};

export default ProductAdd;


