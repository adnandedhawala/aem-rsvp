import { Button, Divider, Form, Input, Radio } from "antd";

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

      <Form.Item
        className="mb-0"
        label="I want to register for Zakereen Barnamaj (Mane Zakereen Barnamj ma shamil thavu che)"
        name="enrolled_for_khidmat"
        rules={[
          {
            required: true,
            message: "Select Yes or No!"
          }
        ]}
      >
        <Radio.Group optionType="button" buttonStyle="solid" className="mt-2">
          <Radio value="yes"> Yes </Radio>
          <Radio value="no"> No </Radio>
        </Radio.Group>
      </Form.Item>

      {/* {enrolled_for === "yes" && (
        <div className="my-4 flex flex-col items-center justify-center">
          <p className="text-lg mb-2 text-center font-semibold">
            Click Image below to Join WhatsApp Group of Zakereen Barnamaj
          </p>
          <a
            target="_blank"
            href="https://chat.whatsapp.com/ErqyyVWB32Z2sKdCVeL3OP"
            rel="noreferrer"
          >
            <Image
              className="border-2 border-solid border-black p-2"
              src="/sample.png"
              alt="logo"
              width={200}
              height={270}
            />
          </a>
        </div>
      )} */}

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
