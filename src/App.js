import styles from "./css/App.module.css";
import { Fragment, useState,useEffect } from "react";
import roomsData from "./oneroom";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./user/Signup"
import Login from "./user/Login";
import Recent from "./recent/Recent"
import BookMark from "./bookMark/BookMark"

function App() {
  const [users, setUsers] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToSignup/>}/>
        <Route path="/signup" element={<Signup users={users} setUsers={setUsers} />} />
        
        <Route path="/login" element={<Login users = {users} />} />
        
        <Route path="/content" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

function RedirectToSignup() {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [navigate]);

  return null; 
}

function AppContent() {
  let navigate = useNavigate(); 
  
  const [menu, setMenu] = useState(["Home", "Shop", "About"]);
  const [subMenu, setSubMenu] = useState(["로그아웃"]);
  const [roomsInfo, setRoomsInfo] = useState(roomsData);

  let [showModal, setShowModal] = useState(false);
  const [recent, setRecent] = useState(false);
  const [bookMark, setBookMark] = useState([]);
  const [bookMarks, setBookMarks] = useState(false);

  const stateBook = ()=>{
    setBookMarks(!bookMarks);
  }

  const recentAble = ()=>{
    setRecent(!recent);
  }

  const [bad, setBad] = useState([0, 0, 0]);

  const [currentIndex, setCurrentIndex] = useState(-1);

  function priceSortUp() {
    const tempRoom = [...roomsInfo];
    tempRoom.sort((x, y) => y.price - x.price);
    setRoomsInfo(tempRoom);
  }

  function priceSortDown() {
    const tempRoom = [...roomsInfo];
    tempRoom.sort((x, y) => x.price - y.price);
    setRoomsInfo(tempRoom);
  }

  function productNameSortUp() {
    const tempRoom = [...roomsInfo];
    tempRoom.sort((x, y) => {
      if (x.title > y.title) return 1;
      if (x.title < y.title) return -1;
      else return 0;
    });
    setRoomsInfo(tempRoom);
  }

  function productNameSortDown() {
    const tempRoom = [...roomsInfo];
    tempRoom.sort((x, y) => {
      if (x.title > y.title) return -1;
      if (x.title < y.title) return 1;
      else return 0;
    });
    setRoomsInfo(tempRoom);
  }

  function resetRoomsInfo() {
    setRoomsInfo(roomsData);
  }

  useEffect(()=>{
    localStorage.setItem("bookMark", JSON.stringify(bookMark));
  },[bookMark]);

  useEffect(()=>{
    const localBookmark = localStorage.getItem("bookMark");
    if(localBookmark){
      try{
        const parsedBm = JSON.parse(localBookmark);
        setBookMark(Array.isArray(parsedBm) ? parsedBm : [])
      }catch(error){
        console.log("에러",error);
        setBookMark([]);
      }
      
    }
  },[])
  

  function bookMarkRoom(room) {
    setBookMark((prevBookMark) => {
      const isBookmarked = prevBookMark.some((x) => x.id === room.id);
      if (isBookmarked) {
        return prevBookMark.filter((x) => x.id !== room.id);
      } else {
        return [...prevBookMark, room];
      }
    });
  }
  

  

  return (
    <div className={styles.App}>
      <div className={styles.menu}>
        {menu.map((x) => {
          return <a href="#" key={x}>{x}</a>;
        })}
      <div>
      {subMenu.map((x)=>{
        return <a onClick={()=>{
          if(x==="회원가입"){
            navigate("/signup");
          }else if(x==="로그인"){
            navigate("/login");
          }else if(x==="로그아웃"){
            navigate("/login");
          }
        }} key={x}>{x}</a>;
      })}

      </div>
      </div>

      {/* 라우터 설정 */}
      {/* <Routes>
        <Route path="/signup" index element = {<Signup/>}></Route>
        <Route path="/login" element = {<Login/>}></Route>
      </Routes> */}

<div className={styles.sortMenu}>
  <ul>
    <li>
      처음처럼 <button onClick={resetRoomsInfo}>🌭</button>
    </li>
    <li>
      가격 <button onClick={priceSortUp}>▲</button>
      <button onClick={priceSortDown}>▼</button>
    </li>
    <li>
      물건명 <button onClick={productNameSortUp}>▲</button>
      <button onClick={productNameSortDown}>▼</button>
    </li>
    <li>
      최근 본 매물<button
      onClick={recentAble}>🎈</button>
    </li>
    <li>
      찜 목록<button
      onClick={stateBook}>🖤</button>
      
    </li>
  </ul>
</div>
        {
          bookMarks ? (
            <BookMark bookMark={bookMark} />
          ): (
            <div className={styles.content}>
              {roomsInfo.map((x, index) => {
              return (
                <div key={x.id}>
                  <Room
                    roomsInfo={roomsInfo}
                    setBad={setBad}
                    index={index}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    bookMarkRoom={bookMarkRoom}
                  />
                </div>
              );
            })}
            </div>
          )
        }
        {recent ? (
          <Recent/>
        ):(
              <div className={styles.content}>
            {roomsInfo.map((x, index) => {
              return (
                <div key={x.id}>
                  <Room
                    roomsInfo={roomsInfo}
                    setBad={setBad}
                    index={index}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    bookMarkRoom={bookMarkRoom}
                  />
                </div>
              );
            })}
          </div>

        )
        }
        {
          
        }
        

      <div>
        {showModal === true ? (
          <Modal
            currentIndex={currentIndex}
            roomsInfo={roomsInfo}
            setShowModal={setShowModal}
          />
        ) : null}
      </div>

      
    </div>
  );
}

function Modal(props) {
  let room = props.roomsInfo[props.currentIndex];
  return (
    <div className={styles["black-bg"]}>
      <div className={styles["white-bg"]}>
        <h4>{room.title}</h4>
        <p>{room.content}</p>
        <p>가격 : {room.price}</p>
        <button
          onClick={() => {
            props.setShowModal(false);
          }}
        >
          닫기
        </button>
        <div className={styles["modal-img"]}>
          <img src={room.image} width="400px" alt="room" />
        </div>
      </div>
    </div>
  );
}

const Room = (props) => {
  let rooms = props.roomsInfo;
  let i = props.index;
  let strPrice = rooms[i].price.toLocaleString("ko-KR");

  function toggleBookMark(){
    props.bookMarkRoom(rooms[i]);
  }

  const roomData = {
    roomImg : rooms[i].image,
    roomTitle : rooms[i].title,
    price : strPrice
  }

  function localRoom() {
    let savedRooms = [];
    try {
      const storedData = localStorage.getItem('localRoom');
      savedRooms = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error( error);
      savedRooms = []; 
    }
  
    if (Array.isArray(savedRooms)) {
      savedRooms.push(roomData);
      localStorage.setItem('localRoom', JSON.stringify(savedRooms));
      console.log(savedRooms);
    } else {
      console.error("배열 아님");
    }
  
    props.setCurrentIndex(i);
    props.setShowModal(true);
  }
  let navigate = useNavigate(); // useNavigate 훅 사용


  return (
    <div>
      <h4
        onClick={() => {
          localRoom();
          // navigate(`/detail/${rooms[i].id}`); // 클릭 시 해당 상품 상세 페이지로 이동
        }}
      >
      <div className={styles["imgBox"]}>
        <img src={rooms[i].image} className={styles["room-img"]}  alt="room" />
      </div>
        {rooms[i].title}
      </h4>
      <p>{strPrice}만원 </p>
        <p onClick={toggleBookMark}> 찜💛 </p> 
    </div>
  );
};

export default App;
