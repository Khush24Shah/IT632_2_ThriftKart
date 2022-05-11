import { Add, Delete, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import { useNavigate } from "react-router-dom";
import React, { useEffect,useState } from "react";
import { getWishlistItems } from "../data/wishlist";
import { deleteWishlist } from "../helper/wishlist";
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


const Wishlist = () => {


  const [wishlistData,setWishlistData] = useState({});
  const [toggle,setToggle] = useState(false);
  useEffect(async()=>{
    const id = JSON.parse(localStorage.getItem("user"))?._id;
    console.log(id);
    await getWishlistItems(id,(data)=>{
      console.log(data);
      setWishlistData(data);
    })
  },[toggle])


  const clearWishlist = async(event) =>{
    event.preventDefault();
    console.log(wishlistData)
    await deleteWishlist(wishlistData?._id,()=>{
      setToggle(!toggle);
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
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled"  onClick={(e)=>{clearWishlist(e)}} >Clear wishlist</TopButton>
        </Top>
        <Bottom>
          <Info>
            {wishlistData && wishlistData?.products && wishlistData?.products?.length>0 && wishlistData?.products.map((product,index)=>{
              return <React.Fragment key={index}>
              <Product>
              <ProductDetail>
                <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A" />
                    <FaTrash/>
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
                <ProductPrice>₹ {product?.price}</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
              </React.Fragment>
            })}
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Wishlist;
