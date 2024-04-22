import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentLevel.module.scss';
import { Button, Dropdown, Space } from 'antd';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';
import DepartmentCardDetail from '../DepartmentCardDetail/DepartmentCardDetail';
import { getAbilityApi, getDepartmentSearchApi } from '~/services/UserServices';
import DepartmentCardEdit from '../DepartmentCardEdit/DepartmentCardEdit';

const cx = classNames.bind(styles);

const DepartmentLevel = ({ title, type, departmentList }) => {
    const [departmentCardDetail, setDepartmentCardDetail] = useState({});
    const [departmentCardEdit, setDepartmentCardEdit] = useState({});
    const [departmentCardId, setDepartmentCardId] = useState('');
    const [abilities, setAbilities] = useState({});
    const [modalDetail, setModalDetail] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const showViewModal = async (id) => {
        setDepartmentCardId(id);
        let res = await getAbilityApi(id);
        let res2 = await getDepartmentSearchApi('', id);
        setDepartmentCardDetail(res.data);
        setAbilities(res2);
        setModalDetail(true);
    };

    const showEditModal = async (id) => {
        setDepartmentCardId(id);
        let res = await getAbilityApi(id);
        let res2 = await getDepartmentSearchApi('', '');
        setDepartmentCardEdit(res.data);
        setAbilities(res2);
        setModalEdit(true);
    };

    const showEditModalWithId = async () => {
        setDepartmentCardId(departmentCardId);
        let res = await getAbilityApi(departmentCardId);
        let res2 = await getDepartmentSearchApi('', '');
        setDepartmentCardEdit(res.data);
        setAbilities(res2);
        setModalDetail(false);
        setModalEdit(true);
    };

    const handleDetailCancel = () => {
        setModalDetail(false);
    };

    const handleEditCancel = () => {
        setModalEdit(false);
    };

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
                                          <>
                                              <div className={cx('card-department')}>
                                                  <div className={cx('card-department-img')}>
                                                      <img src={department.photoUrl} alt="card-item" />
                                                  </div>
                                                  <div className={cx('content-wrap')}>
                                                      <h3>{department.displayName}</h3>
                                                      <Dropdown
                                                          trigger="click"
                                                          menu={{
                                                              items: [
                                                                  {
                                                                      label: (
                                                                          <button
                                                                              className={cx('detail-btn')}
                                                                              onClick={() => {
                                                                                  showViewModal(department.id);
                                                                              }}
                                                                          >
                                                                              Xem chi tiết
                                                                          </button>
                                                                      ),
                                                                      key: '1',
                                                                  },
                                                                  {
                                                                      label: (
                                                                          <button
                                                                              className={cx('detail-btn')}
                                                                              onClick={() => {
                                                                                  showEditModal(department.id);
                                                                              }}
                                                                          >
                                                                              Sửa nhóm
                                                                          </button>
                                                                      ),
                                                                      key: '2',
                                                                  },
                                                                  {
                                                                      label: (
                                                                          <button className={cx('detail-btn')}>
                                                                              Xoá nhóm
                                                                          </button>
                                                                      ),
                                                                      key: '3',
                                                                  },
                                                              ],
                                                          }}
                                                          placement="bottomRight"
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
                                              <DepartmentCardDetail
                                                  modalDetail={modalDetail}
                                                  handleCancel={handleDetailCancel}
                                                  departmentCardDetail={departmentCardDetail}
                                                  abilities={abilities}
                                                  modalEdit={() => showEditModalWithId()}
                                              />
                                              <DepartmentCardEdit
                                                  modalEdit={modalEdit}
                                                  handleCancel={handleEditCancel}
                                                  departmentCardEdit={departmentCardEdit}
                                                  abilities={abilities}
                                                  departmentCardId={departmentCardId}
                                              />
                                          </>
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
