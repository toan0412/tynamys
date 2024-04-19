import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentCardEdit.module.scss';
import { Button, Modal, Divider, Image, Input, Select, Checkbox, Transfer, Avatar } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './DepartmentCardEdit.scss';

const cx = classNames.bind(styles);

function DepartmentCardEdit({ modalEdit, handleCancel, departmentCardEdit, abilities }) {
    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [departmentCard, setDepartmentCard] = useState({
        photoFile: '',
        displayName: '',
        description: '',
        type: '',
        isPrivate: false,
    });

    useEffect(() => {
        getMock();
    }, [modalEdit]);

    const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        if (abilities.data && Array.isArray(abilities.data)) {
            abilities.data.forEach((ability) => {
                const data = {
                    key: ability.id,
                    fullName: ability.user.fullName,
                    avatar: ability.user.avatarUrl,
                    chosen: ability.abilityDepts.length === 0,
                    companyAbility: ability.companyAbility,
                };

                if (data.chosen) {
                    tempTargetKeys.push(data.key);
                }

                tempMockData.push(data);
            });
        }

        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
    };

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };

    const filterOption = (inputValue, option) => option.fullName.toLowerCase().indexOf(inputValue) > -1;

    return (
        <Modal open={modalEdit} footer={null} onCancel={handleCancel} width={976}>
            <header className={cx('modal-header')}>
                <h3>Chi tiết nhóm</h3>
                <Divider style={{ margin: '12px 0' }} />
                <div className={cx('modal-content')}>
                    <div className={cx('content-left')}>
                        <div className={cx('department-avatar')}>
                            <div className={cx('border-avatar')}>
                                <Image src={departmentCardEdit.photoUrl} alt="department-avatar" width={142} />
                            </div>
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Tên nhóm</div>
                            <Input
                                value={departmentCardEdit.displayName}
                                size="large"
                                onChange={(e) =>
                                    setDepartmentCard((prevState) => ({
                                        ...prevState,
                                        displayName: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Nhóm quản lý</div>
                            <Select value="Nhóm quản lý" disabled size="large" style={{ width: '100%' }} />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Mô tả</div>
                            <TextArea
                                value={departmentCardEdit.description ? departmentCardEdit.description : 'Mô tả'}
                                size="large"
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 7,
                                }}
                            />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <Checkbox checked={departmentCardEdit.isPrivate}>Phòng bí mật</Checkbox>
                        </div>
                        <Button type="primary" danger size="large" style={{ marginTop: '24px' }}>
                            {/* <EditOutlined />
                            Chỉnh sửa */}
                            Đóng
                        </Button>
                    </div>
                    <div className={cx('content-right')}>
                        <Transfer
                            dataSource={mockData}
                            titles={[
                                <div className={cx('transfer-title')}>Nhân sự thuộc nhóm</div>,
                                <div className={cx('transfer-title')}>Nhân sự thuộc công ty</div>,
                            ]}
                            showSelectAll={false}
                            showSearch
                            selectAllLabels={false}
                            targetKeys={targetKeys}
                            onChange={handleChange}
                            filterOption={filterOption}
                            render={(item) => (
                                <div className={cx('member-item')} disabled={item.companyAbility === 'COMP_OWN'}>
                                    <div className={cx('member-item-avatar')}>
                                        <Avatar src={item.avatar} size={42}></Avatar>
                                    </div>
                                    <p className={cx('member-item-body')}>{item.fullName}</p>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </header>
        </Modal>
    );
}

export default DepartmentCardEdit;
