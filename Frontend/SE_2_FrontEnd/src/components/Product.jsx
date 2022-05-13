import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import { addToCart } from "../helper/cart";
import { addToWishlist } from "../helper/wishlist";
import s2 from "../pages/s2.jpg";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const Product = ({ item }) => {

  let navigate = useNavigate();
console.log(item)
  const addCart = async(event) =>{
    event.preventDefault();
    await addToCart(item?._id,1,(data)=>{
      console.log(data);
    })
    return navigate("/Cart");
  }
  const addWishlist = async(event) =>{
    event.preventDefault();
    await addToWishlist(item?._id,(data)=>{
      console.log(data);
    })
    return navigate("/Wishlist");
  }
  return (
    <Container>
      <Circle />
      {console.log('/'+item.name+'.jpg')}
      <Image src={'/'+item.name+'.jpg'} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={(e)=>addCart(e)} />
        </Icon>
        <Icon>
          <SearchOutlined onClick={()=>{navigate(`/Product/${item._id}`)}} />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined onClick={(e)=>addWishlist(e)} />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
