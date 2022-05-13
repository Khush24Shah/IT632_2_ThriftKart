
import React, { useEffect,useState } from "react";
import ReactTable from "react-table";  

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { getorderItems } from "../data/order";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import './Order.css';
import {Table} from "antd";
const Wrapper = styled.div`
padding: 50px;
display: flex;
${mobile({ padding: "10px", flexDirection:"column" })}
`;

const Order = () =>{
    
  const [orderData,setorderData] = useState({});
    const data1 = [
        {
          key:1,
          orderid:"X407-92415",
          itemname:"boAt Earphones",
          orderdate:"8-May-2022",
          qty:"2",
          status:"Shipped",
          ordertotal:" ₹999.00 ",
          paymentmethod:"COD"
        },
        {
          key:2,
          orderid:"S908-78900",
          itemname:"Samsung-M20 Mobile",
          orderdate:"27-April-2022",
          qty:"1",
          status:"Shipped",
          ordertotal:" ₹12999.00 ",
          paymentmethod:"COD"
        },
        {
          key:3,
          orderid:"S888-79087",
          itemname:"Diary",
          orderdate:"17-Mar-2022",
          qty:"3",
          status:"Return",
          ordertotal:" ₹1000.00 ",
          paymentmethod:"COD"
        },
        {
          key:4,
          orderid:"XU88-90908",
          itemname:"Sofa",
          orderdate:"24-Feb-2022",
          qty:"3",
          status:"Completed",
          ordertotal:" ₹1999.00 ",
          paymentmethod:"COD"
        },
        {
          key:5,
          orderid:"XU89-97899",
          itemname:"Waterbottel",
          orderdate:"1-Jan-2022",
          qty:"2",
          status:"Completed",
          ordertotal:" ₹599.00 ",
          paymentmethod:"COD"
        },
        {
          key:6,
          orderid:"AS89-09999",
          itemname:"NightLamp",
          orderdate:"22-Dec-2021",
          qty:"4",
          status:"Completed",
          ordertotal:" ₹4000.00 ",
          paymentmethod:"COD"
        },
        {
          key:7,
          orderid:"RW12-00008",
          itemname:"T-Shirt",
          orderdate:"10-Dec-2021",
          qty:"5",
          status:"Completed",
          ordertotal:" ₹3000.00 ",
          paymentmethod:"COD"
        }
        ];
        
        const columns = [
          {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id'
          },
          {
            title: 'Item Name',
            dataIndex: 'itemname',
            key: 'itemname',
          },
          {
            title: 'OrderDate',
            dataIndex: 'orderdate',
            key: 'orderdate',
          },
          {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: 'Order total',
            dataIndex: 'ordertotal',
            key: 'ordertotal',
          },
          {
            title: 'Payment Method',
            dataIndex: 'paymentmethod',
            key: 'paymentmethod',
          },
        ];
        var data ;
        useEffect(async()=>{
            
            await getorderItems(d=>{
              data = d;
                var t  =  document.getElementById("Tid");
            })
          })
        return (
            <div className="TV">
            <Navbar/>
            <Wrapper>
                {console.log(data)}
            <h1><b> YOUR ORDERS </b></h1>
            <Table defaultPageSize = {2}  
                  pageSizeOptions = {[2,4, 6]}    columns={columns}  id = "Tid"/>
     
            </Wrapper>
           
            <Footer />
            
            </div>
        );
}

export default Order;