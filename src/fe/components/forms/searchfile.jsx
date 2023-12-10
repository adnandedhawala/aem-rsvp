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
        label="File Number"
        name="file_number"
        rules={[
          {
            required: true,
            message: "Please enter file number!"
          }
        ]}
      >
        <Input placeholder="FIle Number" />
      </Form.Item>

      <Form.Item className="flex justify-center">
        <Button disabled={isLoading} type="primary" htmlType="submit">
          Find
        </Button>
      </Form.Item>
    </Form>
  );
};
