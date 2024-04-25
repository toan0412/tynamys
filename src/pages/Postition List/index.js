import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './PositionList.module.scss';
import { Tree, Avatar, Dropdown, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { getDepartmentByFilter, getPositionApi } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';
import useDebounce from '~/hooks/useDebounce';
import { icon } from '@fortawesome/fontawesome-svg-core';

const cx = classNames.bind(styles);

function PositionList() {
    const [departmentList, setDepartmentList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let res = await getDepartmentByFilter('DEPT_1');
            let res2 = await getPositionApi();
            setDepartmentList(res.data);
            setPositionList(res2.data);
        };
        fetchData().catch(console.error);
    }, []);

    const treeDepartmentData = departmentList.map((department, indexParent) => ({
        id: department.id,
        title: department.displayName,
        key: `0-${indexParent}`,
        style: { fontSize: '1.6rem', fontWeight: '400', color: '#3d3d3d' },
        icon: (
            <span style={{ paddingRight: '12px', fontSize: ' 1.8rem' }}>
                <HomeOutlined />
            </span>
        ),
        children: department.children.map((child, indexChild) => ({
            id: department.id,
            title: child.displayName,
            key: `0-${indexParent}-${indexChild}`,
            style: { color: '#575757', fontSize: '1.6rem', fontWeight: '300' },
        })),
    }));

    const onSelect = async (keys, info) => {
        let res = await getPositionApi(info.node.id);
        setPositionList(res.data);
    };

    return (
        <div className={cx('position-manager')}>
            <div className={cx('tree-position-wrapper')}>
                <div className={cx('title')}>Danh sách nhóm</div>
                <div className={cx('custom-scrollbar')}>
                    <Tree
                        treeData={treeDepartmentData}
                        showIcon
                        defaultExpandAll
                        onSelect={onSelect}
                        defaultSelectedKeys={null}
                    />
                </div>
            </div>
            <div className={cx('position-list-wrapper')}>
                <div className={cx('title')}>Danh sách chức vụ</div>
                <div className={cx('list-card')}>
                    {positionList.map((position) => (
                        <div className={cx('card-position-manager')}>
                            <div className={cx('content-wrap')}>
                                <h3>{position.displayName}</h3>
                                <Dropdown
                                    className={cx('menu-dropdown')}
                                    menu={{
                                        items: [
                                            {
                                                label: <span>Xem chi tiết</span>,
                                                key: '0',
                                            },
                                            {
                                                type: 'divider',
                                            },
                                            {
                                                label: <spam>Sửa chức vụ</spam>,
                                                key: '1',
                                            },
                                            {
                                                type: 'divider',
                                            },
                                            {
                                                label: <spam>Xoá chức vụ</spam>,
                                                key: '3',
                                            },
                                        ],
                                    }}
                                    trigger={['click']}
                                >
                                    <div>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <span className={cx('three-dot')}>...</span>
                                            </Space>
                                        </a>
                                    </div>
                                </Dropdown>
                                <div className={cx('position-name-wrap')}>
                                    <span>Quyền: </span>
                                    <div className={cx('position-tag-wrap')}>
                                        {position.permissions.length > 0
                                            ? position.permissions.map((permission) => (
                                                  <div className={cx('position-tag-item')}>
                                                      {permission === 'MNG_DEPT' && <div>Quản lý nhóm</div>}
                                                      {permission === 'MNG_MEMBER' && <div>Quản lý nhân sự</div>}
                                                      {permission === 'MNG_POSITION' && <div>Quản lý chức vụ</div>}
                                                      {permission === 'MNG_NEWS' && <div>Quản lý tin tức</div>}
                                                  </div>
                                              ))
                                            : null}
                                    </div>
                                </div>
                                <div className={cx('position-member')}>
                                    <span>Thành viên: </span>
                                    <Avatar.Group>
                                        {position.members.length > 0
                                            ? position.members.map((member) => (
                                                  <Avatar src={member.avatarUrl} alt="avatar" size={26} />
                                              ))
                                            : '0'}
                                    </Avatar.Group>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PositionList;
