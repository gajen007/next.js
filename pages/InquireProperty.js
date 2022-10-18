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
        //inner "query" is IMPORTANT
        query: `query {
          getSingleInquiryOfUserAndMLSnumber(userID:"`+loggedInUserID+`",mlsNo:"`+router.query.mlsNumber+`") {
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
      }
    });
  };

  useEffect(() => { fetchFunction(); }, []);

  const feedChat = (e) => {
    e.preventDefault();
    var toServer = new FormData();
    toServer.append('mlsNumber', router.query.mlsNumber);
    toServer.append('chatMessage', typedText);
    toServer.append('loggedInUserName', loggedInUserName);
    if (typedText !== null && typedText !== "") {
      fetch("http://localhost:8000/api/feedInquiryChatByClient", {
        method: 'POST',
        body: toServer,
        mode: 'cors',
        cache: 'no-cache'
      }).then(async response => {
        try {
          const data = await response.json()
          console.log('response data', data);
          return data;
        } catch (error) {
          console.log('Error happened here!')
          console.error(error)
        }
      })
        .then(data => {
          //How to empty a "state value" after render
          if (!data.result) {
            alert(data.message);
          } else {
            placeChat("");
            document.getElementById("chatBox").value = "";
            setFetchRequestState(fetchRequestState+1);
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Reloading");
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
                      key={item.id}
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

    // //API response
    // //[
    //     {
    //     "id":1,
    //     "mlsNumber":"W5715268",
    //     "senderID":2,
    //     "receiverID":1,
    //     "chatMessage":"Hi, How old this Property is?",
    //     "created_at":"2022-08-27T14:04:13.000000Z",
    //     "updated_at":"2022-08-27T14:04:13.000000Z"
    //     },
    //     {"id":2,
    //     "mlsNumber":"W5715268",
    //     "senderID":1,
    //     "receiverID":2,
    //     "chatMessage":"10 years. Wanna buy this property..?",
    //     "created_at":"2022-08-27T14:05:55.000000Z",
    //     "updated_at":"2022-08-27T14:05:55.000000Z"
    //     }
    // ]
