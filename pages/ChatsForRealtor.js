import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Link from 'next/link';
export default function ChatsForRealtor() {
    return(
        <>
            <NavBar></NavBar>
            <div>All Chats from clients as grid with clickable leads to single chat with client - client id is the routing parameter</div>
        </>
        );
}