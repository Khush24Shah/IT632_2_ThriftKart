import React from "react";
import "./HouseProducts.css";
import CardsObj from "./CardsObj";
import SingleCard from "./SingleCard";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Navbar from "./Navbar";


import { useNavigate } from "react-router-dom";

const HouseProducts = () => {

  let navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  return (
    <div className="cards">
      <Navbar />
      <Grid container spacing={4}>
        {CardsObj.map((obj) => {
          return (
            <>
              <Grid item xs={3}>
                <Item>
                  <SingleCard multi={obj} />{" "}
                </Item>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};
export default HouseProducts;
