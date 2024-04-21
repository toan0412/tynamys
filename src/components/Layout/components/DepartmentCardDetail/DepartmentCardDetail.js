import React from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentCardDetail.module.scss';
import { Button, Modal, Divider, Image, Input, Select, Checkbox, Avatar } from 'antd';
import { EditOutlined } from '@ant-design/icons/';
import TextArea from 'antd/es/input/TextArea';

const cx = classNames.bind(styles);

function DepartmentCardDetail({ modalDetail, handleCancel, departmentCardDetail, abilities, modalEdit }) {
    return (
        <Modal open={modalDetail} footer={null} onCancel={handleCancel} width={718}>
            <header className={cx('modal-header')}>
                <h3>Chi tiết nhóm</h3>
                <Divider style={{ margin: '12px 0' }} />
                <div className={cx('modal-content')}>
                    <div className={cx('content-left')}>
                        <div className={cx('department-avatar')}>
                            <div className={cx('border-avatar')}>
                                <Image src={departmentCardDetail.photoUrl} alt="department-avatar" width={142} />
                            </div>
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Tên nhóm</div>
                            <Input value={departmentCardDetail.displayName} disabled size="large" />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Nhóm quản lý</div>
                            <Select value="Nhóm quản lý" disabled size="large" style={{ width: '100%' }} />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Mô tả</div>
                            <TextArea
                                value={departmentCardDetail.description ? departmentCardDetail.description : 'Mô tả'}
                                disabled
                                size="large"
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 7,
                                }}
                            />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <Checkbox checked={departmentCardDetail.isPrivate}>Phòng bí mật</Checkbox>
                        </div>
                        <Button type="primary" size="large" style={{ marginTop: '24px' }} onClick={modalEdit}>
                            <EditOutlined />
                            Chỉnh sửa
                        </Button>
                    </div>
                    <div className={cx('content-right')}>
                        <div className={cx('title')}>
                            Danh sách thành viên ({abilities.meta ? abilities.meta.totalItems : 0})
                        </div>
                        <div className={cx('card-member')}>
                            {abilities.data && Array.isArray(abilities.data)
                                ? abilities.data.map((ability) => (
                                      <div className={cx('member-item')}>
                                          <div className={cx('member-item-avatar')}>
                                              <Avatar src={ability.user.avatarUrl} size={45}></Avatar>
                                          </div>
                                          <p className={cx('member-item-body')}>{ability.user.fullName}</p>
                                      </div>
                                  ))
                                : []}
                        </div>
                    </div>
                </div>
            </header>
        </Modal>
    );
}

export default DepartmentCardDetail;
