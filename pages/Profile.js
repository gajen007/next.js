import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Link from 'next/link';
export default function Profile() {
    return(
        <>
            <NavBar></NavBar>
            <div>Get user id via session check</div>
        </>
        );
}