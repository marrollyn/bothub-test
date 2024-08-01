import React, { useState } from 'react';
import './Header.css'; // Импортируйте стили
import arrowIcon from '../../assets/arrow_down_icon.svg';
import logo from "../../assets/logo.svg"
import langIcon from "../../assets/lang_icon.svg"

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header>
            <a className="header-logo" href="#0">
                <img className="header-logo-img" 
                alt="logo"
                src={logo}
                />
            </a>
            {/* Десктопное меню */}
            <nav className="desktop-nav">
                <ul>                    
                    <li onClick={toggleDropdown}>
                        <a>Продукты  <img src={arrowIcon} alt="Arrow Icon" width="16" height="16" className={isDropdownOpen ? 'rotate' : ''}  /></a>
                        {isDropdownOpen && (
                            <ul className="dropdown">
                                <li><a href="#service1">Услуга 1</a></li>
                                <li><a href="#service2">Услуга 2</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="#contact">Пакеты</a></li>
                    <li><a href="#about">API</a></li>
                    <li><a href="#about">Блог</a></li>
                </ul>
                <ul>
                <li onClick={toggleDropdown}>
                        <a><img src={langIcon} alt="Language Icon" width="16" height="16"/>RU<img src={arrowIcon} alt="Arrow Icon" width="16" height="16" className={isDropdownOpen ? 'rotate' : ''} /></a>
                        {isDropdownOpen && (
                            <ul className="dropdown">
                                <li><a href="#ru">RU</a></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button>Авторизация</button>
                    </li>
                </ul>
            </nav>

            {/* Мобильное меню */}
            <div className="mobile-header">
                <button onClick={toggleMobileMenu}>Меню</button>
                {isMobileMenuOpen && (
                    <ul className="mobile-nav">
                        <li><a href="#home">Главная</a></li>
                        <li><a href="#about">О нас</a></li>
                        <li onClick={toggleDropdown}>
                            <span>Услуги</span>
                            {isDropdownOpen && (
                                <ul className="dropdown">
                                    <li><a href="#service1">Услуга 1</a></li>
                                    <li><a href="#service2">Услуга 2</a></li>
                                </ul>
                            )}
                        </li>
                        <li><a href="#contact">Контакты</a></li>
                    </ul>
                )}
            </div>
        </header>
    );
};

