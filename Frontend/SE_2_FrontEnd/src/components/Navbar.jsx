import { Badge } from "@material-ui/core";
import { ArrowDropDown, Search, ShoppingCartOutlined } from "@material-ui/icons";
import {React,useEffect,useState} from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {signout} from "../data/user"
import { useNavigate,Link } from "react-router-dom";
import { isAuthenticated } from "../data/user";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 45px;
  padding: 10px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {


  let navigate = useNavigate();
  const [toggle,setToggle] = useState(false);
  const [isAuth,setIsAuth] = useState(isAuthenticated);
  
  const signoutuser = async(event) =>{
    event.preventDefault();
    await signout()
    setToggle(!toggle);
  }

  useEffect(()=>{
    setIsAuth(isAuthenticated());
  },[toggle])

  return (
    <Container>
      <Wrapper>
      <Left>
           <Logo onClick={() =>navigate('/')} >ThriftKart</Logo>
        </Left>
        <Left>
          {/* <ArrowDropDown></ArrowDropDown> */}
          {/* <MenuItem onClick={() =>navigate('/Categories')}>Categories</MenuItem> */}
          <MenuItem onClick={() =>navigate('/ProductList')}>All Products</MenuItem>
        </Left>
        <Right>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Right>
        <Right>
          {!isAuthenticated() ? <>
              <MenuItem onClick={() =>navigate("/Register")}>REGISTER</MenuItem>
              <MenuItem onClick={() =>navigate('/Login')}>SIGN IN</MenuItem>
            </> : <MenuItem onClick={(e) =>signoutuser(e)}>SIGN OUT</MenuItem>
            }
          
          <MenuItem>
            {isAuthenticated() && <>
              <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined onClick={() =>navigate('/Cart')}/>
            </Badge>
            </>}
            
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
