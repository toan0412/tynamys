import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentCardEdit.module.scss';
import { Button, Modal, Divider, Image, Input, Select, Checkbox, Transfer, Avatar, Upload } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import './DepartmentCardEdit.scss';
import ImageUploader from '../ImageUploader/ImageUploader';
import { patchDepartmentAbility, patchDepartmentApi } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function DepartmentCardEdit({ modalEdit, handleCancel, departmentCardEdit, abilities, departmentCardId }) {
    const { isDepartmentUpdate } = useContext(UserContext);
    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [departmentCard, setDepartmentCard] = useState({
        displayName: '',
        description: '',
        type: '',
        isPrivate: '',
    });

    //Upload image
    const [fileList, setFileList] = useState([]);

    const handleUpload = (files) => {
        setFileList(files);
    };

    //

    useEffect(() => {
        setFileList(
            departmentCardEdit.photoUrl
                ? [{ uid: '-1', name: 'image.png', status: 'done', url: departmentCardEdit.photoUrl }]
                : [],
        );

        setDepartmentCard({
            displayName: departmentCardEdit.displayName,
            description: departmentCardEdit.description,
            type: departmentCardEdit.type,
            isPrivate: departmentCardEdit.isPrivate,
        });
        getMock();
    }, [modalEdit]);

    const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        if (abilities.data && Array.isArray(abilities.data)) {
            abilities.data.forEach((ability) => {
                const data = {
                    key: ability.userId,
                    fullName: ability.user.fullName,
                    avatar: ability.user.avatarUrl,
                    chosen: ability.abilityDepts.length !== 0,
                    companyAbility: ability.companyAbility,
                };

                if (data.chosen) {
                    tempTargetKeys.push(data.key);
                    setIsChange(true);
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

    //Handle submit
    const HandleEditDepartmentCard = async () => {
        try {
            let res = await patchDepartmentApi(
                departmentCardId,
                departmentCard.displayName,
                departmentCard.description,
                departmentCard.isPrivate,
            );

            let res2 = await patchDepartmentAbility(departmentCardId, targetKeys);
            if (res.success || res2.success) {
                handleCancel();
                isDepartmentUpdate(true);
            }
        } catch (error) {
            console.error('Error editing department:', error);
        }
    };

    return (
        <Modal open={modalEdit} footer={null} onCancel={handleCancel} width={976}>
            <header className={cx('modal-header')}>
                <h3>Chi tiết nhóm</h3>
                <Divider style={{ margin: '12px 0' }} />
                <div className={cx('modal-content')}>
                    <div className={cx('content-left')}>
                        <div className={cx('department-avatar')}>
                            <div className={cx('border-avatar')}>
                                <ImageUploader fileList={fileList} onUpload={handleUpload} />
                            </div>
                        </div>
                        <div className={cx('form-item-custom')} style={{ paddingTop: '16px' }}>
                            <div className={cx('title')}>Tên nhóm</div>
                            <Input
                                placeholder="Tên nhóm"
                                value={departmentCard.displayName}
                                size="large"
                                onChange={(e) => {
                                    setDepartmentCard((prevState) => ({
                                        ...prevState,
                                        displayName: e.target.value,
                                    }));
                                    setIsChange(true);
                                }}
                            />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Nhóm quản lý</div>
                            <Select value="Nhóm quản lý" disabled size="large" style={{ width: '100%' }} />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <div className={cx('title')}>Mô tả</div>
                            <TextArea
                                placeholder="Mô tả"
                                value={departmentCard.description}
                                size="large"
                                onChange={(e) => {
                                    setDepartmentCard((prevState) => ({
                                        ...prevState,
                                        description: e.target.value,
                                    }));
                                    setIsChange(true);
                                }}
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 7,
                                }}
                            />
                        </div>
                        <div className={cx('form-item-custom')}>
                            <Checkbox
                                checked={departmentCard.isPrivate}
                                onChange={() => {
                                    setDepartmentCard((prevState) => ({
                                        ...prevState,
                                        isPrivate: !departmentCard.isPrivate,
                                    }));
                                    setIsChange(true);
                                }}
                            >
                                Phòng bí mật
                            </Checkbox>
                        </div>

                        {isChange ? (
                            <Button
                                type="primary"
                                size="large"
                                style={{ marginTop: '24px' }}
                                onClick={() => HandleEditDepartmentCard()}
                            >
                                <EditOutlined />
                                Chỉnh sửa
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                danger
                                size="large"
                                style={{ marginTop: '24px' }}
                                onClick={handleCancel}
                            >
                                Đóng
                            </Button>
                        )}
                    </div>
                    <div className={cx('content-right')}>
                        <Transfer
                            dataSource={mockData}
                            titles={[
                                <div className={cx('transfer-title')}>Nhân sự thuộc công ty</div>,
                                <div className={cx('transfer-title')}>Nhân sự thuộc nhóm</div>,
                            ]}
                            showSelectAll={false}
                            showSearch
                            selectAllLabels={false}
                            targetKeys={targetKeys}
                            onChange={handleChange}
                            filterOption={filterOption}
                            render={(item) => (
                                <div className={cx('member-item')} disabled={item.key === 1}>
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
