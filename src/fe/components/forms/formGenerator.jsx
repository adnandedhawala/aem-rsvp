import Image from "next/image";
import { RichText } from "../inputs";
import {
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select
} from "antd";
import { RSVP_FIELD_TYPES } from "@/appConstants";

const getInputByType = ({ type, options, placeholder }) => {
  switch (type) {
    case RSVP_FIELD_TYPES.TEXT: {
      return <Input placeholder={placeholder} allowClear />;
    }
    case RSVP_FIELD_TYPES.TEXTAREA: {
      return <Input.TextArea placeholder={placeholder} allowClear />;
    }
    case RSVP_FIELD_TYPES.NUMBER: {
      return <InputNumber placeholder={placeholder} allowClear />;
    }
    case RSVP_FIELD_TYPES.SELECT: {
      return (
        <Select placeholder={placeholder} allowClear>
          {options.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    }
    case RSVP_FIELD_TYPES.RADIO: {
      return (
        <Radio.Group>
          {options.map(option => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    }
    case RSVP_FIELD_TYPES.CHECKBOX: {
      return <Checkbox.Group options={options} />;
    }
  }
};

export const FormGenerator = ({ formConfig }) => {
  const { title, heading, formFields } = formConfig;
  const [generatedForm] = Form.useForm();
  return (
    <div className="flex flex-col items-center">
      <Image src="/jamaatLogo.png" alt="logo" width={125} height={125} />
      <h2 className="font-semibold text-3xl mt-4">{title}</h2>
      {heading && (
        <div className="w-full">
          <RichText className="mt-4" value={heading} />
        </div>
      )}
      <Divider />
      <div className="w-full">
        <Form form={generatedForm} layout="vertical">
          {formFields.map(
            ({ id, label, type, placeholder, options, extra }) => {
              return (
                <Form.Item
                  className="!mb-2"
                  key={id}
                  name={id}
                  label={label}
                  extra={extra}
                >
                  {getInputByType({ type, placeholder, options })}
                </Form.Item>
              );
            }
          )}
        </Form>
      </div>
    </div>
  );
};
