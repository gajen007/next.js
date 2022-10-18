import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import NavBar from "../Components/NavBar";
import ChatGrid from "../Components/ChatGrid";
import { useRouter } from 'next/router'
import axios from "axios";

export default function InquireProperty() {
  const router = useRouter();
  const [typedText, placeChat] = useState("");
  const [chats, fillChats] = useState([]);
  const [receiverID,setReceiverID] = useState("");
  const [fetchRequestState, setFetchRequestState]=useState(1);

  //let realtorSuit = JSON.parse(localStorage.getItem("realtorSuit"));
  //var loggedInUserName=realtorSuit['userName'];
  var loggedInUserName="client@gmail.com";
  var loggedInUserID="2";
  
  const fetchFunction = async()=>{
    await axios({
      url: 'http://localhost:8081/graphql',
      method: 'POST',
      data: {
        //inner "query" is IMPORTANT because this is similar with GET
        query: `query {
          getSingleInquiryOfUserAndMLSnumber(userID:"`+loggedInUserID+`",mlsNo:"`+router.query.mlsNumber+`") {
            _id
            senderID
            receiverID
            chatMessage
            created_at
            }
          }
          `
      }
    }).then((result) => {
      if(result.data.data.getSingleInquiryOfUserAndMLSnumber.length>0){
        fillChats(result.data.data.getSingleInquiryOfUserAndMLSnumber);
        result.data.data.getSingleInquiryOfUserAndMLSnumber.forEach(function(ele){
          if (ele.senderID==loggedInUserID) {
            setReceiverID(ele.receiverID);
          }
        })
      }
    });
  };

  useEffect(() => { fetchFunction(); }, [fetchRequestState]);

  const feedChat = (e) => {
    e.preventDefault();
    if (typedText !== null && typedText !== "") {
          axios({
            url: 'http://localhost:8081/graphql',
            method: 'POST',
            data: {
              query: `mutation {
                feedInquiryChatByClient(chatMessage:"`+typedText+`",senderID:"`+loggedInUserID+`",receiverID:"`+receiverID+`",
                mlsNo:"`+router.query.mlsNumber+`") {
                  _id
                  senderID
                  receiverID
                  chatMessage
                  created_at
                  }
                }
                `
            }
          }).then((result) => {
            placeChat("");
            document.getElementById("chatBox").value = "";
            setFetchRequestState(fetchRequestState+1);
          }).catch((ex)=>{
            console.log(ex);
          });
    }
    else {
      alert("Type something...");
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">
            <div id="messageBody" style={{ "height": "70vh", "overflow": "auto", "overflowX": "hidden" }} className="border border-dark rounded ">
              {
                chats.map((item) => {
                  return (
                    <ChatGrid
                      key={item._id}
                      chatMessage={item.chatMessage}
                      sentTime={item.created_at}
                      senderID={item.senderID}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={feedChat}>
              <div className="row mt-2">
                <div className="col-md-10">
                  <input id="chatBox" className="form-control" onChange={
                    (e) => placeChat(e.target.value)
                  } placeholder="Message"></input>
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-outline-primary form-control ">
                    <FontAwesomeIcon icon={faPaperPlane} /> &nbsp;
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}