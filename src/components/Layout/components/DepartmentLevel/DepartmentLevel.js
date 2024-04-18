import React from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentLevel.module.scss';
import { Button, Dropdown, Menu, Space } from 'antd';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const DepartmentLevel = ({ title, type, departmentList }) => {
    return (
        <div className={cx('department-level')}>
            <div className={cx('column-title')}>{title}</div>
            <div className={cx('list-column')}>
                <div className={cx('list-department')}>
                    <div className={cx('slide-in')}>
                        {departmentList && Array.isArray(departmentList)
                            ? departmentList.map(
                                  (department) =>
                                      department.type === type && (
                                          <div className={cx('card-department')}>
                                              <div className={cx('card-department-img')}>
                                                  <img src={department.photoUrl} alt="card-item" />
                                              </div>
                                              <div className={cx('content-wrap')}>
                                                  <h3>{department.displayName}</h3>
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
                                                                  <span className={cx('three-dot')}>...</span>
                                                              </Space>
                                                          </a>
                                                      </div>
                                                  </Dropdown>
                                                  <p className={cx('desc')}>{department.numberOfUser} Thành viên</p>
                                                  {department.isPrivate && <LockOutlined />}
                                              </div>
                                          </div>
                                      ),
                              )
                            : []}
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
    );
};

export default DepartmentLevel;
