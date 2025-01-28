import { USER_ROLES } from "@/appConstants";
import { logout, useGlobalContext, verifyUser } from "@/fe";
import { AppHead, FullPageLoader, MainLayoutHeader } from "@/fe/components";
import { useMutation } from "@tanstack/react-query";
import { Button, Layout, message } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const { Content } = Layout;

export default function RSVPList() {
  const { showLoader } = useGlobalContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

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

  useEffect(() => {
    mutateVerifyUser();
  }, []);

  return (
    <>
      <AppHead />
      {showLoader ? <FullPageLoader /> : null}
      <Layout className="min-h-screen">
        <MainLayoutHeader
          showBack={false}
          pageTitle="RSVP List"
          handleLogout={handleLogout}
        />
        <Content className="mt-16 px-6">
          <div className="flex items-start justify-end w-full my-4">
            <Button
              onClick={() => router.push("/admin/rsvp/create")}
              size="large"
              type="primary"
            >
              Create RSVP
            </Button>
          </div>
        </Content>
      </Layout>
    </>
  );
}
