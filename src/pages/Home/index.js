import classNames from 'classnames/bind';
import { useEffect, useState, useContext } from 'react';
import styles from './Home.module.scss';
import { Avatar, DatePicker, Table, Progress } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getDayTaskApi, getGoalApi } from '~/services/UserServices';
import { UserContext } from '~/context/UserContext';
import moment from 'moment';
import './Home.scss';

const cx = classNames.bind(styles);

dayjs.extend(utc);
dayjs.extend(timezone);

function Home() {
    let currentTime = dayjs().tz('Asia/Ho_Chi_Minh');
    const [dayTaskData, setDayTaskData] = useState([]);
    const [companyGoal, setCompanyGoal] = useState([]);
    const [personalGoal, setPersonalGoal] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                currentTime = dayjs().tz('Asia/Ho_Chi_Minh');
                const currentYear = convertYearString(currentTime);
                const nextYear = convertYearString(currentTime.add(1, 'year'));
                const currentDate = convertDateString(currentTime);
                const nextCurrentDate = convertDateString(currentTime.add(1, 'day'));

                let res = await getDayTaskApi(currentDate, nextCurrentDate);
                let res2 = await getGoalApi(0, currentYear, nextYear);
                let res3 = await getGoalApi(1, currentYear, nextYear);
                setDayTaskData(res.data);
                setCompanyGoal(res2.data);
                setPersonalGoal(res3.data);
            } catch (error) {
                console.error('Error fetching notification data:', error);
            }
        };

        fetchData();
    }, [user]);

    const dateFormat = 'YYYY/MM/DD';
    const convertDateString = (dateString) => {
        return dayjs(dateString, 'YYYY/MM/DD').toISOString();
    };

    const convertYearString = (dateString) => {
        const year = dayjs(dateString).year();
        return dayjs(`${year}-01-01`).toISOString();
    };

    const dayMissionData = Array.isArray(dayTaskData)
        ? dayTaskData.map((task, index) => {
              const { title, assignees, standDate } = task;
              return { index: index + 1, title, assignees, standDate: moment(standDate).format('HH:mm') };
          })
        : [];

    const personalTargetData = Array.isArray(personalGoal)
        ? personalGoal.map((goal, index) => {
              const { title, assignees, standDate, progress } = goal;
              return {
                  index: index + 1,
                  title,
                  assignees,
                  standDate: moment(standDate).format('DD/MM/YYYY'),
                  progress,
              };
          })
        : [];

    const companyTargetData = Array.isArray(companyGoal)
        ? companyGoal.map((goal, index) => {
              const { title, assignees, standDate, progress } = goal;
              return {
                  index: index + 1,
                  title,
                  assignees,
                  standDate: moment(standDate).format('DD/MM/YYYY'),
                  progress,
              };
          })
        : [];

    const handleChange = async (dateString) => {
        const convertedDateString = convertDateString(dateString);
        const nextDayDateString = dayjs(convertedDateString).add(1, 'day').toISOString();
        let res = await getDayTaskApi(convertedDateString, nextDayDateString);
        setDayTaskData(res.data);
    };

    const dayMissionColumns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên mục tiêu',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nhân sự',
            dataIndex: 'assignees',
            key: 'assignees',
            render: (assignees) => (
                <>
                    <Avatar.Group>
                        {assignees.map((assign) => {
                            return <Avatar src={assign.avatarUrl} size={28} />;
                        })}
                    </Avatar.Group>
                </>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'toDate',
            key: 'toDate',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
    ];

    const companyTargetColumns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên mục tiêu',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nhân sự',
            dataIndex: 'assignees',
            key: 'assignees',
            render: (assignees) => (
                <>
                    <Avatar.Group>
                        {assignees.map((assign) => {
                            return <Avatar src={assign.avatarUrl} size={28} />;
                        })}
                    </Avatar.Group>
                </>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'standDate',
            key: 'standDate',
        },
        {
            title: 'Tiến độ',
            dataIndex: 'progress',
            key: 'progess',
            render: (status) => (
                <>
                    <Progress percent={status}></Progress>
                </>
            ),
        },
    ];

    const personalTargetColumns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên mục tiêu',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nhân sự',
            dataIndex: 'assignees',
            key: 'assignees',
            render: (assignees) => (
                <>
                    <Avatar.Group>
                        {assignees.map((assign) => {
                            return <Avatar src={assign.avatarUrl} size={28} />;
                        })}
                    </Avatar.Group>
                </>
            ),
        },
        {
            title: 'Thời gian',
            dataIndex: 'standDate',
            key: 'standDate',
        },
        {
            title: 'Tiến độ',
            dataIndex: 'progress',
            key: 'progess',
            render: (status) => (
                <>
                    <Progress percent={status}></Progress>
                </>
            ),
        },
    ];

    return (
        <div className={cx('homepage')}>
            <div className={cx('table-target-company')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Nhiệm vụ ngày</div>
                    <DatePicker defaultValue={currentTime} format={dateFormat} onChange={handleChange} />
                </div>
                <Table className={cx('home-table')} dataSource={dayMissionData} columns={dayMissionColumns} />
            </div>
            <div className={cx('table-target-company')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Mục tiêu công ty</div>
                </div>
                <Table className={cx('home-table')} dataSource={companyTargetData} columns={companyTargetColumns} />
            </div>
            <div className={cx('table-target-company')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Mục tiêu công ty</div>
                </div>
                <Table className={cx('home-table')} dataSource={personalTargetData} columns={personalTargetColumns} />
            </div>
        </div>
    );
}

export default Home;
