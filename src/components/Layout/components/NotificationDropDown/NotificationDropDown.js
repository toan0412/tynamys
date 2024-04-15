import { UserContext } from '~/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationDropDown.module.scss';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Avatar, Divider, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import './NotificationDropDown.scss';

const cx = classNames.bind(styles);

function NotificationDropDown({ children }) {
    const handleChange = () => {};
    const items = [
        {
            key: '1',
            label: (
                <div className={cx('notification-header')}>
                    <p>Thông báo</p>
                    <button>
                        Đánh dấu tất cả là đã đọc
                        <CheckCircleOutlined style={{ paddingLeft: '4px' }} />
                    </button>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            key: '1',
                            label: 'Tất cả',
                            children: 'Content 1',
                        },
                        {
                            key: '2',
                            label: 'Cá nhân',
                            children: 'Content 1',
                        },
                        {
                            key: '3',
                            label: 'Nhóm',
                            children: 'Content 1',
                        },
                        {
                            key: '4',
                            label: 'Công ty',
                            children: 'Content 1',
                        },
                        {
                            key: '5',
                            label: 'Hệ thống',
                            children: 'Content 1',
                        },
                    ]}
                    onChange={handleChange}
                />
            ),
        },
    ];

    return (
        <>
            <Dropdown
                style={{ width: '410px', height: '610px' }}
                menu={{ items }}
                trigger={['click']}
                overlayClassName={cx('workspace-dropdown')}
                placement="bottomLeft"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>{children}</Space>
                </a>
            </Dropdown>
        </>
    );
}

export default NotificationDropDown;
