import { Button, Divider, Form, Input, Radio, Select } from "antd";

export const InviteeRSVPForm = ({
  onFinish,
  isLoading,
  member,
  handleCancel
}) => {
  const [rsvpForm] = Form.useForm();

  const enrolled_for = Form.useWatch("enrolled_for_khidmat", rsvpForm);

  const handleSubmit = values => {
    onFinish(values, rsvpForm);
  };

  return (
    <Form
      name="searchfile"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      form={rsvpForm}
      className="w-full"
      size="large"
      initialValues={{
        name: member?.full_name,
        file_number: member?.tanzeem_file_no,
        itsId: member?._id,
        mobile: member?.mobile,
        sector: member?.sector,
        sub_sector: member?.sub_sector
      }}
    >
      <Divider />
      <div className="flex flex-col mb-4">
        <p className="text-lg">{member?.full_name || "-"}</p>
        <p>File Number : {member?.tanzeem_file_no || "-"}</p>
        <p>ITS : {member?._id || "-"}</p>
        <p>Contact : {member?.mobile || "-"}</p>
      </div>

      <Form.Item name="itsId" className="hidden">
        <Input disabled />
      </Form.Item>
      <Form.Item name="file_number" className="hidden">
        <Input disabled />
      </Form.Item>
      <Form.Item name="name" className="hidden">
        <Input disabled />
      </Form.Item>
      <Form.Item name="mobile" className="hidden">
        <Input disabled />
      </Form.Item>
      <Form.Item name="sector" className="hidden">
        <Input disabled />
      </Form.Item>
      <Form.Item name="sub_sector" className="hidden">
        <Input disabled />
      </Form.Item>

      <Form.Item
        className="mb-0"
        label="Are you enrolled in any Committee ? (Burhani Gaurds, Sunrise, Toloba, Shabab)"
        name="enrolled_for_khidmat"
        rules={[
          {
            required: true,
            message: "Select Yes / No!"
          }
        ]}
      >
        <Radio.Group>
          <Radio value="yes"> Yes </Radio>
          <Radio value="no"> No </Radio>
        </Radio.Group>
      </Form.Item>

      {enrolled_for === "no" ? (
        <Form.Item
          className="mb-2"
          label="Would like to enroll for any Khidmat?"
          name="khidmat_name"
          rules={[
            {
              required: true,
              message: "Please Select a option!"
            }
          ]}
          extra="Please Select Khidmat that you are interested in. If not interested, select None."
        >
          <Select>
            <Select.Option value="None">None</Select.Option>
            <Select.Option value="Venue setup">Venue setup</Select.Option>
            <Select.Option value="Flow management">
              Flow management
            </Select.Option>
            <Select.Option value="Jamarwa ni khidmat">
              Jamarwa ni khidmat
            </Select.Option>
            <Select.Option value="Nazafaat">Safai / Nazafaat</Select.Option>
            <Select.Option value="Transport">Transport</Select.Option>
            <Select.Option value="Dana Committee">Dana Committee</Select.Option>
            <Select.Option value="Tazeen">Tazeen</Select.Option>
            <Select.Option value="Reporting and Documentation">
              Reporting and Documentation
            </Select.Option>
          </Select>
        </Form.Item>
      ) : null}

      <Form.Item
        className="mb-2"
        label="Can you provide utara (accomodation) for Sahebo during these days?"
        name="can_provide_utara"
        rules={[
          {
            required: true,
            message: "Select Yes / No!"
          }
        ]}
      >
        <Radio.Group>
          <Radio value="yes"> Yes </Radio>
          <Radio value="no"> No </Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button disabled={isLoading} type="primary" htmlType="submit">
          Submit
        </Button>
        <Button className="ml-4" disabled={isLoading} onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};
