import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Home.module.scss';
import { DatePicker, Table } from 'antd';
import moment from 'moment';
import './Home.scss';

const cx = classNames.bind(styles);

function Home() {
    const [selectedDate, setSelectedDate] = useState(new moment());
    const dayMissionData = [];
    const companyTargetData = [];
    const personalTargetData = [];

    const dayMissionColumns = [
        {
            title: 'STT',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tên mục tiêu',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Nhân sự',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const companyTargetColumns = [
        {
            title: 'STT',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tên mục tiêu',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Nhân sự',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tiến độ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const personalTargetColumns = [
        {
            title: 'STT',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tên mục tiêu',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Nhân sự',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Thời gian',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tiến độ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const handleChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className={cx('homepage')}>
            <div className={cx('table-target-company')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Nhiệm vụ ngày</div>
                    <DatePicker onChange={handleChange} picker="date" />
                </div>
                <Table dataSource={dayMissionData} columns={dayMissionColumns} />
            </div>
            <div className={cx('table-target-company')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Mục tiêu công ty</div>
                    <DatePicker onChange={handleChange} picker="date" />
                </div>
                <Table dataSource={companyTargetData} columns={companyTargetColumns} />
            </div>
            <div className={cx('table-target-company')}>
                <div className={cx('title-wrapper')}>
                    <div className={cx('title')}>Mục tiêu công ty</div>
                    <DatePicker onChange={handleChange} picker="date" />
                </div>
                <Table dataSource={personalTargetData} columns={personalTargetColumns} />
            </div>
        </div>
    );
}

export default Home;
