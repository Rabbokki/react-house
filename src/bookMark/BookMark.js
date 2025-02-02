function BookMark({ bookMark }) {
    const bookArr = Array.isArray(bookMark) ? bookMark : [];
    return (
      <div>
        <h3> 찜 목록 </h3>
        {bookArr.length === 0 ? (
          <p>찜 한 목록이 없습니다.</p>
        ) : (
          <ul>
            {bookArr.map((x) => {
              return (
                <li key={x.id}>
                  <img src={x.image} width="300px" alt="" />
                  <div>{x.title}</div>
                    <div>{x.price}만원</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
  
  export default BookMark;
  