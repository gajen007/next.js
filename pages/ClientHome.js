import ListingGrid from '../Components/ListingGrid.js';
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import NavBar from "../Components/NavBar";
import Link from 'next/link';

export default function ClientHome() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const fetchFunction = async () => {
      try {
        await axios
          .get('http://localhost:8000/api/allListings')
          .then(res => {
            setListings(res.data['listings']);
          });
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    }
    useEffect(() => {
      fetchFunction();
    }, []);
  
    return (
      <>
        <NavBar></NavBar>
        <div className="container mt-5">
          <div className="row">
            <div className='col-md-6'>
            <Link href="/home"><div className='btn btn-outline-primary d-block'>Grid View</div></Link>
            </div>
            <div className='col-md-6'>
              <Link href="/mapview"><div className='btn btn-outline-primary d-block'>Map View</div></Link>
            </div>
          </div>
  
          <div className='mt-3'>
            {
              loading ?
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {
                    listings.map((item) => {
                      return (
                        <ListingGrid
                          key={item.mlsnumber}
                          mlsnumber={item.mlsnumber}
                          price={item.price}
                          address={item.address}
                          latitude={item.latitude}
                          longitude={item.longitude}
                          bedrooms={item.bedrooms}
                          washrooms={item.washrooms}
                        />
                      );
                    })
                  }
                </div>
                : <center><Spinner animation="grow" /></center>
            }
          </div>
  
        </div>
      </>
    );
}