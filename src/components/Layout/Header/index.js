import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'antd';
import MenuDropDown from '../components/MenuDropDown/MenuDropDown';
import WorkspaceDropDown from '../components/WorkspaceDropDown/WorkspaceDropDown';
import CardModal from '../components/CardModel/CardModal';
import NotificationDropDown from '../components/NotificationDropDown/NotificationDropDown';

const cx = classNames.bind(styles);

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={cx('sticky')}>
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div
                        className={cx('workspace')}
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        <img className={cx('logo')} src={images.logo} alt="Tinamys logo" />

                        <WorkspaceDropDown />

                        <div className={cx('add-quick-card-btn')}>
                            <Button type="primary" onClick={showModal}>
                                Tạo nhanh
                            </Button>
                            <CardModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                        </div>
                    </div>

                    <div className={cx('action')}>
                        <div className={cx('action-item')}>
                            <img src={images.search} alt="search" />
                        </div>
                        <div
                            className={cx('action-item')}
                            onClick={() => {
                                navigate('./tutorial');
                            }}
                        >
                            <img src={images.graduate} alt="graduate" />
                        </div>

                        <div className={cx('action-item')}>
                            <NotificationDropDown>
                                <img src={images.bell} alt="bell" />
                            </NotificationDropDown>
                        </div>
                        <div className={cx('action-item')}>
                            <img src={images.question} alt="question" />
                        </div>
                        <div className={cx('action-item')}>
                            <img src={images.creditCard} alt="creditCard" />
                        </div>
                        <div className={cx('action-item')}>
                            <MenuDropDown />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
