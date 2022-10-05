import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faRightFromBracket, faComments, faCommentsDollar, faHome, faRightToBracket, faMap, faUser, faHouseUser } from '@fortawesome/free-solid-svg-icons'
// import { useState } from "react";
// import MapV2 from "../Components/MapV2";
import UserData from "./UserData"

function NavBar() {
    //const navigate = useNavigate();
    const logoutFunction = () => {
        alert("redirect to index page");
        //window.location.href="/";
    }
    // const [favourite, setFavourite]=useState(0);
    var count=0;
    var fav={"fav":[]};
    /*
    if(localStorage.getItem("favData")){
        count=JSON.parse(localStorage.getItem("favData"))["fav"].length;
    }else{
        localStorage.setItem("favData",JSON.stringify(fav));
    }
    */
    return (
        <>
            {/* <MapV2
                latitude={6.9270786}
                longitude={79.861243}
                text={"Raguraj"}
            ></MapV2> */}
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link href="/"><div className="navbar-brand text-white btn border border-dark"><FontAwesomeIcon icon={faHome} /></div></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link href="/Map"><div className="ml-auto btn btn-outline-info border-dark"><FontAwesomeIcon icon={faMap} /></div></Link>
                        {
                            (UserData.userType=="realtor")
                            ?
                            <>
                            <Link href="/InquiriesForRealtor">
                                <div className="ml-auto btn btn-outline-info border-dark">
                                    <FontAwesomeIcon icon={faCommentsDollar} />
                                </div>
                            </Link>

                            <Link href="/ChatsForRealtor">
                                <div className="ml-auto btn btn-outline-info border-dark">
                                    <FontAwesomeIcon icon={faComments} />
                                </div>
                            </Link>

                            <Link href="/AllShowings">
                                <div className="ml-auto btn btn-outline-info border-dark">
                                    <FontAwesomeIcon icon={faHouseUser} />
                                </div>
                            </Link>
                            </>
                            :
                            <>
                            <Link href="/InquiriesForClient">
                                <div className="ml-auto btn btn-outline-info border-dark">
                                    <FontAwesomeIcon icon={faCommentsDollar} />
                                </div>
                            </Link>

                            <Link href="/ChatWithRealtor">
                                <div className="ml-auto btn btn-outline-info border-dark">
                                    <FontAwesomeIcon icon={faComments} />
                                </div>
                            </Link>

                            <Link href="/ShowingsByRealtor">
                                <div className="ml-auto btn btn-outline-info border-dark">
                                    <FontAwesomeIcon icon={faHouseUser} />
                                </div>
                            </Link>
                            </>
                        }
                        <Link href="/Profile"><div className="ml-auto btn btn-outline-info border-dark"><FontAwesomeIcon icon={faUser} /></div></Link>
                        </ul>
                        {
                            (UserData!==null)
                                ?
                                <button onClick={logoutFunction} className="ml-auto btn btn-outline-warning border-dark"><FontAwesomeIcon icon={faRightFromBracket} /></button>
                                :
                                <Link href="/login">
                                    <div className="ml-auto btn btn-primary border-dark align-items-center"><FontAwesomeIcon icon={faRightToBracket} /> Login</div>
                                </Link>
                        }

                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavBar;