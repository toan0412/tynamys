import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import styles from './InfoModify.module.scss';
import { Avatar, Button, Col, Form, Input, Progress, Row, Select } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getDayTaskApi, getGoalApi } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';
import moment from 'moment';

const cx = classNames.bind(styles);

function InfoModify() {
    return (
        <div className={cx('content')}>
            <div className={cx('modify-info')}>
                <div className={cx('title-edit-account')}>
                    <h3>Thông tin công ty</h3>
                </div>
                <div className={cx('info-account')}>
                    <div className={cx('form-bing-avatar')}>
                        <div className={cx('company-avatar')}>
                            <Avatar
                                size={210}
                                src="https://ui-avatars.com/api/?size=256&fontSize=0.5&length=2&name=Testtintuc&rounded=false&bold=false&background=5d4037&color=FFFFFF&uppercase=true&format=png"
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className={cx('form-account')}>
                        <Form
                            labelCol={{ span: 24 }}
                            layout="horizontal"
                            style={{ maxWidth: '770px' }}
                            className="form-content"
                        >
                            <Row style={{ padding: '0 8px', rowGap: '8px' }}>
                                <Col style={{ padding: '0 8px' }} span={12}>
                                    <Form.Item label="Tên công ty" className={cx('custom-label')}>
                                        <Input size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Loại hình không gian làm việc"
                                        name="typeOfWorkspace"
                                        className={cx('custom-label')}
                                    >
                                        <Select
                                            size="large"
                                            defaultValue="company"
                                            options={[
                                                { value: 'company', label: 'Công ty' },
                                                { value: 'personal', label: 'Cá nhân' },
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại" className={cx('custom-label')}>
                                        <Input size="large" />
                                    </Form.Item>
                                </Col>
                                <Col style={{ padding: '0 8px' }} span={12}>
                                    <Form.Item label="Website" className={cx('custom-label')}>
                                        <Input size="large" />
                                    </Form.Item>
                                    <Form.Item label="Email" className={cx('custom-label')}>
                                        <Input size="large" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số lượng nhân sự"
                                        name="numberOfAbility"
                                        className={cx('custom-label')}
                                    >
                                        <Select
                                            size="large"
                                            defaultValue="LT50"
                                            options={[
                                                { value: 'LT50', label: 'Nhỏ hơn 50 nhân sự' },
                                                { value: 'BW50And100', label: 'Từ 50 đến 100 nhân sự' },
                                                { value: 'GT100', label: 'Lớn hơn 100 nhân sự' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className={cx('btn-submit')}>
                                <Button type="primary" size="large" style={{ height: '48px' }}>
                                    Lưu thông tin
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoModify;
