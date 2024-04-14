import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './WorkspaceDropDown.module.scss';
import { UserContext } from '~/context/UserContext';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import WorkspaceModal from '../WorkspaceModal/WorkspaceModal';
import { patchAccountInfoApi } from '~/services/UserServices';

const cx = classNames.bind(styles);

function WorkspaceDropDown() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, getWorkspaceContext } = useContext(UserContext);
    console.log('xxx', user.companiesList);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleChangeWorkspace = async (workspaceId) => {
        let res = await patchAccountInfoApi(workspaceId);
        getWorkspaceContext(res.data.ability);
    };

    const items = user.companiesList
        ? user.companiesList.map((company, index) => ({
              key: `${index + 1}`,
              label: (
                  <button onClick={() => handleChangeWorkspace(company.id)} style={{ backgroundColor: 'inherit' }}>
                      <div className={cx('workspace-dropdown-item')} key={company.id}>
                          <img className={cx('logo-company')} src={company.photoUrl} alt="logo company" />
                          <span>{company.displayName}</span>
                      </div>
                  </button>
              ),
          }))
        : [];

    items.push({
        key: 'createWorkspace',
        label: (
            <>
                <Button type="primary" ghost key="createWorkspaceButton" onClick={showModal}>
                    <FontAwesomeIcon icon={faAdd} />
                    <span>Tạo không gian làm việc</span>
                </Button>
            </>
        ),
    });
    return (
        <>
            <Dropdown
                menu={{ items }}
                trigger={['click']}
                overlayClassName={cx('workspace-dropdown')}
                placement="bottomLeft"
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Không gian làm việc
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <WorkspaceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    );
}

export default WorkspaceDropDown;
