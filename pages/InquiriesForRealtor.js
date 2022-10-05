import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Link from 'next/link';
export default function InquiriesForRealtor() {
    return(
        <>
            <NavBar></NavBar>
            <div>All Inquiries from clients as grid with clickable leads to single chat with client - inquiry-id is the routing parameter</div>
        </>
        );
}