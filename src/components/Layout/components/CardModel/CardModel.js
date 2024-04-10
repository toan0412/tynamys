import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets';
import { Form } from 'antd';

function CardModel() {
    return (
        <Form
            className={cx('login-form')}
            name="signin"
            form={form}
            labelCol={{ span: 24 }}
            initialValues={{
                remember: false,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Email hoặc tên tài khoản"
                name={'myEmail'}
                rules={[
                    {
                        required: true,
                        message: 'Email hoặc tên tài khoản không được để trống',
                    },
                ]}
            >
                <Input
                    value={email}
                    size="large"
                    placeholder="Email hoặc tên tài khoản"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Mật khẩu"
                name={'myPassword'}
                rules={[
                    {
                        required: true,
                        message: 'Mật khẩu không được để trống',
                    },
                    { min: 6, message: 'Mật khẩu không được ngắn hơn 6 ký tự' },
                ]}
            >
                <Input.Password
                    value={password}
                    size="large"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item labelCol={{ span: 0 }}>
                <a className={cx('login-form-forgot')} href="#">
                    Quên mật khẩu?
                </a>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    span: 24,
                }}
            >
                <Button size="large" block type="primary" htmlType="submit" className={cx('submit-btn')}>
                    <span>Đăng nhập</span>
                    {loadingIcon && <FontAwesomeIcon icon={faCircleNotch} spin style={{ marginLeft: '8px' }} />}
                </Button>
            </Form.Item>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            <div className={cx('form-register')}>
                <p>Bạn chưa có tài khoản?</p>
                <div className={cx('text-router-register')}>Đăng ký ngay</div>
            </div>
        </Form>
    );
}

export default CardModel;
