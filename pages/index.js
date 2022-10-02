//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import Login from "./Login"
import HomePage from "./HomePage"
import { authenticate } from "../Components/Service"
export default function Home() {
    if(authenticate!==null){
      return (<HomePage/>);
    }
    else{
      return (<Login/>);
    }
}
