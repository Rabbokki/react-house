import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import data from'./oneroom';
import Modal from './Modal';


function App() {
  const [product, setProduct] = useState(data);
  const [menu, setMenu] = 
    useState(['Home', 'Shop', 'About']);
  // const [prices, setPrices] = 
  //   useState([50, 55, 70]);
  // const [products, setProducts] = 
  //   useState(['역삼동원룸', '천호동원룸', '마포구원룸']);
  // const [content, setContent] = useState([
  //   '침실만 따로 있는 공용 셰어하우스입니다. 최대 2인 가능',
  //   '2층 원룸입니다. 비올 때 물 가끔 들어오는거 빼면 좋아요',
  //   '살기 좋아요. 주변에 편의점 10개 넘어요.'
  //   ]);

  let [showModal, setShowModal] = useState(false);

  const [bad, setBad] = useState([0,0,0]);
  
  const [currentIndex, setCurrentIndex] = 
      useState(-1);    

  return (
    <div className="App">
      <div className='menu'>
        {menu.map((x)=>{
          return (
            <a href="#">{x}</a>
          )
        })}
        
      </div>
      <div className='content'>
        {
          product.map((x, index)=>{
            
            return (
              <Room 
                img = {product[index].image}
                products={product[index].title} 
                prices={product[index].price} 
                index={index}
                bad={bad}
                setBad={setBad}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                showModal={showModal}
                setShowModal={setShowModal}
                />
            )
          })
        }
      </div>
      <div>
        { showModal == true ? 
          <Modal content={product[currentIndex].content}
          title = {product[currentIndex].title}
          price = {product[currentIndex].price}
          img = {product[currentIndex].image}
          />: null }  
      </div>
    </div>
  );
}


const Room = (props) => {
  // 좋아요 추가하는 함수
  function addCount(num) {
    // 1. 좋아요 배열을 복사
    let copyBad = [... props.bad];
    // 2. 사본에 해당 위치 + 1
    copyBad[num] = copyBad[num] + 1;
    // 3. setLike 함수로 수정
    props.setBad([...copyBad]);
  }

  return (
    <div>
      <img src={`${props.img}`} width='30%' />
      <h4 onClick={() => {
        // 현재 선택한 인덱스를 스테이트에 저장
        props.setCurrentIndex(props.index)

        if (props.currentIndex != props.index) {
          props.setShowModal(true);
        } else if(props.currentIndex == props.index 
          && props.showModal == false) {
            props.setShowModal(true);
        } else props.setShowModal(false);

      }}>
        {props.products}</h4>
      <p>{props.prices}원
      <span onClick={(e) => {
          e.stopPropagation();
          addCount(props.index)}}
          >☎ 허위매물신고</span>
        {props.bad[props.index]}
      </p>
    </div>
  );
};

export default App;