import { faPersonHalfDress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import "./NavSearching.css";
import { useNavigate } from 'react-router';
const NavSearching = () => {
  const navigate = useNavigate();

  return (
    <div id='NavSearching'>
      <h2>Tìm kiếm nhà cung cấp cho bạn</h2>
      <ul className="vendor-list">
        <li className="vendor-item">
          <img className='vendor-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSww9HjKznDB3Fq-NgA_YXXp4KL39e7I3ghQ&s" alt="" />
          Đồ cưới
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://cdn.iconscout.com/icon/free/png-256/free-wedding-ring-1411380-1192859.png?f=webp" alt="" />
          Nhẫn cưới
        </li>
        <li className="vendor-item" onClick={() => { navigate("/photographer") }}>
          <img className='vendor-img' src="https://cdn3.iconfinder.com/data/icons/wedding-love/64/wedding-photography-camera-love-photo-512.png" alt="" />
          Chụp hình
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReDVUUM52o9C-9oUVUuW6l_rRHgqpdCG9JUQ&s" alt="" />
          Địa điểm tổ chức
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://cdn-icons-png.freepik.com/512/104/104471.png" alt="" />
          Thiệp mời
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/wedding-gift-3842622-3190391.png" alt="" />
          Lễ vật
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDmzg5K4bbnIlob6SB2zFzlmcB9WRScV4R6A&s" alt="" />
          Xe đón dâu
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKSV4hES-9kCuXRpShL4ThzMtTzPtOLzC2pQ&s" alt="" />
          Cổng cưới
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/wedding-place-1411362-1192841.png" alt="" />
          Gia tiên
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://cdn0.iconfinder.com/data/icons/love-and-wedding-28/520/1580_Music_Note_Wedding_Love-512.png" alt="" />
          Âm thanh
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://cdn-icons-png.freepik.com/512/3438/3438128.png" alt="" />
          Ăn uống
        </li>
        <li className="vendor-item">
          <img className='vendor-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS85U5US0cu3mQuWLwwd0hOWeBYkw1l37EGBw&s" alt="" />
          Make up
        </li>
      </ul>
    </div>
  )
}



export default NavSearching