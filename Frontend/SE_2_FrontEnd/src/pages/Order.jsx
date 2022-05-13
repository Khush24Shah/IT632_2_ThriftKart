
import React from "react";
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
        const cout = 1;
        const pgl=()=>{
          console.log(cout);
            if(cout)
                {
             getorderItems(d=>{
              data = d;
              console.info("d1"+data);
                
                
                    for(let j in d)
                    {
                        var newtd = document.createElement('tr');
     document.getElementById("trh").appendChild(newtd);
                    for(let i in data[j].products)
                    {
                        if(data[j].products[i].qty)
                        {
                            var newtr = document.createElement('tr');
                            document.getElementById("trh").appendChild(newtr);
                            var newtd = document.createElement('td');
                            document.getElementById("trh").appendChild(newtd);
                            var newtd = document.createElement('td');
                            var t = document.createTextNode(data[j].products[i].name);
                            newtd.appendChild(t);
                            document.getElementById("trh").appendChild(newtd);
                           
                             var newtd = document.createElement('td');
                            var bt = document.createElement('input');
                            bt.type="text";
                            bt.readOnly=true;
                            bt.value=data[j].products[i].qty;
                            bt.style.width="50px";
                            newtd.appendChild(bt);
                            document.getElementById("trh").appendChild(newtd);
                           
                             var newtd = document.createElement('td');
                             newtd.id=data[j].products[i].name+"price";
                             var t = document.createTextNode(data[j].products[i].price);
                            newtd.appendChild(t);
                            document.getElementById("trh").appendChild(newtd);
                            
                            
                           
                        //<td><input type="button" value="Remove" class="btn" onclick="RemoveRow(this)"></button></td>
                    
                        }
                    }
                   
                    
                
     var newtd = document.createElement('tr');
     document.getElementById("trh").appendChild(newtd);
                   var newth = document.createElement('th');
                   
                    newtd.appendChild(newth);
                    
                    var newth = document.createElement('th');
                    var t = document.createTextNode( data[j]._id); 
                    newth.appendChild(t); 
                    newtd.appendChild(newth);
                    var newth = document.createElement('th');
                    var t = document.createTextNode( "Total Amount");      
                    newth.appendChild(t); 
                    newtd.appendChild(newth);
                    
                    var newth = document.createElement('th');
                    var t = document.createTextNode( data[j].bill);
                    newth.appendChild(t); 
                    newtd.appendChild(newth);
                    document.getElementById("trh").appendChild(newtd);
                    }
                   
                }
                
            )
          }}
        return (
            <div className="TV" onLoad={pgl}>
            <Navbar/>
            <Wrapper>
                
            <h1><b> YOUR ORDERS </b></h1>
            <table  id="trh" class="cart_table" cellspacing="20px" width="100%">
                <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                   
                </tr>
                </table>
     
            </Wrapper>
           
            <Footer />
            
            </div>
        );
}

export default Order;