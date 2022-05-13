import { Add, Delete, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import {addorder} from "../data/order"

import { useNavigate } from "react-router-dom";
import React, { useEffect,useState } from "react";
import { getCartItems } from "../data/cart";
import { deleteCart, updateCart } from "../helper/cart";
import { FaTrash } from "react-icons/fa";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;


  
const Cart = () => {


  const [plusMinus, setPlusMinus] = useState(1);

  const handlePlus = () => {
		setPlusMinus(plusMinus + 1);
	};
	const handleMinus = () => {
		if(plusMinus > 1)
    {
        setPlusMinus(plusMinus - 1)
    }
    else
    {

    }
	};

  const [cartData,setCartData] = useState({});
  const [toggle,setToggle] = useState(false);
  function loadRazorpay() {
    return new Promise(resolve =>{
      const script= document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () =>{
          resolve(true);
      }
      script.onerror = () => {
          resolve(false);
      }
      
    })
    
  
  
    
  }
  
   async function displayRazorpay(){
     const  res = await loadRazorpay();
     if(!res)
     {
        alert('Razorpay SDK failed to load');
        return;
     }
      const options = {
        "key": "rzp_test_KGXv07JQ5hkHS9",
  
        "amount": cartData.bill * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "ThriftKart",
        "description": "Used Goods Buying and selling system",
        "handler": function (response){
            alert("order placed successfull");
            addorder(cartData.userId);
            return navigate("/Order");
            
            
        },
       
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#F9681A"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      alert(response.error.description);
    });
    rzp1.open();  
  }
  let navigate = useNavigate();
  useEffect(async()=>{
    const id = JSON.parse(localStorage.getItem("user"))?._id;
    console.log(id);
    await getCartItems(id,(data)=>{
      console.log(data);
      data?.cart && setCartData(data?.cart);
    })
  },[toggle])

  const updateMyCart = async(event,prodid,qty) =>{
    event.preventDefault();
    if(qty>0){
      const id = JSON.parse(localStorage.getItem("user"))?._id;
      await updateCart(id,prodid,qty,(data)=>{
      console.log(data);
      if(data?.bill){
        setToggle(!toggle);
      }
    })
    }
  }

  const clearCart = async(event) =>{
    event.preventDefault();
    await deleteCart(cartData?._id,(data)=>{
      console.log(data);
      setToggle(!toggle);
      window.location.reload();
    })
  }
 

  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cartData?.products  && cartData?.products.length || 0})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled"  onClick={(e)=>{clearCart(e)}} >Clear Cart</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartData && cartData?.products && cartData?.products?.length>0 && cartData?.products.map((product,index)=>{
              
              return <React.Fragment key={index}>
              <Product>
              <ProductDetail>
                {console.log(product?.name)}
                <Image src={'/'+product?.name+'.jpg'} />
                   
                <Details>
                  <ProductName>
                    <b>Product:</b> {product?.name}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product?.productId}
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add onClick={(e)=>{
                    updateMyCart(e,product?.productId,product?.qty+1);
                  }} />
                  <ProductAmount>{product?.qty}</ProductAmount>
                  <Remove onClick={(e)=>{
                    updateMyCart(e,product?.productId,product?.qty-1);
                  }} />
                </ProductAmountContainer>
                <ProductPrice>₹ {product?.price}</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
              </React.Fragment>
            })}
            
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cartData?.bill}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={displayRazorpay}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
