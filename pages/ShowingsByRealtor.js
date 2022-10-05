import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Link from 'next/link';
export default function ShowingsByRealtor() {
    return(
        <>
            <NavBar></NavBar>
            <div>For client; All showings for single client as grid with clickable leads to single showing - get client id via session check</div>
        </>
        );
}