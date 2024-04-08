import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Form, Input, Button } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import images from '~/assets';

const cx = classNames.bind(styles);

function Login() {
    const [form] = Form.useForm();

    const onFinish = (e) => {
        console.log(e);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <a href="https://tinamys.com/about">
                    <img src={images.logo} alt="Tinamys" />
                </a>
            </div>
            <div className={cx('container')}>
                <div className={cx('container-login')}>
                    <header className={cx('login-header')}>
                        <h1 className={cx('login-text')}>Đăng nhập</h1>
                        <p className={cx('login-desc')}>Hoàn thành các thông tin chi tiết dưới đây</p>
                    </header>
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
                            <Input size="large" placeholder="Email hoặc tên tài khoản" />
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
                            <Input.Password size="large" type="password" placeholder="Mật khẩu" />
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
                            <Button size="large" block type="primary" htmlType="submit">
                                Đăng nhập
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
                </div>
            </div>
            <div className={cx('text-title')}>
                Mapping Your <br /> Success
            </div>
            <div className={cx('footer')}>
                <a href="https://tinasoft.vn/">Powered by Tinasoft</a>
                <a href="https://tinasoft.vn/">© 2023 TINASOFT VIỆT NAM</a>
            </div>
        </div>
    );
}

export default Login;