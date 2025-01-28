import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { DeleteOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { RSVP_FIELD_TYPES } from "@/appConstants";
import { TextEditor } from "../inputs";

export const CreateRsvpForm = ({ form, handleSubmit }) => {
  const formItemsList = Form.useWatch("formFields", form);
  return (
    <Form
      layout="vertical"
      requiredMark={false}
      form={form}
      onFinish={handleSubmit}
    >
      <Card title="Form Data" className="mb-2">
        <Form.Item
          rules={[
            {
              required: true,
              message: "Title is required"
            },
            {
              min: 3,
              message: "Title should be at least 3 characters"
            }
          ]}
          label="Title"
          name="title"
          className="!mb-2"
        >
          <Input />
        </Form.Item>
        <Form.Item className="!mb-2" label="Heading" name="heading">
          <TextEditor />
        </Form.Item>
      </Card>
      <Card title="Form Items" className="mb-2">
        <Form.List
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length === 0) {
                  throw new Error("should have atleast one form item");
                }
              }
            }
          ]}
          name="formFields"
        >
          {(fields, { add, remove }, { errors: formItemListErrors }) => (
            <>
              {fields.map(field => (
                <Card className="mb-6 bg-gray-50" key={field.key} size="small">
                  <div className="flex justify-end w-full text-xl text-red-600">
                    <DeleteOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                  <Row gutter={[8, 8]} className="mb-2">
                    <Col span={12}>
                      <Form.Item
                        label="Field name"
                        name={[field.name, "id"]}
                        className="!mb-0"
                        rules={[
                          {
                            required: true,
                            message: "Field name is required"
                          },
                          {
                            pattern: /^[^A-Z]*$/,
                            message:
                              "Field name should not have capital letters"
                          },
                          {
                            pattern: /^\w*$/,
                            message:
                              "Field name should only have special characters only (underscore) is allowed."
                          }
                        ]}
                      >
                        <Input placeholder="Field Id" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Field Label"
                        name={[field.name, "label"]}
                        className="!mb-0"
                        rules={[
                          {
                            required: true,
                            message: "Field Label is required"
                          }
                        ]}
                      >
                        <Input placeholder="Field Label" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]} className="mb-2">
                    <Col span={12}>
                      <Form.Item
                        label="Field type"
                        name={[field.name, "type"]}
                        className="!mb-2"
                        rules={[
                          {
                            required: true,
                            message: "Field Type is required"
                          }
                        ]}
                      >
                        <Select placeholder="Select Field Type">
                          {Object.keys(RSVP_FIELD_TYPES).map(rsvp_type_key => (
                            <Select.Option
                              key={rsvp_type_key}
                              value={RSVP_FIELD_TYPES[rsvp_type_key]}
                            >
                              {RSVP_FIELD_TYPES[rsvp_type_key]}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      {formItemsList[field.name] &&
                      formItemsList[field.name]?.type &&
                      [
                        RSVP_FIELD_TYPES.CHECKBOX,
                        RSVP_FIELD_TYPES.SELECT,
                        RSVP_FIELD_TYPES.RADIO
                      ].includes(formItemsList[field.name]?.type) ? (
                        <Form.Item label="Options" className="!mb-2">
                          <Form.List
                            rules={[
                              {
                                validator: async (_, items) => {
                                  if (!items || items.length === 0) {
                                    throw new Error(
                                      "should have atleast one option"
                                    );
                                  }
                                }
                              }
                            ]}
                            name={[field.name, "options"]}
                          >
                            {(
                              subFields,
                              subOpt,
                              { errors: optionListErrors }
                            ) => (
                              <>
                                {subFields.map(subField => (
                                  <Row
                                    className="mb-2"
                                    gutter={[8, 8]}
                                    key={subField.key}
                                  >
                                    <Col span={11}>
                                      <Form.Item
                                        name={[subField.name, "label"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Option label is required"
                                          }
                                        ]}
                                        className="!mb-0"
                                      >
                                        <Input placeholder="option label" />
                                      </Form.Item>
                                    </Col>
                                    <Col span={11}>
                                      <Form.Item
                                        name={[subField.name, "value"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Option value is required"
                                          }
                                        ]}
                                        className="!mb-0"
                                      >
                                        <Input placeholder="option value" />
                                      </Form.Item>
                                    </Col>
                                    <Col
                                      span={2}
                                      className="!flex justify-center items-center"
                                    >
                                      <CloseCircleOutlined
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                ))}
                                <Button
                                  type="dashed"
                                  onClick={() => subOpt.add()}
                                  block
                                >
                                  + Add Options
                                </Button>
                                <Form.ErrorList errors={optionListErrors} />
                              </>
                            )}
                          </Form.List>
                        </Form.Item>
                      ) : null}
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]} className="mb-2">
                    {formItemsList[field.name] &&
                    formItemsList[field.name]?.type &&
                    [
                      RSVP_FIELD_TYPES.TEXT,
                      RSVP_FIELD_TYPES.TEXTAREA,
                      RSVP_FIELD_TYPES.SELECT,
                      RSVP_FIELD_TYPES.NUMBER
                    ].includes(formItemsList[field.name]?.type) ? (
                      <Col span={12}>
                        <Form.Item
                          label="Placeholder"
                          name={[field.name, "placeholder"]}
                          className="!mb-2"
                        >
                          <Input placeholder="placeholder" />
                        </Form.Item>
                      </Col>
                    ) : null}
                    <Col span={12}>
                      <Form.Item
                        label="Field info"
                        name={[field.name, "extra"]}
                        className="!mb-2"
                        extra="Extra information about the field"
                      >
                        <Input placeholder="Field info" />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
              ))}

              <Button
                type="primary"
                className="w-64 mt-4"
                onClick={() => add()}
              >
                Add Field
              </Button>
              <Form.ErrorList errors={formItemListErrors} />
            </>
          )}
        </Form.List>
      </Card>
    </Form>
  );
};
