import logo from './logo.svg';
import './App.css';
import Modal from './Modal';
import React, { useState } from 'react';

function App() {

  let menus = ['Home', 'Shop', 'About'];
  let prices = [50, 55, 70];
  let products = ['역삼동원룸', '천호동원룸', '마포구원룸'];
  let content = [ 
  '침실만 따로 있는 공용 셰어하우스입니다. 최대 2인 가능',
  '2층 원룸입니다. 비올 때 물 가끔 들어오는거 빼면 좋아요',
  '살기 좋아요. 주변에 편의점 10개 넘어요.'
  ];
  let[report, setReport] = useState([0,0,0]);
  let [showModal, setShowModal] = useState(false);
  let [selectedIndex, setSelectedIndex] = useState(null);

  function onModal(index) {
    setSelectedIndex(index);
    // setShowModal(true);
    if(showModal===false){
      setShowModal(true);
    }else{
      setShowModal(false)
    }
  }
  function reportP(index){
    let newReport = [...report];
    newReport[index] = newReport[index]+1;
    setReport(newReport);
  }
  return (
    <div className="App">
      <div className="menu">
        {menus.map((x,index) =>(
          <div>
            <p>{x}</p>
          </div>
        ))}
      </div>

      <div className="products">
        {products.map((x,index) =>(
          <div>
            <p className='productsName' onClick={()=>onModal(index)}>{x}
              <span onClick={(e)=>{
                e.stopPropagation();
                reportP(index)}}>
                ☎️</span>{report[index]}
            </p>
            <p>{prices[index] + "만원"}</p>
          </div>
        ))}
      </div>
      {
      showModal && <Modal/>
      }
    </div>
  );
}

export default App;
