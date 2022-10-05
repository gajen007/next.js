import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Link from 'next/link';
export default function AllShowings() {
    return(
    <>
        <NavBar></NavBar>
        <div>All showings as grid with clickable leads to single showing - showing id is the routing parameter</div>
    </>
    );
}