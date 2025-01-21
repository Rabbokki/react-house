import "./App.css";
import { Fragment, useState } from "react";
import roomsData from "./oneroom";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./user/Signup"
import Login from "./user/Login";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/signup" element={<Signup users={users} setUsers={setUsers} />} />
        
        <Route path="/login" element={<Login users = {users} />} />
        
        <Route path="/" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

function AppContent() {
  let navigate = useNavigate(); // useNavigate 훅 사용
  const [menu, setMenu] = useState(["Home", "Shop", "About"]);
  const [subMenu, setSubMenu] = useState(["회원가입","로그인"]);
  const [roomsInfo, setRoomsInfo] = useState(roomsData);

  let [showModal, setShowModal] = useState(false);

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

  return (
    <div className="App">
      <div className="menu">
        {menu.map((x) => {
          return <a href="#" key={x}>{x}</a>;
        })}
      {subMenu.map((x)=>{
        return <a onClick={()=>{
          if(x==="회원가입"){
            navigate("/signup");
          }else if(x==="로그인"){
            navigate("/login");
          }
        }} key={x}>{x}</a>;
      })}
      </div>

      {/* 라우터 설정 */}
      <Routes>
        <Route path="/signup" index element = {<Signup/>}></Route>
        <Route path="/login" element = {<Login/>}></Route>
      </Routes>

      <div className="sortMenu">
        처음처럼 <button onClick={resetRoomsInfo}>🌭</button>
        가격 <button onClick={priceSortUp}>▲</button>
        <button onClick={priceSortDown}>▼</button>
        물건명 <button onClick={productNameSortUp}>▲</button>
        <button onClick={productNameSortDown}>▼</button>
      </div>

      <div>
        {showModal === true ? (
          <Modal
            currentIndex={currentIndex}
            roomsInfo={roomsInfo}
            setShowModal={setShowModal}
          />
        ) : null}
      </div>

      <div className="content">
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
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Modal(props) {
  let room = props.roomsInfo[props.currentIndex];
  return (
    <div className="black-bg">
      <div className="white-bg">
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
        <div className="modal-img">
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

  let navigate = useNavigate(); // useNavigate 훅 사용

  return (
    <div>
      <h4
        onClick={() => {
          navigate(`/detail/${rooms[i].id}`); // 클릭 시 해당 상품 상세 페이지로 이동
        }}
      >
        {rooms[i].title}
      </h4>
      <p>{strPrice}만원</p>
      <div className="imgBox">
        <img src={rooms[i].image} className="room-img" alt="room" />
      </div>
    </div>
  );
};

export default App;
