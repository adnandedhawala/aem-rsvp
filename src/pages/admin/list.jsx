import { USER_ROLES } from "@/appConstants";
import {
  getInviteeList,
  logout,
  resetInviteeList,
  useGlobalContext,
  verifyUser
} from "@/fe";
import {
  AppHead,
  FullPageLoader,
  InviteeGrid,
  MainLayoutHeader
} from "@/fe/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Layout, message } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const { Content } = Layout;

export default function Houses() {
  const { showLoader } = useGlobalContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const {
    mutate: mutateVerifyUser,
    isSuccess,
    data: verifyUserData
  } = useMutation({
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

  // const { mutate: mutateResetList, isLoading: mutateResetListLoading } =
  const { isLoading: mutateResetListLoading } = useMutation({
    mutationKey: "adminEditHouses",
    mutationFn: () => resetInviteeList(),
    onError: error => {
      message.error(error);
    },
    onSuccess: response => {
      message.success(response);
      refetch();
    }
  });

  const {
    data,
    isLoading: getHouseDataLoading,
    refetch
  } = useQuery({
    queryFn: () => getInviteeList(),
    queryKey: ["getInviteeList"],
    enabled: isSuccess && verifyUserData.userRole.includes(USER_ROLES.Admin),
    staleTime: Number.POSITIVE_INFINITY
  });

  // const handleResetList = () => {
  //   mutateResetList();
  // };

  useEffect(() => {
    mutateVerifyUser();
  }, []);

  return (
    <>
      <AppHead />
      {showLoader || mutateResetListLoading || getHouseDataLoading ? (
        <FullPageLoader />
      ) : null}
      <Layout className="min-h-screen">
        <MainLayoutHeader
          showBack={false}
          pageTitle="Houses List"
          handleLogout={handleLogout}
        />
        <Content className="mt-16 px-6">
          <div className="mt-4"></div>
          <div className="flex items-start justify-end w-full mb-4">
            {/* <Button type="primary" danger onClick={handleResetList}>
              Reset List
            </Button> */}
          </div>
          <InviteeGrid data={data || []} />
        </Content>
      </Layout>
    </>
  );
}
