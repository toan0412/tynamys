import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets';

import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Dropdown, Space, Divider, Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/context/UserContext';

const { useToken } = theme;

const cx = classNames.bind(styles);

const items = [
    {
        key: '1',
        label: (
            <div className={cx('workspace-dropdown-item')}>
                <img
                    className={cx('logo-company')}
                    src="https://ui-avatars.com/api/?size=256&fontSize=0.5&length=2&name=a&rounded=false&bold=false&background=00897b&color=FFFFFF&uppercase=true&format=png"
                    alt="logo company"
                />
                <span>adu a toàn</span>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
];
function Header() {
    const { user, logout } = useContext(UserContext);

    const { token } = useToken();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/login');
    };

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: 'none',
    };

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
                    <Dropdown
                        className={cx('header-dropdown')}
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        dropdownRender={(menu) => (
                            <div style={contentStyle}>
                                {React.cloneElement(menu, {
                                    style: menuStyle,
                                })}
                                <Divider
                                    style={{
                                        margin: 0,
                                    }}
                                />
                                <Space
                                    style={{
                                        padding: 4,
                                    }}
                                >
                                    <Button type="primary" ghost>
                                        <FontAwesomeIcon icon={faAdd} />
                                        <span>Tạo không gian làm việc</span>
                                    </Button>
                                </Space>
                            </div>
                        )}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Không gian làm việc
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
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
                    <div className={cx('avatar')}>
                        <button onClick={() => handleLogOut()}>
                            {user && user.auth ? <img src={user.userInfo.avatarUrl} alt="avatar" /> : <div>as</div>}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
