import { Button, Form, Input } from "antd";

export const SearchFileForm = ({ onFinish, isLoading }) => {
  const [searchfile] = Form.useForm();

  const handleSubmit = values => {
    onFinish(values, searchfile);
  };

  return (
    <Form
      name="searchfile"
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
      form={searchfile}
      className="w-full"
      size="large"
    >
      <Form.Item
        label="Marol Jamaat File Number"
        name="fileNumber"
        className="mb-4"
        rules={[
          {
            required: true,
            message: "Please enter file number!"
          },
          {
            pattern: /^\d{1,4}$/,
            message: "enter valid file!"
          }
        ]}
      >
        <Input placeholder="Marol Jamaat File Number" />
      </Form.Item>

      <Form.Item
        label="HOF ITS ID"
        name="itsId"
        rules={[
          {
            required: true,
            message: "Please enter Its Number!"
          },
          {
            pattern: /^\d{8}$/,
            message: "enter valid ITS!"
          }
        ]}
      >
        <Input placeholder="HOF ITS Id" />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button disabled={isLoading} type="primary" htmlType="submit">
          Proceed
        </Button>
      </Form.Item>
    </Form>
  );
};
