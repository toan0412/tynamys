import { Modal, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './DeleteModal.module.scss';

const cx = classNames.bind(styles);

function DeleteModal({ modalDelete, handleCancel, titleModal, content, handleDelete }) {
    return (
        <Modal open={modalDelete} footer={null} className={cx('modal-delete')} onCancel={handleCancel}>
            <div className={cx('delete-modal-body')}>
                <div className={cx('title')}>{titleModal}</div>
                <div className={cx('content')}>
                    <img src="https://mys.tinasoft.com.vn/img/modal-confirm-img/robot-mys.svg" alt="robot" />
                    <span>{content}</span>
                </div>
            </div>
            <div className={cx('delete-modal-btn')}>
                <Button style={{ width: '110px' }} size="large" onClick={handleCancel}>
                    Huỷ
                </Button>
                <Button style={{ width: '110px' }} size="large" type="primary" ghost danger onClick={handleDelete}>
                    Xoá
                </Button>
            </div>
        </Modal>
    );
}

export default DeleteModal;
