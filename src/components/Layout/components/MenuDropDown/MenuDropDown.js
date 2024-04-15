import { UserContext } from '~/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuDropDown.module.scss';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Avatar, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuDropDown() {
    const { user, logout } = useContext(UserContext);
    const [profile, setProfile] = useState(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('userInfo');
        setProfile(JSON.parse(data));
    }, []);

    const handleLogOut = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <Dropdown
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
                overlay={
                    <Menu className={cx('menu-dropdown')}>
                        <Menu.Item key="profile" className={cx('menu-dropdown-header')}>
                            <Avatar className={cx('avatar')} src={<img src={profile.avatarUrl} alt="avatar" />} />
                            <h4>{profile.fullName}</h4>
                            <p>{profile.email}</p>
                        </Menu.Item>
                        <Divider className={cx('border-solid')} />
                        <Menu.Item key="introduction">Giới thiệu</Menu.Item>
                        <Menu.Item key="account-info">Thông tin tài khoản</Menu.Item>
                        <Menu.Item key="rating">Đánh giá</Menu.Item>
                        <Menu.Item key="privacy-policy">Chính sách về quyền riêng tư</Menu.Item>
                        <Divider className={cx('border-solid')} />
                        <Menu.Item key="language">Language</Menu.Item>
                        <Menu.Item key="change-password">Đổi mật khẩu</Menu.Item>
                        <Menu.Item key="leave-company">Rời khỏi công ty</Menu.Item>
                        <Divider className={cx('border-solid')} />
                        <Menu.Item key="logout" onClick={() => handleLogOut()}>
                            Đăng xuất
                        </Menu.Item>
                    </Menu>
                }
                trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar src={<img src={profile.avatarUrl} alt="avatar" />} />
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}

export default MenuDropDown;
