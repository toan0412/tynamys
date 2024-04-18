import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './DepartmentList.module.scss';
import { Dropdown, Input, Space, Menu, Button } from 'antd';
import { LockOutlined, PlusOutlined } from '@ant-design/icons';
import './DepartmentList.scss';
import { getDayTaskApi, getGoalApi } from '~/services/UserServices';
import './DepartmentList.scss';

const { Search } = Input;
const cx = classNames.bind(styles);

function DepartmentList() {
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    return (
        <div className={cx('department-manager')}>
            <div className={cx('content-department')}>
                <div className={cx('content-main')}>
                    <div className={cx('content-heading')}>
                        <h2>Danh sách nhóm</h2>
                    </div>

                    <div className={cx('list-column-wrapper')}>
                        <div className={cx('department-level')}>
                            <div className={cx('column-title')}>Cấp 1</div>
                            <div className={cx('list-column')}>
                                <div className={cx('list-department')}>
                                    {/* Card item */}
                                    <div className={cx('slide-in')}>
                                        <div className={cx('card-department')}>
                                            <div className={cx('card-department-img')}>
                                                <img
                                                    src="https://mys.tinasoft.com.vn/_next/image?url=https%3A%2F%2Fui-avatars.com%2Fapi%2F%3Fsize%3D256%26fontSize%3D0.5%26length%3D3%26name%3Dnhom%2B1%26rounded%3Dfalse%26bold%3Dfalse%26background%3D8e24aa%26color%3DFFFFFF%26uppercase%3Dtrue%26format%3Dpng&w=128&q=75"
                                                    alt="card-item"
                                                />
                                            </div>
                                            <div className={cx('content-wrap')}>
                                                <h3>nhom 1</h3>
                                                <Dropdown
                                                    trigger="click"
                                                    overlay={
                                                        <Menu>
                                                            <Menu.Item key="1">
                                                                <button>Xem chi tiết</button>
                                                            </Menu.Item>
                                                            <Menu.Item key="2">
                                                                <button>Sửa nhóm</button>
                                                            </Menu.Item>
                                                            <Menu.Item key="3">
                                                                <button>Xoá nhóm</button>
                                                            </Menu.Item>
                                                        </Menu>
                                                    }
                                                >
                                                    <div>
                                                        <a onClick={(e) => e.preventDefault()}>
                                                            <Space>
                                                                <span class={cx('three-dot')}>...</span>
                                                            </Space>
                                                        </a>
                                                    </div>
                                                </Dropdown>
                                                <p className={cx('desc')}>3 Thành viên</p>
                                                <LockOutlined />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('slide-in')}>
                                        <div className={cx('card-department')}>
                                            <div className={cx('card-department-img')}>
                                                <img
                                                    src="https://mys.tinasoft.com.vn/_next/image?url=https%3A%2F%2Fui-avatars.com%2Fapi%2F%3Fsize%3D256%26fontSize%3D0.5%26length%3D3%26name%3Dnhom%2B1%26rounded%3Dfalse%26bold%3Dfalse%26background%3D8e24aa%26color%3DFFFFFF%26uppercase%3Dtrue%26format%3Dpng&w=128&q=75"
                                                    alt="card-item"
                                                />
                                            </div>
                                            <div className={cx('content-wrap')}>
                                                <h3>nhom 1</h3>
                                                <Dropdown
                                                    trigger="click"
                                                    overlay={
                                                        <Menu>
                                                            <Menu.Item key="1">
                                                                <button>Xem chi tiết</button>
                                                            </Menu.Item>
                                                            <Menu.Item key="2">
                                                                <button>Sửa nhóm</button>
                                                            </Menu.Item>
                                                            <Menu.Item key="3">
                                                                <button>Xoá nhóm</button>
                                                            </Menu.Item>
                                                        </Menu>
                                                    }
                                                >
                                                    <div>
                                                        <a onClick={(e) => e.preventDefault()}>
                                                            <Space>
                                                                <span class={cx('three-dot')}>...</span>
                                                            </Space>
                                                        </a>
                                                    </div>
                                                </Dropdown>
                                                <p className={cx('desc')}>3 Thành viên</p>
                                                <LockOutlined />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('slide-in')}>
                                        <div className={cx('card-department')}>
                                            <div className={cx('card-department-img')}>
                                                <img
                                                    src="https://mys.tinasoft.com.vn/_next/image?url=https%3A%2F%2Fui-avatars.com%2Fapi%2F%3Fsize%3D256%26fontSize%3D0.5%26length%3D3%26name%3Dnhom%2B1%26rounded%3Dfalse%26bold%3Dfalse%26background%3D8e24aa%26color%3DFFFFFF%26uppercase%3Dtrue%26format%3Dpng&w=128&q=75"
                                                    alt="card-item"
                                                />
                                            </div>
                                            <div className={cx('content-wrap')}>
                                                <h3>nhom 1</h3>
                                                <Dropdown
                                                    trigger="click"
                                                    overlay={
                                                        <Menu>
                                                            <Menu.Item key="1">
                                                                <button>Xem chi tiết</button>
                                                            </Menu.Item>
                                                            <Menu.Item key="2">
                                                                <button>Sửa nhóm</button>
                                                            </Menu.Item>
                                                            <Menu.Item key="3">
                                                                <button>Xoá nhóm</button>
                                                            </Menu.Item>
                                                        </Menu>
                                                    }
                                                >
                                                    <div>
                                                        <a onClick={(e) => e.preventDefault()}>
                                                            <Space>
                                                                <span class={cx('three-dot')}>...</span>
                                                            </Space>
                                                        </a>
                                                    </div>
                                                </Dropdown>
                                                <p className={cx('desc')}>3 Thành viên</p>
                                                <LockOutlined />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('btn-add-dept')}>
                                    <Button type="primary" ghost>
                                        <PlusOutlined />
                                        <span>Thêm nhóm</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('department-level')}></div>
                        <div className={cx('department-level')}></div>
                    </div>
                </div>
                <div className={cx('member-list-dept')}>
                    <div className={cx('member-list')}>
                        <div className={cx('member-list-header')}>
                            <div className={cx('member-list-title')}>Danh sách thành viên (1)</div>
                            <div className={cx('member-list-search')}>
                                <Search
                                    placeholder="Tìm kiếm"
                                    allowClear
                                    onSearch={onSearch}
                                    style={{
                                        width: 200,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepartmentList;
