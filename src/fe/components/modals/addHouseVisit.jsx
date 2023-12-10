/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable security/detect-object-injection */
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useMemo } from "react";
import subsectorData from "@/appConstants/subsector.json";

export const AddHouseVisitModal = ({
  open,
  handleCancel,
  handleSubmit,
  showAllDetails,
  loading,
  memberData
}) => {
  const [houseVisitform] = Form.useForm();

  const isFieldDisabled = useMemo(() => {
    return memberData !== null;
  }, [memberData]);

  const sectorName = Form.useWatch("sector", houseVisitform);

  const subsectorList = useMemo(() => {
    if (!sectorName || sectorName === "") return [];
    return subsectorData[sectorName];
  }, [sectorName]);

  const handleSectorChange = () => {
    houseVisitform.setFieldValue("sub_sector", null);
  };

  const handleFormFinish = values => {
    handleSubmit(values, houseVisitform);
  };

  return (
    <Modal footer={null} title="Add House" open={open} onCancel={handleCancel}>
      <Form
        onFinish={handleFormFinish}
        name="addHouse"
        layout="vertical"
        form={houseVisitform}
        className="form-no-mb"
      >
        {loading ? (
          <div className="w-full p-8 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Form.Item
              label="ITS"
              name="itsId"
              rules={[
                {
                  required: true,
                  message: "Please input your its!"
                },
                {
                  pattern: /^\d{8}$/,
                  message: "enter valid its!"
                }
              ]}
            >
              <Input disabled={showAllDetails} placeholder="Enter ITS" />
            </Form.Item>
            {showAllDetails ? (
              <>
                {isFieldDisabled ? (
                  <Form.Item
                    hidden={!isFieldDisabled}
                    label="HOF ITS"
                    name="hof_id"
                    rules={[
                      {
                        pattern: /^\d{8}$/,
                        message: "enter valid ITS!"
                      }
                    ]}
                  >
                    <Input
                      placeholder="Enter HOF ITS"
                      disabled={isFieldDisabled}
                    />
                  </Form.Item>
                ) : null}
                {isFieldDisabled ? (
                  <Form.Item
                    label="File Number"
                    name="tanzeem_file_no"
                    rules={[
                      {
                        pattern: /^\d{1,4}$/,
                        message: "enter valid file!"
                      }
                    ]}
                  >
                    <Input
                      placeholder="Enter file number"
                      disabled={isFieldDisabled}
                    />
                  </Form.Item>
                ) : null}
                <Form.Item
                  label="Full Name"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "enter full name!"
                    }
                  ]}
                >
                  <Input
                    placeholder="Enter full name"
                    disabled={isFieldDisabled}
                  />
                </Form.Item>
                <Form.Item
                  label="Contact"
                  name="contact"
                  rules={[
                    {
                      pattern: /^(\+\d{1,5}|0)?[7-9]\d{9}$/,
                      message: "enter valid contact number!"
                    }
                  ]}
                >
                  <Input placeholder="Enter Contact" />
                </Form.Item>
                <Form.Item
                  label="Mohallah"
                  name="sector"
                  rules={[
                    {
                      required: true,
                      message: "select Mohallah!"
                    }
                  ]}
                >
                  <Select
                    onChange={handleSectorChange}
                    placeholder="Select Mohallah"
                  >
                    {Object.keys(subsectorData).map(value => (
                      <Select.Option key={value} value={value}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Sub Sector"
                  name="sub_sector"
                  rules={[
                    {
                      required: true,
                      message: "select sub sector!"
                    }
                  ]}
                >
                  <Select placeholder="Select Sub Sector">
                    {subsectorList.map(value => (
                      <Select.Option key={value} value={value}>
                        {value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "enter address!"
                    }
                  ]}
                >
                  <Input.TextArea placeholder="Address" />
                </Form.Item>
              </>
            ) : null}
          </>
        )}

        <Form.Item>
          <Button disabled={loading} type="primary" htmlType="submit">
            {showAllDetails ? "Submit" : "Search"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
