import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Divider, Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
const { useToken } = theme;

const cx = classNames.bind(styles);

const items = [
    {
        key: '1',
        label: (
            <div className={cx('workspace-dropdown-item')}>
                <img
                    className={cx('logo-company')}
                    src="https://ui-avatars.com/api/?size=256&fontSize=0.5&length=2&name=a&rounded=false&bold=false&background=00897b&color=FFFFFF&uppercase=true&format=png"
                    alt="logo company"
                />
                <span>adu a toàn</span>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        disabled: true,
    },
];
function Header() {
    const { token } = useToken();

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
    };
    const menuStyle = {
        boxShadow: 'none',
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('workspace')}>
                    <img className={cx('logo')} src={images.logo} alt="Tinamys logo" />
                    <Dropdown
                        className={cx('header-dropdown')}
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                        dropdownRender={(menu) => (
                            <div style={contentStyle}>
                                {React.cloneElement(menu, {
                                    style: menuStyle,
                                })}
                                <Divider
                                    style={{
                                        margin: 0,
                                    }}
                                />
                                <Space
                                    style={{
                                        padding: 4,
                                    }}
                                >
                                    <Button type="primary" ghost>
                                        <FontAwesomeIcon icon={faAdd} />
                                        <span>Tạo không gian làm việc</span>
                                    </Button>
                                </Space>
                            </div>
                        )}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Không gian làm việc
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                    <div className={cx('add-quick-card-btn')}>
                        <Button type="primary">Tạo nhanh</Button>
                    </div>
                </div>

                <div className={cx('action')}>
                    <div className={cx('action-item')}>
                        <img src={images.search} alt="search" />
                    </div>
                    <div className={cx('action-item')}>
                        <img src={images.graduate} alt="graduate" />
                    </div>
                    <div className={cx('action-item')}>
                        <img src={images.bell} alt="bell" />
                    </div>
                    <div className={cx('action-item')}>
                        <img src={images.question} alt="question" />
                    </div>
                    <div className={cx('action-item')}>
                        <img src={images.creditCard} alt="creditCard" />
                    </div>
                    <div className={cx('avatar')}>
                        <img
                            src="https://lh3.googleusercontent.com/a/ACg8ocIp6zIFl2G32WoIaZW3jYyo3ge7KLKLzW7FuCTFqufS5XQ4F4Sy=s96-c"
                            alt="avatar"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
