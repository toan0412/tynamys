import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentLevel.module.scss';
import { UserContext } from '~/context/UserContext';
import { Button, Dropdown, Space } from 'antd';
import { PlusOutlined, LockOutlined } from '@ant-design/icons';
import DepartmentCardDetail from '../DepartmentCardDetail/DepartmentCardDetail';
import { deleteDepartment, getDepartmentById, getAbilitiesByDepartmentApi } from '~/services/UserServices';
import DepartmentCardEdit from '../DepartmentCardEdit/DepartmentCardEdit';
import DepartmentCardCreate from '../DepartmentCardCreate/DepartmentCardCreate';
import DeleteModal from '../DeleteModal/DeleteModal';

const cx = classNames.bind(styles);

const DepartmentLevel = ({ title, type, departmentList }) => {
    const { isDepartmentUpdate } = useContext(UserContext);
    const [departmentCardDetail, setDepartmentCardDetail] = useState({});
    const [departmentCardEdit, setDepartmentCardEdit] = useState({});
    const [departmentCardId, setDepartmentCardId] = useState('');
    const [abilities, setAbilities] = useState({});
    const [modalDetail, setModalDetail] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalForce, setModalForce] = useState(false);
    const [isDanger, setIsDanger] = useState('');

    const showViewModal = async (id) => {
        setDepartmentCardId(id);
        let res = await getDepartmentById(id);
        let res2 = await getAbilitiesByDepartmentApi('', id);
        setDepartmentCardDetail(res.data);
        setAbilities(res2);
        setModalDetail(true);
    };

    const showEditModal = async (id) => {
        setDepartmentCardId(id);
        let res = await getDepartmentById(id);
        let res2 = await getAbilitiesByDepartmentApi('', '');
        setDepartmentCardEdit(res.data);
        setAbilities(res2);
        setModalEdit(true);
    };

    const showEditModalWithId = async () => {
        setDepartmentCardId(departmentCardId);
        let res = await getDepartmentById(departmentCardId);
        let res2 = await getAbilitiesByDepartmentApi('', '');
        setDepartmentCardEdit(res.data);
        setAbilities(res2);
        setModalDetail(false);
        setModalEdit(true);
    };

    const showCreateModal = async () => {
        let res = await getAbilitiesByDepartmentApi('', '');
        setAbilities(res);
        setModalCreate(true);
    };

    const showDeleteModal = async (id) => {
        setDepartmentCardId(id);
        setModalDelete(true);
    };

    const handleDelete = async () => {
        let res = await deleteDepartment(departmentCardId, false);
        if (res.errorCode.length === 0) {
            setModalDelete(false);
        } else {
            if (res.errorCode === 'DEPT.ITEM_IN_USED') {
                setIsDanger('Nhóm hiện đang được sử dụng');
                setModalDelete(false);
                setModalForce(true);
            }
        }
    };

    const handleForce = async () => {
        let res = await deleteDepartment(departmentCardId, true);
        if (res.success) {
            setModalForce(false);
            isDepartmentUpdate(true);
        }
    };

    const handleCreateCancel = () => {
        setModalCreate(false);
    };

    const handleDetailCancel = () => {
        setModalDetail(false);
    };

    const handleEditCancel = () => {
        setModalEdit(false);
    };

    const handleDeleteCancel = () => {
        setModalDelete(false);
    };

    const handleForceCancel = () => {
        setModalForce(false);
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
                                                                          <button
                                                                              className={cx('detail-btn')}
                                                                              onClick={() => {
                                                                                  showDeleteModal(department.id);
                                                                              }}
                                                                          >
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
                                              <DepartmentCardCreate
                                                  modalCreate={modalCreate}
                                                  abilities={abilities}
                                                  type={type}
                                                  handleCancel={handleCreateCancel}
                                              />
                                              <DeleteModal
                                                  modalDelete={modalDelete}
                                                  handleCancel={handleDeleteCancel}
                                                  titleModal=""
                                                  content="Bạn đồng ý xóa Nhóm này không?"
                                                  handleDelete={handleDelete}
                                              />
                                              <DeleteModal
                                                  modalDelete={modalForce}
                                                  handleCancel={handleForceCancel}
                                                  titleModal={isDanger}
                                                  content="Vẫn xoá?"
                                                  handleDelete={handleForce}
                                              />
                                          </>
                                      ),
                              )
                            : []}
                    </div>
                </div>
                <div className={cx('btn-add-dept')}>
                    <Button type="primary" ghost onClick={() => showCreateModal()}>
                        <PlusOutlined />
                        <span>Thêm nhóm</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DepartmentLevel;
