//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import Login from "./Login"
import ClientHome from "./ClientHome"
import RealtorHome from "./RealtorHome"
import UserData from "../Components/UserData"
export default function Home() {
    if(UserData!==null){
      if(UserData.userType=="realtor"){
        return (<RealtorHome/>);
      }
      else{
        return (<ClientHome/>);
      }
    }
    else{
      return (<Login/>);
    }
}
