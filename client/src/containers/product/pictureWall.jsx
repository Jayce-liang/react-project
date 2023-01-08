import React, { PureComponent } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqDeleteImage } from "../../api/index";
import { BASE_URL } from "../../config/index";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default class PicturesWall extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  getFileNameArry = () => {
    const result = [];
    this.state.fileList.forEach((item) => {
      result.push(item.name);
    });
    return result;
  };

  setFileList = (imgArr) => {
    const fileList = [];
    imgArr.forEach((item, index) => {
      fileList.push({
        uid: -index,
        name: item,
        url: `${BASE_URL}/upload/` + item,
      });
    });
    this.setState({ fileList });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      fileList[fileList.length - 1].url = file.response.data.url;
      fileList[fileList.length - 1].name = file.response.data.name;
    }
    if (file.status === "removed") {
      const result = await reqDeleteImage(file.name);
      if (result.status === 0) message.success("删除成功", 2);
      else message.error("删除失败", 2);
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          method="post"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
