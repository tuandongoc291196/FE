import React, { useEffect, useRef, useState } from 'react'
import "./Header.css";
import NavSearching from '../../pages/NavSearching/NavSearching';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../../../redux/apiRequest';


interface HeaderProps {
    isModalVisible: boolean;
    setModalVisible: (isVisible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isModalVisible, setModalVisible }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState<string>("display-none");
    const user = useSelector((state: any) => state.auth.login.currentUser);

    const navItemRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseOver = (event: MouseEvent) => {
            const target = event.target as Node;
            if (navItemRef.current?.contains(target) || modalRef.current?.contains(target)) {
                setModalVisible(true);
            } else {
                setModalVisible(false);
            }
        };

        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [setModalVisible]);

    const logoutHandler = () => {
        logoutUser(dispatch, navigate)
    }

    return (
        <div id="Header">
            <div className="header-left">
                <div className="header-icon">
                    Wedding
                </div>
                {
                    (user == null) ? (
                        <nav className="nav-bar">
                            <ul className="nav-list">
                                <li className="nav-item">trang chủ</li>
                                <li className="nav-item">
                                    <div id='IsSearch' ref={navItemRef}>dịch vụ</div>
                                </li>
                            </ul>
                        </nav>
                    )
                        :
                        (
                            <nav className="nav-bar">
                                <ul className="nav-list">
                                    <li className="nav-item" onClick={() => { navigate("/") }}>trang chủ</li>
                                    <li className="nav-item" onClick={() => { navigate("/staff") }}>nhân viên</li>
                                    <li className="nav-item" onClick={() => { navigate("/supplier") }}>nhà cung cấp</li>
                                    <li className="nav-item" onClick={() => { navigate("/couple") }}>khách hàng</li>
                                </ul>
                            </nav>
                        )
                }

            </div>
            {
                (user == null) ?
                    (<div className="header-right">
                        <nav className="nav-auth">
                            <ul className="nav-auth-list">
                                <li className="nav-auth-item" onClick={() => { navigate("/login") }}>Đăng nhập</li>
                                <li className="nav-auth-item" onClick={() => { navigate("/login") }}>Đăng ký</li>
                            </ul>
                        </nav>
                    </div>)
                    : (
                        <div className="header-right">
                            <div className='navlink user-wrap' onClick={(e) => {
                                e.stopPropagation();
                                (show == "") ?
                                    setShow("display-none")
                                    : setShow("")
                            }}>
                                <div className="flex-css relative hover-primary">
                                    <div className='user-name'>{user?.email}</div>
                                    <img className='avt' src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="" />
                                </div>
                                <div className={`user-option ${show}`}>
                                    <div className="user-info">
                                        <img src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="user-avt" className='user-info-avt' />
                                        <div className='block'>
                                            <span className='user-info-name'>{user?.name}</span>
                                            <span className='user-info-email'>{user?.email}</span>
                                        </div>
                                    </div>
                                    <div className="dropdown-option" onClick={() => { navigate("/profile") }} style={{ color: "var(--black-color)" }}>
                                        <FontAwesomeIcon icon={faAddressCard} className="icon" />
                                        Profile
                                    </div>
                                    <div className="dropdown-option" onClick={logoutHandler}>
                                        <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                        Sign out
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }

            {isModalVisible && (
                <div id="Modal" ref={modalRef} style={{ position: 'absolute' }}>
                    <NavSearching />
                </div>
            )}
        </div>
    )
}

export default Header