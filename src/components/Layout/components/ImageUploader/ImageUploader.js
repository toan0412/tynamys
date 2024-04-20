import React from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageUploader = ({ fileList = [], onUpload }) => {
    const handlePreview = async (file) => {
        if (file.url) {
            window.open(file.url, '_blank');
        }
    };

    const handleRemove = () => {
        onUpload([]);
    };

    const handleChangeImage = ({ fileList }) => {
        onUpload(fileList);
    };

    const uploadButton = (
        <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>
                Tải lên <br /> Kích thước khuyến nghị: 250 pixels
            </div>
        </div>
    );

    return (
        <Upload
            fileList={fileList}
            listType="picture-card"
            onPreview={handlePreview}
            onRemove={handleRemove}
            onChange={handleChangeImage}
            className="custom-upload"
        >
            {fileList.length >= 1 ? null : uploadButton}
        </Upload>
    );
};

export default ImageUploader;
