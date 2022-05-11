import React, { useState } from "react";
import { FaEdit, FaWindows } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProfileData_API } from "../../backend";

import Navbar from "../../components/Navbar";
import "./Profile.css";
const Profile = () => {


  const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("user")))
  console.log(userData)
  const [editable, setEditable] = useState(false);
  const editfunc = () => {
    setEditable(true);
  };
  const validatesunc = () => {
    if(userData?.fname.length == 0)
    {
        alert("FirstName required")
    }
    if(userData?.lname.length == 0)
    {
        alert("LastName required")
    }
    var mailformat =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(!(userData?.email.match(mailformat)))
{
alert("You have entered an Invalid email address!"); 
}
    // if(!(userData?.mobile.length==10))
    // {
    //     alert("Invalid Phone Number...!")
    // }


  };
const handleChange = (name) => (event) => {
		setUserData({ ...userData, error: false, [name]: event.target.value });
	};
  const clickSubmit=async(e)=>{
    //e.preventDefault();
    const uploadData= new FormData();
    uploadData.append("fname",userData?.fname);
    uploadData.append("lname",userData?.lname);
    uploadData.append("email",userData?.email);
    uploadData.append("dob",userData?.dob);
    uploadData.append("mobile",userData?.mobile);
    uploadData.append("address",userData?.address);
    uploadData.append("password",userData?.password);
    await fetch(
      ProfileData_API,{
        method:"PUT",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        body:uploadData,
      }
    )
    .then((res)=>{
      console.log(res)
      return res.json()})
    .then((resp)=>{
      console.log(resp);
      if(resp.data){
        localStorage.setItem("user",JSON.stringify(userData))
      }
    })
  };


  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <div className="profile-main">
      <i className="Text-profile"> Profile </i>

      <div className="profile">
        <div className="edit-profile">
          {/* <FaEdit className='icon-edit'  /> */}
        </div>
        <div className="profile-Details">
            <table class="table">
                            
          <h2>
              <tr>
          <th>
            FirstName :
            </th>
            <td>
            <input
              type={"text"} 
              onChange={
                handleChange('fname')
              }
              value={userData?.fname}
            />{" "}
            </td>
            </tr>
          </h2>
          <h2>
              <tr>
                  <th>
            LastName :{" "}
            </th>
            <td>
            <input
              type={"text"}
              onChange={                handleChange('lname')
              }
              value={userData?.lname}
            />{" "}
            </td>
            </tr>
          </h2>

          <h2>
              <tr>
                  <th>
            Email:{" "}
            </th>
            <td>
            <input
              type={"email"}
              onChange={
                handleChange('email')
              }
              value={userData?.email}
            />{" "}
            </td>
            </tr>
          </h2>
          <h2>
              <tr>
                  <th>
            Phone :{" "}
            </th>
            <td>
            <input
              type={"phone"}
              onChange={
                handleChange('mobile')
              }
              value={userData?.mobile}
            />{" "}
            </td>
            </tr>
          </h2>
          <h2>
              <tr>
                  <th>
            Address :{" "}
            </th>
            <td>
            <input
              type={"text"}
              onChange={
                handleChange('address')
              }
              value={userData?.address}
            />{" "}
            </td>
            </tr>
          </h2>

          <h2>
          <tr>
            <th>
            Dob :{" "}
            </th>
            <td>
            <input 
              type={"date"} className="dob" 
              onChange={
                handleChange("dob")
              }
              value={userData?.dob}    
            />{" "}
            </td>
            </tr>
          </h2>
          </table>
          <center>
            <button
            type="submit" className="save_info"
            id=""
            onClick={(event) => {
              event.preventDefault();
              validatesunc();
              clickSubmit(event);

            }}>
            Save Info
          </button>
          </center>
            </div>
            <br></br>
          <hr className="line"></hr>
        
        
        <div className="Profile-links">
          <button
            type="submit"
            id=""
            onClick={(event) => {
              event.preventDefault();
              navigate("/Cart")
            }}
          >
            My Cart
          </button>

          <button
            type="submit"
            id=""
            onClick={(event) => {
              event.preventDefault();
              navigate("/Wishlist")
            }}
          >
            Wish List
          </button>

          <button
            type="submit"
            id=""
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            My orders
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
