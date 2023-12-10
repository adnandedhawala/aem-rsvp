import { USER_ROLES } from "@/appConstants";
import {
  adminEditHouses,
  getHouseList,
  logout,
  useGlobalContext,
  verifyUser
} from "@/fe";
import {
  AppHead,
  FullPageLoader,
  HousesGrid,
  MainLayoutHeader
} from "@/fe/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Layout, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { Content } = Layout;

export default function Houses() {
  const { showLoader } = useGlobalContext();
  const router = useRouter();

  const [dataChanges, setDataChanges] = useState({});

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const { mutate: mutateVerifyUser, isSuccess } = useMutation({
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

  const { mutate: editHousesdata, isLoading } = useMutation({
    mutationKey: "adminEditHouses",
    mutationFn: houseData => adminEditHouses(houseData),
    onError: error => {
      message.error(error);
    },
    onSuccess: response => {
      message.success(response);
      setDataChanges({});
      refetch();
    }
  });

  const {
    data,
    refetch,
    isLoading: getHouseDataLoading
  } = useQuery({
    queryFn: () => getHouseList(),
    queryKey: ["getHousesList"],
    enabled: isSuccess,
    staleTime: Number.POSITIVE_INFINITY
  });

  const handleSaveChanges = () => {
    const editData = Object.keys(dataChanges).map(value => ({
      _id: value,
      fields: {
        ...dataChanges[value]
      }
    }));
    editHousesdata(editData);
  };

  useEffect(() => {
    mutateVerifyUser();
  }, []);

  return (
    <>
      <AppHead />
      {showLoader || isLoading || getHouseDataLoading ? (
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
            <Button
              type="primary"
              onClick={handleSaveChanges}
              disabled={Object.keys(dataChanges).length === 0}
            >
              Save Changes
            </Button>
          </div>
          <HousesGrid setDataChanges={setDataChanges} data={data || []} />
        </Content>
      </Layout>
    </>
  );
}
