import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Divider, Button, theme } from 'antd';
const { useToken } = theme;

const cx = classNames.bind(styles);

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
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
                                        padding: 8,
                                    }}
                                >
                                    <Button type="primary">Click me!</Button>
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
                </div>

                <div className={cx('action')}></div>
            </div>
        </header>
    );
}

export default Header;
