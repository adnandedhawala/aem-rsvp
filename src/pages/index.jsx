import { login, saveAuthToken, useGlobalContext, verifyUser } from "@/fe";
import { AppHead, FullPageLoader } from "@/fe/components";
import { useMutation } from "@tanstack/react-query";
import { Card, Form, Input, Layout, Button, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const { Content } = Layout;

export default function Home() {
  const { showLoader, toggleLoader, setUserData } = useGlobalContext();
  const [loginForm] = Form.useForm();
  const router = useRouter();

  const { mutate: mutateLogin, isLoading: loginLoading } = useMutation({
    mutationKey: "loginFn",
    mutationFn: data => login(data)
  });

  const { mutate: mutateVerifyUser } = useMutation({
    mutationKey: "verifyFn",
    mutationFn: () => verifyUser(),
    onSuccess: data => {
      setUserData(data);
      redirectUserBasedOnRole();
    }
  });

  const redirectUserBasedOnRole = () => {
    router.push("/admin/list");
  };

  const onFinish = values => {
    toggleLoader(true);
    mutateLogin(values, {
      onSuccess: data => {
        mutateVerifyUser(data);
        saveAuthToken(data.data);
        message.success("Logged in successfully!");
        loginForm.resetFields();
      },
      onError: error => {
        message.error(error);
      },
      onSettled: () => {
        toggleLoader(false);
      }
    });
  };

  useEffect(() => {
    mutateVerifyUser();
  }, []);

  return (
    <>
      <AppHead />
      {showLoader ? <FullPageLoader /> : null}
      <Layout className="min-h-screen bg-[#1E293B] px-2">
        <Content className="flex items-center justify-center p-0">
          <Card className="w-full sm:w-10/12 md:w-8/12 lg:w-5/12">
            <div className="flex flex-col items-center">
              <Image
                src="/jamaatLogo.png"
                alt="logo"
                width={100}
                height={100}
              />
              <h1 className="font-semibold"> AEM RSVP</h1>
              <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                form={loginForm}
                className="w-full"
                size="large"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!"
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email!"
                    }
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter password!"
                    }
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item className="flex justify-center">
                  <Button
                    disabled={loginLoading}
                    type="primary"
                    htmlType="submit"
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Content>
      </Layout>
    </>
  );
}
