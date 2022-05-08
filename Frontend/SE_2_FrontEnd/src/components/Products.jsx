import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

import { useNavigate } from "react-router-dom";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const  Products = ({products}) => {

  let navigate = useNavigate();

  console.log(products);
  return (
    <Container>
      {popularProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
