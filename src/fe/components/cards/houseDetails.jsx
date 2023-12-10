import { VISIT_STATUS } from "@/appConstants";
import { Button, Card, Col, Divider, Form, Input, Row, Tag } from "antd";

export const HouseDetailsCard = ({
  _id,
  itsId,
  hof_id,
  full_name,
  tanzeem_file_no,
  contact,
  address,
  status,
  handleMarkVisit,
  loading
}) => {
  const [houseDetailsForm] = Form.useForm();
  const handleFormFinish = values => {
    handleMarkVisit(_id, values, houseDetailsForm);
  };
  return (
    <Card className="card mb-2">
      <div className="flex px-2 py-4">
        <div className="flex flex-col flex-grow">
          <Row gutter={[4, 4]}>
            <Col xs={12}>
              <span className="text-xs">ITS</span>
              <p className="text-sm">{itsId}</p>
            </Col>
            {itsId === hof_id ? (
              <Col xs={12} className="text-right">
                <Tag>HOF</Tag>
              </Col>
            ) : null}
            <Col xs={24}>
              <span className="text-xs">Name</span>
              <p className="text-sm">{full_name}</p>
            </Col>
            <Col xs={12}>
              <span className="text-xs">File No</span>
              <p className="text-sm">{tanzeem_file_no || "-"}</p>
            </Col>
            <Col xs={12}>
              <span className="text-xs">Contact</span>
              <p className="text-sm">{contact || "-"}</p>
            </Col>
            <Col xs={24}>
              <span className="text-xs">Address</span>
              <p className="text-sm">{address}</p>
            </Col>
            {status === VISIT_STATUS.TO_BE_VISITED ? (
              <>
                <Divider className="my-2" />
                <Col xs={24}>
                  <Form
                    onFinish={handleFormFinish}
                    name="editVisitStatus"
                    layout="vertical"
                    form={houseDetailsForm}
                    className="form-no-mb"
                  >
                    <Form.Item label="Address" name="comments">
                      <Input.TextArea placeholder="Comments" />
                    </Form.Item>
                    <Button disabled={loading} type="primary" htmlType="submit">
                      Mark Visited
                    </Button>
                  </Form>
                </Col>
              </>
            ) : null}
          </Row>
        </div>
      </div>
    </Card>
  );
};
