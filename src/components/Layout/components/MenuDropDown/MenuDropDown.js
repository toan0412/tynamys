import { UserContext } from '~/context/UserContext';
import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuDropDown.module.scss';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Avatar, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAccountInfo } from '~/services/UserServices';
import Sidebar from '../../DefaultLayout/Sidebar';

const cx = classNames.bind(styles);

function MenuDropDown() {
    const { user, logout, userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        navigate('/login');
    };

    window.addEventListener('load', async function () {
        let res = await getAccountInfo();
        userInfo(res.data);
    });

    return (
        <div>
            <Dropdown
                arrow={{ pointAtCenter: true }}
                placement="bottomRight"
                overlay={
                    <Menu className={cx('menu-dropdown')}>
                        <Menu.Item className={cx('menu-dropdown-header')}>
                            <Avatar className={cx('avatar')} src={<img src={user.userInfo.avatarUrl} alt="avatar" />} />
                            <h4>{user.userInfo.fullName}</h4>
                            <p>{user.userInfo.email}</p>
                        </Menu.Item>
                        <Divider className={cx('border-solid')} />
                        <Menu.Item>Giới thiệu</Menu.Item>
                        <Menu.Item>Thông tin tài khoản</Menu.Item>
                        <Menu.Item>Đánh giá</Menu.Item>
                        <Menu.Item>Chính sách về quyền riêng tư</Menu.Item>
                        <Divider className={cx('border-solid')} />
                        <Menu.Item>Language</Menu.Item>
                        <Menu.Item>Đổi mật khẩu</Menu.Item>
                        <Menu.Item>Rời khỏi công ty</Menu.Item>
                        <Divider className={cx('border-solid')} />
                        <Menu.Item onClick={() => handleLogOut()}>Đăng xuất</Menu.Item>
                    </Menu>
                }
                trigger={['click']}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar src={<img src={user.userInfo.avatarUrl} alt="avatar" />} />
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}

export default MenuDropDown;
