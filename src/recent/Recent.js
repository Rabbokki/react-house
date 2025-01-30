import { Fragment, useState,useEffect } from "react";


function Recent() {
    const [parsedRooms, setParsedRooms] = useState([]);
    
    useEffect(()=>{
        try {
            let recentRoom = localStorage.getItem("localRoom"); // 키 값 명시
            let rooms = recentRoom ? JSON.parse(recentRoom) : [];
            setParsedRooms(rooms.reverse());
        } catch (error) {
            console.error("localStorage 데이터 파싱 오류:", error);
            setParsedRooms([]);
        }

        function roomsSort(){
            const temp = [...parsedRooms];
            temp.sort((x,y)=> x[0] - y[0]);
            setParsedRooms(temp);
        }
    },[])

    return (
        <div>
            <h3>최근 본 목록</h3>
            <ul>
                {parsedRooms.length > 0 ? (
                    parsedRooms.map((room, index) => (
                        <li key={index}>
                            <img src={room.roomImg} alt="room" width="100px" />
                            <p>{room.roomTitle}</p>
                            <p>{room.price}만원</p>
                        </li>
                    ))
                ) : (
                    <p>최근 본 매물이 없습니다.</p>
                )}
            </ul>
        </div>
    );
}

export default Recent;
