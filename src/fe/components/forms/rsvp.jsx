import { Button, Card, Form, Input, Radio } from "antd";
import { useEffect } from "react";

export const InviteeRSVPForm = ({
  onFinish,
  isLoading,
  inviteeList,
  file_number,
  handleCancel
}) => {
  const [rsvpForm] = Form.useForm();

  const handleSubmit = values => {
    onFinish(values, rsvpForm);
  };

  useEffect(() => {
    rsvpForm.setFieldValue("file_number", file_number);
  }, [file_number]);

  return (
    <Form
      name="searchfile"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      form={rsvpForm}
      className="w-full"
      size="large"
    >
      <Form.Item
        label="File Number"
        name="file_number"
        rules={[
          {
            required: true,
            message: "Please enter file number!"
          }
        ]}
      >
        <Input placeholder="FIle Number" disabled />
      </Form.Item>

      {inviteeList.map(value => {
        const { _id, name, itsId } = value;
        return (
          <Card className="mb-4 card p-4" key={_id}>
            <div className="flex flex-col items-start">
              <p className="text-md">{itsId}</p>
              <p className="mb-4 text-lg font-light">{name}</p>

              <div className="flex flex-col w-full">
                <p className=" text-gray-700 text-lg">Will attend darees ?</p>
                <Form.Item
                  rules={[
                    { required: true, message: "Please select yes or no! " }
                  ]}
                  className="mb-0"
                  name={itsId}
                >
                  <Radio.Group size="large">
                    <Radio value="true">Yes</Radio>
                    <Radio value="false">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </Card>
        );
      })}

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
