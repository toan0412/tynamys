import React, { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './DepartmentCardCreate.module.scss';
import { Button, Modal, Divider, Input, Select, Checkbox, Transfer, Avatar } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './DepartmentCardCreate.scss';
import ImageUploader from '../ImageUploader/ImageUploader';
import { patchDepartmentAbility, patchDepartmentApi, postDepartment } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

function DepartmentCardCreate({ modalCreate, abilities, type, handleCancel }) {
    console.log(abilities);
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
        getMock();
    }, [modalCreate]);

    const getMock = () => {
        const tempTargetKeys = [];
        const tempMockData = [];
        if (abilities.data && Array.isArray(abilities.data)) {
            abilities.data.forEach((ability) => {
                const data = {
                    key: ability.userId,
                    fullName: ability.user.fullName,
                    avatar: ability.user.avatarUrl,
                    chosen: null,
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

    const numberOfUser = targetKeys.length;

    const handleChange = (newTargetKeys) => {
        setTargetKeys(newTargetKeys);
    };

    const filterOption = (inputValue, option) => option.fullName.toLowerCase().indexOf(inputValue) > -1;

    //Handle submit
    const HandleCreateDepartmentCard = async () => {
        console.log(numberOfUser);
        let departmentCardId;
        try {
            let res = await postDepartment(
                type,
                departmentCard.displayName,
                departmentCard.description,
                numberOfUser,
                departmentCard.isPrivate,
            );
            if (res.success) {
                departmentCardId = res.data.id;
            }

            let res2 = await patchDepartmentAbility(departmentCardId, targetKeys);
            if (res2.success) {
                handleCancel();
                isDepartmentUpdate(true);
            }
        } catch (error) {
            console.error('Error editing department:', error);
        }
    };

    return (
        <Modal open={modalCreate} footer={null} onCancel={handleCancel} width={976}>
            <header className={cx('modal-header')}>
                <h3>Thêm nhóm</h3>
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
                                onClick={() => HandleCreateDepartmentCard()}
                            >
                                Thêm nhóm
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

export default DepartmentCardCreate;
