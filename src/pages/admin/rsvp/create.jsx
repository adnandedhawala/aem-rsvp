/* eslint-disable no-console */
/* eslint-disable security/detect-object-injection */
import { USER_ROLES } from "@/appConstants";
import { logout, useGlobalContext, verifyUser } from "@/fe";
import {
  AppHead,
  CreateRsvpForm,
  FormGenerator,
  FullPageLoader,
  MainLayoutHeader
} from "@/fe/components";
import { useMutation } from "@tanstack/react-query";
import { Button, Drawer, Form, Layout, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { Content } = Layout;

const onFinish = values => {
  console.log("values", values);
};

export default function CreateRSVP() {
  const { showLoader } = useGlobalContext();
  const router = useRouter();
  const [rsvpConfigForm] = Form.useForm();

  const [showPreview, setShowPreview] = useState(false);

  const { mutate: mutateVerifyUser } = useMutation({
    mutationKey: "verifyFn",
    mutationFn: () => verifyUser(),
    onError: error => {
      message.info(error);
      handleLogout();
    },
    onSuccess: data => {
      if (
        !data ||
        !data.userRole ||
        !data.userRole.includes(USER_ROLES.Admin)
      ) {
        message.info("access denied");
        handleLogout();
      }
    }
  });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleShowPreview = () => {
    rsvpConfigForm
      .validateFields({ recursive: true })
      .then(() => {
        setShowPreview(true);
      })
      .catch(() => {
        message.error("Please fix errors to see preview.");
      });
  };

  useEffect(() => {
    mutateVerifyUser();
  }, []);

  return (
    <>
      <AppHead />
      {showLoader ? <FullPageLoader /> : null}
      <Layout className="min-h-screen">
        <MainLayoutHeader
          showBack
          pageTitle="Create RSVP"
          handleLogout={handleLogout}
          handleBack={() => router.push("/admin/rsvp/list")}
        />
        <Content className="mt-16 px-6">
          <div className="flex items-start justify-end w-full my-4">
            <Button className="mr-2" onClick={handleShowPreview}>
              Preview
            </Button>
            <Button
              onClick={() => rsvpConfigForm.submit()}
              type="primary"
              className="mr-2"
            >
              Save
            </Button>
            <Button>Cancel</Button>
          </div>
          <CreateRsvpForm handleSubmit={onFinish} form={rsvpConfigForm} />
        </Content>
      </Layout>
      {showPreview && (
        <Drawer
          destroyOnClose
          open={showPreview}
          onClose={() => setShowPreview(false)}
          closable={false}
          width={600}
        >
          <FormGenerator formConfig={rsvpConfigForm.getFieldsValue()} />
        </Drawer>
      )}
    </>
  );
}
