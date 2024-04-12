import React from 'react';
import classNames from 'classnames/bind';
import styles from './WorkspaceModal.module.scss';
import { Modal, Form, Input, Select, Avatar, Button, Col, Row } from 'antd';
import { useState } from 'react';
import { createCompanyApi } from '~/services/UserServices';

const cx = classNames.bind(styles);

function WorkspaceModal({ isModalOpen, setIsModalOpen }) {
    const [form] = Form.useForm();
    const [workspace, setWorkspace] = useState({
        workspaceName: '',
        workspaceType: '0',
        phone: '',
        website: '',
        email: '',
        memberSize: 'LT50',
    });
    const [file, setFile] = useState('https://mys.tinasoft.com.vn/img/modalAddNewCompany/bannerModalAddNew.svg');

    const handleCancel = () => {
        form.resetFields();
        setFile('https://mys.tinasoft.com.vn/img/modalAddNewCompany/bannerModalAddNew.svg');
        setIsModalOpen(false);
    };

    const onFinish = async () => {
        let res = await createCompanyApi(
            workspace.workspaceName,
            workspace.website,
            workspace.workspaceType,
            workspace.phone,
            workspace.email,
            workspace.memberSize,
        );
        if (res && res.success) {
            form.resetFields();
            setFile('https://mys.tinasoft.com.vn/img/modalAddNewCompany/bannerModalAddNew.svg');
            setIsModalOpen(false);
        } else {
            if (res && res.status === 400) {
                console.log(res.data.error);
            }
        }
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <Modal
            footer={null}
            closeIcon=" "
            open={isModalOpen}
            onCancel={handleCancel}
            width={796}
            size="small"
            style={{ position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', margin: 'auto' }}
        >
            <Form
                className={cx('card-modal-form')}
                form={form}
                labelCol={{ span: 24 }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <div className={cx('form-big-avatar')}>
                    <div className={cx('form-small-avatar')}>
                        <input id="fileInput" type="file" onChange={handleChange} style={{ display: 'none' }} />
                        <button onClick={handleButtonClick}>
                            <svg
                                viewBox="64 64 896 896"
                                focusable="false"
                                data-icon="camera"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M864 260H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 10192 0 96 96 0 10-192 0z"></path>
                            </svg>
                        </button>
                        <Avatar src={file} size={204} />
                    </div>
                </div>
                <header className={cx('modal-header')}>
                    <h1>Hãy xây dựng một không gian làm việc mới</h1>
                    <p>Tăng năng suất công việc một cách tối đa nhất giúp mọi người dễ dàng truy cập cùng nhau.</p>
                </header>

                <Row style={{ paddingTop: '16px' }}>
                    <Col span={12} style={{ padding: '0 8px' }}>
                        <Form.Item
                            className={cx('custom-label')}
                            label="Tên không gian làm việc"
                            name={'workspaceName'}
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên không gian làm việc không được để trống',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                value={workspace.workspaceName}
                                onChange={(e) =>
                                    setWorkspace((prevState) => ({
                                        ...prevState,
                                        workspaceName: e.target.value,
                                    }))
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            className={cx('custom-label')}
                            label="Loại hình không gian làm việc"
                            name={'workspaceType'}
                        >
                            <Select
                                value={workspace.workspaceType}
                                size="large"
                                defaultValue="0"
                                onChange={(value) =>
                                    setWorkspace((prevState) => ({
                                        ...prevState,
                                        workspaceName: value,
                                    }))
                                }
                                options={[
                                    {
                                        value: '0',
                                        label: 'Công ty',
                                    },
                                    {
                                        value: '1',
                                        label: 'Cá nhân',
                                    },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại',
                                },
                                {
                                    pattern: /^\d{10,11}$/,
                                    message: 'Số điện thoại không hợp lệ',
                                },
                            ]}
                            className={cx('custom-label')}
                            label="Số điện thoại"
                            name={'phone'}
                        >
                            <Input
                                size="large"
                                value={workspace.phone}
                                onChange={(e) =>
                                    setWorkspace((prevState) => ({
                                        ...prevState,
                                        phone: e.target.value,
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12} style={{ padding: '0 8px' }}>
                        <Form.Item className={cx('custom-label')} label="Website" name={'website'}>
                            <Input
                                size="large"
                                value={workspace.website}
                                onChange={(e) =>
                                    setWorkspace((prevState) => ({
                                        ...prevState,
                                        website: e.target.value,
                                    }))
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            className={cx('custom-label')}
                            rules={[
                                {
                                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Email không hợp lệ',
                                },
                            ]}
                            label="Email"
                            name={'email'}
                        >
                            <Input
                                size="large"
                                value={workspace.email}
                                onChange={(e) =>
                                    setWorkspace((prevState) => ({
                                        ...prevState,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </Form.Item>

                        <Form.Item className={cx('custom-label')} label="Quy mô nhân sự" name={'employeesNumber  '}>
                            <Select
                                value={workspace.memberSize}
                                defaultValue="LT50"
                                size="large"
                                onChange={(value) =>
                                    setWorkspace((prevState) => ({
                                        ...prevState,
                                        memberSize: value,
                                    }))
                                }
                                options={[
                                    {
                                        value: 'LT50',
                                        label: 'Nhỏ hơn 50 nhân sự',
                                    },
                                    {
                                        value: 'between50And100',
                                        label: 'Từ 50 đến 100 nhân sự',
                                    },
                                    {
                                        value: 'GT100',
                                        label: 'Lớn hơn 100 nhân sự',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '-12px' }}>
                    <Col span={12} offset={12}>
                        <Row>
                            <Col span={4} offset={2}>
                                <Form.Item>
                                    <Button
                                        size="large"
                                        type="primary"
                                        danger
                                        block
                                        htmlType="submit"
                                        style={{ margin: '0 12px' }}
                                        onClick={handleCancel}
                                    >
                                        <span>Huỷ</span>
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={16} offset={2}>
                                <Form.Item style={{ margin: '0 12px' }}>
                                    <Button size="large" block type="primary" htmlType="submit">
                                        <span>Tạo không gian làm việc</span>
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default WorkspaceModal;
