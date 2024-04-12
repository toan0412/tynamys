import React from 'react';
import classNames from 'classnames/bind';
import styles from './CardModal.module.scss';
import { Modal, Form, Input, Button, Radio, Select, DatePicker, Divider } from 'antd';
import { useState } from 'react';
import moment from 'moment';

const cx = classNames.bind(styles);

function CardModal({ isModalOpen, setIsModalOpen }) {
    const [cardTitle, setCardTitle] = useState('');
    const [form] = Form.useForm();
    const [pickerType, setPickerType] = useState('year');
    const [currentDate, setCurrentDate] = useState(moment());
    const [isCompany, setIsCompany] = useState(false);
    const [isGroup, setIsGroup] = useState(false);

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //submit form
    const onFinish = async () => {};

    const handleDateRadioChange = (value) => {
        switch (value) {
            case 1:
                setPickerType('year');
                setCurrentDate(moment());
                break;
            case 2:
                setPickerType('quarter');
                setCurrentDate(moment());
                break;
            case 3:
                setPickerType('month');
                setCurrentDate(moment());
                break;
            case 4:
                setPickerType('week');
                setCurrentDate(moment());
                break;
            default:
                break;
        }
    };

    const handleTargetRadioChange = (value) => {
        switch (value) {
            case 1:
                setIsCompany(false);
                break;
            case 2:
                setIsCompany(true);
                break;
            default:
                break;
        }
    };

    const checkTargetLevel = (value) => {
        switch (value) {
            case 1:
                setIsGroup(true);
                break;
            case 2:
                setIsGroup(false);
                break;
            case 3:
                setIsGroup(true);
                break;
            default:
                break;
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={410}
            size="small"
            className={cx('card-modal')}
        >
            <header className={cx('modal-header')}>
                <h3>Tạo thẻ nhanh</h3>
                <Divider style={{ margin: '12px 0' }} />
            </header>
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
                <Form.Item
                    className={cx('custom-label')}
                    label="Tiêu đề thẻ mục tiêu "
                    name={'myEmail'}
                    rules={[
                        {
                            required: true,
                            message: 'Tiêu đề thẻ mục tiêu không được để trống',
                        },
                    ]}
                >
                    <Input value={cardTitle} size="large" onChange={(e) => setCardTitle(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Mục tiêu"
                    name={'myTarget'}
                    className={cx('custom-label')}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group
                        name="target"
                        defaultValue={1}
                        onChange={(e) => handleTargetRadioChange(e.target.value)}
                    >
                        <Radio value={1}>Công ty</Radio>
                        <Radio value={2}>Cá nhân</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    hidden={isCompany}
                    label="Level Mục tiêu"
                    name={'myTartgetLevel'}
                    className={cx('custom-label')}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group name="targetLevel" defaultValue={1} onChange={(e) => checkTargetLevel(e.target.value)}>
                        <Radio value={1}>Công ty</Radio>
                        <Radio value={2}>Nhóm</Radio>
                        <Radio value={3}>Nhân sự</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    hidden={isCompany}
                    label="Nhóm"
                    name={'myGroup'}
                    rules={[
                        {
                            required: true,
                            message: 'Nhóm là bắt buộc',
                        },
                    ]}
                    className={cx('custom-label')}
                >
                    <Select
                        disabled={isGroup}
                        name="group"
                        size="large"
                        options={[
                            { value: 'group1', label: 'Nhóm 1' },
                            { value: 'group2', label: 'Nhóm 2' },
                            { value: 'group3', label: 'Nhóm 3' },
                            { value: 'group4', label: 'Nhóm 4' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Vị trí của thẻ mục tiêu"
                    name={'myTargetCardLocation'}
                    className={cx('custom-radio')}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Radio.Group
                        name="targetCardLocation"
                        defaultValue={1}
                        onChange={(e) => handleDateRadioChange(e.target.value)}
                    >
                        <Radio value={1}>Thẻ năm</Radio>
                        <Radio value={2}>Thẻ quý</Radio>
                        <Radio value={3}>Thẻ tháng</Radio>
                        <Radio value={4}>Thẻ tuần</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <DatePicker size="large" style={{ width: '100%' }} picker={pickerType} />
                </Form.Item>

                <Form.Item
                    className={cx('submit-btn')}
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button size="large" block type="primary" htmlType="submit">
                        <span>Thêm thẻ</span>
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CardModal;
