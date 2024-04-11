import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets';

import { useState } from 'react';
import { Modal, Button } from 'antd';
import { UserContext } from '~/context/UserContext';
import MenuDropDown from '../MenuDropDown/MenuDropDown';
import WorkspaceDropDown from '../WorkspaceDropDown/WorkspaceDropDown';

const cx = classNames.bind(styles);

function Header() {
    const { user, logout } = useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('workspace')}>
                    <img className={cx('logo')} src={images.logo} alt="Tinamys logo" />

                    <WorkspaceDropDown />

                    <div className={cx('add-quick-card-btn')}>
                        <Button type="primary" onClick={showModal}>
                            Tạo nhanh
                        </Button>
                        <Modal
                            wrapClassName="modal-portal"
                            title={
                                <div className={cx('title-wrap__modal-portal ')}>
                                    <div className={cx('title__modal-portal')}>Tạo thẻ nhanh</div>
                                </div>
                            }
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={410}
                            className="add-quick-card-modal"
                            footer={[
                                <Button key="submit" type="primary" onClick={handleOk}>
                                    Thêm thẻ
                                </Button>,
                            ]}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </div>
                </div>

                <div className={cx('action')}>
                    <div className={cx('action-item')}>
                        <img src={images.search} alt="search" />
                    </div>
                    <div className={cx('action-item')}>
                        <img src={images.graduate} alt="graduate" />
                    </div>
                    <div className={cx('action-item')}>
                        <img src={images.bell} alt="bell" />
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
    );
}

export default Header;
