import React, { useEffect, useRef, useState } from 'react'
import "./Header.css";
import NavSearching from '../../pages/NavSearching/NavSearching';

interface HeaderProps {
    isModalVisible: boolean;
    setModalVisible: (isVisible: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isModalVisible, setModalVisible }) => {

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

    return (
        <div id="Header">
            <div className="header-left">
                <div className="header-icon">
                    <img src="https://www.weddingwire.com/assets/img/logos/gen_logoHeader.svg" alt="" />
                </div>
                <nav className="nav-bar">
                    <ul className="nav-list">
                        <li className="nav-item">trang chủ</li>
                        <li className="nav-item">
                            <div id='IsSearch' ref={navItemRef}>dịch vụ</div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <nav className="nav-auth">
                    <ul className="nav-auth-list">
                        <li className="nav-auth-item">Đăng nhập</li>
                        <li className="nav-auth-item">Đăng ký</li>
                    </ul>
                </nav>
            </div>
            {isModalVisible && (
                <div id="Modal" ref={modalRef} style={{ position: 'absolute'}}>
                    <NavSearching/>
                </div>
            )}
        </div>
    )
}

export default Header