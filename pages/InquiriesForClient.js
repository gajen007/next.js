import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Link from 'next/link';
import axios from "axios";
export default function InquiriesForClient() {
    const [inquiries, fillInquiries] = useState([]);
    //let realtorSuit = JSON.parse(localStorage.getItem("realtorSuit"));
    //var loggedInUserName = realtorSuit['userName'];
    var loggedInUserName = "client@gmail.com";
    
    const fetchFunction = async () => {
        try {
          await axios
            .get("http://localhost:8000/api/allInquiriesOfClient?loggedInUserName=" + loggedInUserName)
            .then(res => {
                fillInquiries(res.data);
            });
        } catch (e) {
          console.log(e);
        }
      }
      useEffect(() => {
        fetchFunction();
      }, []);

    return (
        <React.Fragment>
            <NavBar></NavBar>
            <div className="container mt-4">
                <h4>Enquiries</h4>
                <div className="row">
                    <div className="col-md-12">
                        {
                            inquiries.map((item) => {
                                return (
                                    <React.Fragment key={item.mlsnumber}>
                                        <div className="card my-2">
                                            <div className="card-header">
                                                {item.mlsnumber}
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        {item.address}
                                                    </div>
                                                    <div className="col-md-6">
                                                        {item.created_at}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <Link href={"/InquireProperty?mlsNumber="+item.mlsnumber}>
                                                    <div className="btn btn-primary form-control">
                                                        Continue Chat
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}