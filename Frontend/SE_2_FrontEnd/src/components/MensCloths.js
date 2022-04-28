import React from "react";
import "./Cloths.css";
import MenObj from "./MenObj";
import SingleCard from "./SingleCard";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const MensCloths = () => {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="cards">
      <Grid container spacing={4}>
        {MenObj.map((obj) => {
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
export default MensCloths;
