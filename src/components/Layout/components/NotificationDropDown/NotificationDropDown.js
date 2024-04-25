import { UserContext } from '~/context/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationDropDown.module.scss';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Tabs } from 'antd';
import './NotificationDropDown.scss';
import { getNotificationApi, setAllAsReadApi } from '~/services/UserServices';

const cx = classNames.bind(styles);

function NotificationDropDown({ children }) {
    const [notificationList, setNotificationList] = useState([]);
    const [isReadAll, setIsReadAll] = useState(false);
    const [currentTab, setCurrentTab] = useState(4);

    const handleChangeTab = async (applyType) => {
        setCurrentTab(applyType);
        let res = await getNotificationApi(applyType);
        setNotificationList(res.data);
    };

    const handleMarkAsRead = async () => {
        try {
            await setAllAsReadApi(currentTab);
            handleChangeTab(currentTab);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await getNotificationApi(currentTab);
                setNotificationList(res.data);
            } catch (error) {
                console.error('Error fetching notification data:', error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     const hasUnreadNotification = notificationList.some((notification) => !notification.isRead);
    //     setIsReadAll(hasUnreadNotification);
    // }, [notificationList]);

    const formatTimeDifference = (createdAt) => {
        const currentTime = new Date();
        const createdAtTime = new Date(createdAt);
        const timeDifference = currentTime.getTime() - createdAtTime.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        if (minutesDifference < 60) {
            return `${minutesDifference} phút`;
        } else {
            const hoursDifference = Math.floor(minutesDifference / 60);
            const daysDifference = Math.floor(hoursDifference / 24);
            const monthsDifference = Math.floor(daysDifference / 30);
            const yearsDifference = Math.floor(monthsDifference / 12);

            if (yearsDifference > 0) {
                return `${yearsDifference} năm`;
            } else if (monthsDifference > 0) {
                return `${monthsDifference} tháng`;
            } else if (daysDifference > 0) {
                return `${daysDifference} ngày`;
            } else {
                return `${hoursDifference} giờ`;
            }
        }
    };

    const renderItem = (notificationList) => {
        return (
            <div className={cx('notification-list')}>
                {notificationList && Array.isArray(notificationList)
                    ? notificationList.map((notification) => (
                          <div className={cx('notification-item')} key={notification.id}>
                              {notification.isRead === false && <div className={cx('not-read')}></div>}
                              <img
                                  className={cx('notification-avatar')}
                                  src={
                                      notification.notifyDetail.imageUrl ||
                                      'https://mys.tinasoft.com.vn/_next/image?url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcQ1LC2DYX9e9yQ_sSrRhM9M-UNQN23TZQHiSA%26usqp%3DCAU&w=32&q=75'
                                  }
                                  alt="notification avatar"
                                  loading="lazy"
                              />
                              <div className={cx('notification-body-wrap')}>
                                  <h4 className={cx('notification-item-title')}>
                                      {notification.notifyDetail.i18nTitle}
                                  </h4>
                                  <div>{notification.notifyDetail.i18nBody.replace(/<\/?[^>]+(>|$)/g, '')}</div>
                                  <p>{formatTimeDifference(notification.notifyDetail.createdAt)} trước</p>
                              </div>
                          </div>
                      ))
                    : []}
            </div>
        );
    };

    const items = [
        {
            key: '1',
            label: (
                <div className={cx('notification-header')}>
                    <p>Thông báo</p>
                    <button onClick={() => handleMarkAsRead()}>
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
                    defaultActiveKey="4"
                    items={[
                        {
                            key: '4',
                            label: (
                                <Badge dot={isReadAll}>
                                    <span>Tất cả</span>
                                </Badge>
                            ),
                            children: renderItem(notificationList),
                        },
                        {
                            key: '2',
                            label: 'Cá nhân',
                            children: renderItem(notificationList),
                        },
                        {
                            key: '1',
                            label: 'Nhóm',
                            children: renderItem(notificationList),
                        },
                        {
                            key: '0',
                            label: 'Công ty',
                            children: renderItem(notificationList),
                        },
                        {
                            key: '3',
                            label: 'Hệ thống',
                            children: renderItem(notificationList),
                        },
                    ]}
                    onChange={(value) => handleChangeTab(value)}
                />
            ),
        },
    ];

    return (
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
    );
}

export default NotificationDropDown;
