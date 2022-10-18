import React, { useEffect, useState } from "react";
import Link from 'next/link';
//import sampleMap from "../Images/map.png";
import NavBar from "../Components/NavBar";
//import MapV2 from "../Components/MapV2";
//import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router'
import axios from "axios";

function SingleListing() {
  const router = useRouter();
  // localStorage.setItem("likes","");
  const [jsonData, setJsonData] = useState({});
  const fetchFunction = async () => {
    try {
      await axios({
        url: 'http://localhost:8081/graphql',
        method: 'POST',
        data: {
          //inner "query" is IMPORTANT
          query: `query {
            getThisListingByMLSnumber(mlsNo:"`+router.query.mlsNumber+`"){
              address
              bedrooms
              washrooms
              price
              mlsnumber
            }
          }
          `
        }
      }).then((result) => {
        setJsonData(result.data.data.getThisListingByMLSnumber);
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  useEffect(() => { fetchFunction(); }, []);
  
  return (
    <React.Fragment>
    <NavBar></NavBar>
    <div className="container mt-2">
    <div className="card border border-dark">
    <div className="card-header bg-dark text-white" align="center">
    <div className="row align-items-center">
    <div className="col-md-8 fw-bolder">
    {"MLS Number : " + jsonData.mlsnumber}
    </div>
    <div className="col-md-4 mt-2">
    <Link href="/"><div className="btn btn-primary form-control">Home</div></Link>
    </div>
    </div>
    
    </div>
    <div className="card-body">
    <div className="row ">
    <div className="col-md-7">
    <center>
    <div>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
    <div className="carousel-item active ">
    <img src="https://image.ibb.co/k0wVTm/profile_pic.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
    <img src="https://image.ibb.co/jOzeUG/luke_1.jpg" className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
    <img src="https://image.ibb.co/cBZPww/bane_1.jpg" className="d-block w-100" alt="..." />
    </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
    </button>
    </div>
    </div>
    </center>
    
    </div>
    <div className="col-md-5">
    <div className="table-responsive">
    <table className="table table-hover">
    <tbody>
    <tr>
    <th scope="row">Address</th>
    <td>{jsonData.address}</td>
    </tr>
    <tr>
    <th scope="row">Bedrooms</th>
    <td>{jsonData.bedrooms}</td>
    </tr>
    <tr>
    <th scope="row">Washrooms</th>
    <td>{jsonData.washrooms}</td>
    </tr>
    <tr>
    <th scope="row">Price</th>
    <td>{jsonData.price}</td>
    </tr>
    </tbody>
    </table>
    <div style={{ "overflow": "auto", "height": "40vh" }}>
    
    </div>
    <div className="btn btn-warning form-control mt-2" >Request</div>
    {/* <button onClick={
      ()=>{
        var text=localStorage.getItem("likes");
        localStorage.setItem("likes",text+","+jsonData.mlsnumber);
        console.log(jsonData.mlsnumber)}
      } className="btn btn-danger form-control mt-2" >Add to Favourites</button> */
    }
    
    <a className="btn btn-success form-control mt-2">Share</a>
    <Link href={"/InquiryProperty/" + jsonData.mlsnumber}>
    <button className="btn btn-primary form-control mt-2" >Enquiry</button>
    </Link>
    
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </React.Fragment>
    );
  }
  
  export default SingleListing;
  