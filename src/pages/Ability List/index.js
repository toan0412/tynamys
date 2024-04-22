import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './AbilityList.module.scss';
import { Avatar, Table, Tag, Input, Button } from 'antd';
import { PlusOutlined, FileAddOutlined, LockOutlined } from '@ant-design/icons';
import { getDepartmentSearchApi } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';
import './AbilityList.scss';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);
const { Search } = Input;

function AbilityList() {
    const { user } = useContext(UserContext);
    const [abilityList, setAbilityList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 700);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await getDepartmentSearchApi(debouncedValue, '');
                setAbilityList(res.data);
            } catch (error) {
                console.error('Error fetching notification data:', error);
            }
        };
        fetchData();
    }, [debouncedValue]);

    const abilityListData = Array.isArray(abilityList)
        ? abilityList.map((ability, index) => {
              return {
                  key: index,
                  index: index + 1,
                  fullName: [ability.user.avatarUrl, ability.user.fullName],
                  status: ability.abilityUserStatus,
                  email: ability.user.email,
                  groups: ability.abilityDepts,
                  position: ability.user.role,
                  phone: ability.user.profile.phone,
              };
          })
        : [];

    const abilityListColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (fullName) => (
                <div className={cx('full-name-field')}>
                    <Avatar src={fullName[0]} alt="avatar" />
                    <span>{fullName[1]}</span>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (status === 5) {
                    return 'Đang chờ';
                } else if (status === 0) {
                    return 'Hoạt động';
                } else {
                    return 'Không xác định';
                }
            },
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Nhóm',
            dataIndex: 'groups',
            key: 'groups',
            render: (groups) => (
                <div className={cx('group-wrap')}>
                    {Array.isArray(groups) &&
                        groups.map((group) => {
                            if (group && group.dept && group.dept.displayName) {
                                return <Tag color="blue">{group.dept.displayName}</Tag>;
                            } else {
                                return null;
                            }
                        })}
                </div>
            ),
        },

        {
            title: 'Chức vụ',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
    ];
    return (
        <div className={cx('content')}>
            <div className={cx('title-wrapper')}>
                <div className={cx('title')}>Danh sách nhân sự</div>
            </div>
            <div className={cx('feature-area')}>
                <div className={cx('search-filter')}>
                    <Search
                        placeholder="Tìm kiếm"
                        style={{ width: '300px' }}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                        }}
                    />
                </div>
                <div className={cx('menu-action')}>
                    <Button type="primary">
                        <PlusOutlined style={{ fontSize: '1.4rem' }} />
                        Thêm
                    </Button>
                    <Button type="primary" style={{ backgroundColor: '#0f7c41' }}>
                        <FileAddOutlined />
                        Nhập Excel
                    </Button>
                    <Button type="primary" danger disabled={!hasSelected}>
                        <LockOutlined />
                        Khoá
                    </Button>
                </div>
            </div>
            <Table
                rowSelection={rowSelection}
                dataSource={abilityListData}
                columns={abilityListColumn}
                className="ability-table"
            />
        </div>
    );
}

export default AbilityList;
