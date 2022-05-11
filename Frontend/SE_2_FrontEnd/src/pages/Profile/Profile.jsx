import React, { useState } from "react";
import { FaEdit, FaWindows } from "react-icons/fa";
import "./Profile.css";
const Profile = () => {
  const [firstName, setFirstName] = useState("Value From Database");
  const [lastName, setLastName] = useState("Value From Database");
  const [email, setEmail] = useState("Value From Database");
  const [dob, setDob] = useState("04-05-2000");
  const [phone, setPhone] = useState("0000000000");
  const [address, setAddress] = useState("Value From Database");

  const [editable, setEditable] = useState(false);
  const editfunc = () => {
    setEditable(true);
  };
  const validatesunc = () => {
    if(firstName.length == 0)
    {
        alert("FirstName required")
    }
    if(lastName.length == 0)
    {
        alert("LastName required")
    }
    var mailformat =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(!(email.match(mailformat)))
{
alert("You have entered an Invalid email address!"); 
}
    if(!(phone.length==10))
    {
        alert("Invalid Phone Number...!")
    }


  };
  return (
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
              onChange={(e) => {
                e.preventDefault();
                setFirstName(e.target.value);
              }}
              defaultValue={firstName}
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
              onChange={(e) => {
                e.preventDefault();
                setLastName(e.target.value);
              }}
              defaultValue={lastName}
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
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              defaultValue={email}
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
              onChange={(e) => {
                e.preventDefault();
                setPhone(e.target.value);
              }}
              defaultValue={phone}
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
              onChange={(e) => {
                e.preventDefault();
                setAddress(e.target.value);
              }}
              defaultValue={address}
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
              onChange={(e) => {
                e.preventDefault();
                setDob(e.target.value);
              }}
              defaultValue={2012-3-23}    
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
            }}
          >
            My Cart
          </button>

          <button
            type="submit"
            id=""
            onClick={(event) => {
              event.preventDefault();
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
  );
};

export default Profile;
