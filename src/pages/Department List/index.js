import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import styles from './DepartmentList.module.scss';
import { Avatar, Input } from 'antd';
import { getDepartmentSearchApi, getDepartmentApi } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';
import DepartmentLevel from '~/components/Layout/components/DepartmentLevel/DepartmentLevel';

const { Search } = Input;
const cx = classNames.bind(styles);

function DepartmentList() {
    const [searchValue, setSearchValue] = useState('');
    const [memberList, setMemberList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const { user } = useContext(UserContext);

    const onHandleChange = async (e) => {
        setSearchValue(e.target.value);
        let res2 = await getDepartmentSearchApi(e.target.value);
        setMemberList(res2);
    };

    useEffect(() => {
        const fetchData = async () => {
            let res = await getDepartmentApi();
            let res2 = await getDepartmentSearchApi(searchValue, '');
            setDepartmentList(res.data);
            setMemberList(res2);
        };
        fetchData().catch(console.error);
    }, [user, searchValue]);

    return (
        <div className={cx('department-manager')}>
            <div className={cx('content-department')}>
                <div className={cx('content-main')}>
                    <div className={cx('content-heading')}>
                        <h2>Danh sách nhóm</h2>
                    </div>

                    <div className={cx('list-column-wrapper')}>
                        <DepartmentLevel title="Cấp 1" type="DEPT_1" departmentList={departmentList} />
                        <DepartmentLevel title="Cấp 2" type="DEPT_2" departmentList={departmentList} />
                        <DepartmentLevel title="Cấp 3" type="DEPT_3" departmentList={departmentList} />
                    </div>
                </div>
                <div className={cx('member-list-dept')}>
                    <div className={cx('member-list')}>
                        <div className={cx('member-list-header')}>
                            <div className={cx('member-list-title')}>
                                Danh sách thành viên ({memberList.meta ? memberList.meta.totalItems : 0})
                            </div>
                            <div className={cx('member-list-search')}>
                                <Search
                                    placeholder="Tìm kiếm"
                                    value={searchValue}
                                    allowClear
                                    onChange={onHandleChange}
                                />
                            </div>
                            <div className={cx('member-list-content')}>
                                {memberList.data && Array.isArray(memberList.data)
                                    ? memberList.data.map((member) => (
                                          <div className={cx('member-item')}>
                                              <div className={cx('member-item-avatar')}>
                                                  <Avatar src={member.user.avatarUrl} size={45}></Avatar>
                                              </div>
                                              <p className={cx('member-item-body')}>{member.user.fullName}</p>
                                          </div>
                                      ))
                                    : []}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepartmentList;
