import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { Menu, Divider } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '~/context/UserContext';

import './Sidebar.scss';

import {
    TeamListIcon,
    PositionListIcon,
    PersonnelListIcon,
    NewsIcon,
    NewsListIcon,
    CompanyEditIcon,
    HomePageIcon,
    CompanyTarget,
    PersonalTarget,
    WorkSchedule,
} from '~/assets/icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    const [defaultOpenKeys, setDefaultOpenKeys] = useState(['workspace']);
    const [companySelect, setCompanySelect] = useState(localStorage.getItem('companySelect'));

    const { user } = useContext(UserContext);

    useEffect(() => {
        const data = localStorage.getItem('companySelect');
        setCompanySelect(JSON.parse(data));
    }, [user]);

    // useEffect(() => {
    //     function changeSelectCompany() {
    //         const data = localStorage.getItem('companySelect');

    //         if (data) {
    //             setCompanySelect(JSON.parse(data));
    //         }
    //     }

    //     window.addEventListener('storage', changeSelectCompany);
    //     return () => {
    //         window.removeEventListener('storage', changeSelectCompany);
    //     };
    // }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-wrap')}>
                <Menu triggerSubMenuAction="click" mode="inline" defaultOpenKeys={defaultOpenKeys}>
                    {companySelect !== null && companySelect && companySelect.company && (
                        <>
                            <Menu.SubMenu
                                key="workspace"
                                title={
                                    <div className={cx('workspace-title')}>
                                        <img src={companySelect.company.photoUrl} alt="logo" width={50} height={50} />
                                        <div className={cx('workspace-info')}>
                                            <p>{companySelect.company.displayName}</p>
                                            <span>{companySelect.company.numberOfUser} Nhân sự</span>
                                        </div>
                                    </div>
                                }
                                mode="vertical"
                            >
                                <Link to="/list-department">
                                    <Menu.Item key="groupList" className={cx('sidebar-item')} icon={<TeamListIcon />}>
                                        Danh sách nhóm
                                    </Menu.Item>
                                </Link>
                                <Menu.Item
                                    key="positionList"
                                    className={cx('sidebar-item')}
                                    icon={<PositionListIcon />}
                                >
                                    Danh sách chức vụ
                                </Menu.Item>
                                <Menu.Item
                                    key="personnelList"
                                    className={cx('sidebar-item')}
                                    icon={<PersonnelListIcon />}
                                >
                                    Danh sách nhân sự
                                </Menu.Item>
                                <Menu.Item key="news" className={cx('sidebar-item')} icon={<NewsIcon />}>
                                    Tin tức
                                </Menu.Item>
                                <Menu.Item key="newsManagement" className={cx('sidebar-item')} icon={<NewsListIcon />}>
                                    Quản lý tin tức
                                </Menu.Item>
                                <Menu.Item key="companyEdit" className={cx('sidebar-item')} icon={<CompanyEditIcon />}>
                                    Chỉnh sửa công ty
                                </Menu.Item>
                            </Menu.SubMenu>
                            <Divider style={{ margin: '16px 0', backgroundColor: '#dcdcdc' }} />
                        </>
                    )}

                    <Menu.Item key="home" className={cx('sidebar-item')} icon={<HomePageIcon />}>
                        Trang chủ
                    </Menu.Item>
                    <Menu.Item key="companyTarget" className={cx('sidebar-item')} icon={<CompanyTarget />}>
                        Mục tiêu công ty
                    </Menu.Item>
                    <Menu.Item key="personalTarget" className={cx('sidebar-item')} icon={<PersonalTarget />}>
                        Mục tiêu cá nhân
                    </Menu.Item>
                    <Menu.Item key="workSchedule" className={cx('sidebar-item')} icon={<WorkSchedule />}>
                        Lịch làm việc
                    </Menu.Item>
                </Menu>
            </div>
            <div className={cx('minimize-btn')}>
                <svg width="16" height="20" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.24895 0.744059C5.93812 0.441891 5.44797 0.420307 5.11153 0.679309L5.03677 0.744059L0.751051 4.91074C0.440225 5.21293 0.418025 5.68946 0.684451 6.01656L0.751051 6.08926L5.03675 10.2559C5.37148 10.5814 5.91419 10.5814 6.24893 10.2559C6.55976 9.95373 6.58198 9.47719 6.31555 9.15009L6.24893 9.07741L2.56995 5.49995L6.24895 1.92257C6.55977 1.6204 6.58198 1.14381 6.31555 0.816726L6.24895 0.744059Z"
                        fill="#A3A3A3"
                    ></path>
                </svg>
            </div>
        </div>
    );
}

export default Sidebar;
