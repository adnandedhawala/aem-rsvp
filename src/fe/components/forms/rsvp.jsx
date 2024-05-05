import { Button, Divider, Form, Input, Radio, Space } from "antd";

export const InviteeRSVPForm = ({
  onFinish,
  isLoading,
  member,
  handleCancel
}) => {
  const [rsvpForm] = Form.useForm();

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
      requiredMark={false}
      initialValues={{
        name: member?.full_name,
        file_number: member?.tanzeem_file_no,
        itsId: member?._id,
        mobile: member?.mobile,
        sector: member?.sector,
        sub_sector: member?.sub_sector,
        age: member?.age,
        gender: member?.gender
      }}
    >
      <Divider />
      <div className="flex flex-col mb-6">
        <p className="text-lg">{member?.full_name || "-"}</p>
        <p>File Number : {member?.tanzeem_file_no || "-"}</p>
        <p>ITS : {member?._id || "-"}</p>
        <p>Contact : {member?.mobile || "-"}</p>
      </div>
      <Divider />

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
      <Form.Item name="age" className="hidden">
        <Input disabled />
      </Form.Item>
      <Form.Item name="gender" className="hidden">
        <Input disabled />
      </Form.Item>

      <p className="text-sm mb-4 text-[#333]">
        Sayedi Abdulqadir Hakimuddin AQ na urs Mubarak na Miqaat par Mamlook e
        Sayedna TUS / Amte Sayedna, aap Maula ni khair ni Rasam{" "}
        {"'Sabeel ul khaire wal barakat'"} maa
      </p>

      <Form.Item
        className="mb-0"
        label="Mari Montly Residence Sabeel ma :"
        name="enrolled_for_khidmat"
        rules={[
          {
            required: true,
            message: "Please select an option!"
          }
        ]}
      >
        <Radio.Group className="mt-2">
          <Space direction="vertical">
            <Radio value="50%"> 50% </Radio>
            <p className="text-sm text-gray-600" key="50%">
              If your current Sabeel is 1000/- per month than it will become
              1500/- per month.
            </p>
            <Radio value="100%"> 100% </Radio>
            <p className="text-sm text-gray-600" key="100%">
              If your current Sabeel is 1000/- per month than it will become
              2000/- per month.
            </p>
          </Space>
        </Radio.Group>
      </Form.Item>

      <p className="text-sm my-4 text-[#333]">
        si Idafah (increment) em niyat araz Karu chu. Kindly update the Jamat
        system to record my above Niyat Takhmeen (Applicable from Moharram ul
        Harram 1446)
      </p>

      <Form.Item className="flex justify-center mt-4">
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
