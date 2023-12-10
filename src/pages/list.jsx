import {
  addHouse,
  editHouseVisitStatus,
  getHouseList,
  getMemberDetails,
  logout,
  useGlobalContext,
  verifyUser
} from "@/fe";
import {
  AddHouseVisitModal,
  AppHead,
  FullPageLoader,
  HouseDetailsCard,
  MainLayoutHeader,
  VisitStatsCard
} from "@/fe/components";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Empty,
  Input,
  Layout,
  Row,
  Skeleton,
  message
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { VISIT_STATUS } from "@/appConstants";
import moment from "moment";

const { Content } = Layout;

export default function List() {
  const { showLoader } = useGlobalContext();
  const router = useRouter();

  const [filter, setFilter] = useState(VISIT_STATUS.TO_BE_VISITED);
  const [searchText, setSearchText] = useState("");
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const {
    mutate: mutateVerifyUser,
    isSuccess,
    isLoading,
    data: userData
  } = useMutation({
    mutationKey: "verifyFn",
    mutationFn: () => verifyUser(),
    onError: error => {
      message.info(error);
      handleLogout();
    },
    onSuccess: data => {
      if (!data || !data.userRole || data.userRole.length === 0) {
        message.info("access denied");
        handleLogout();
      }
    }
  });

  const {
    mutate: mutateFindMember,
    isLoading: mutateFindMemberLoading,
    data: memberData
  } = useMutation({
    mutationKey: "findMember",
    mutationFn: data => getMemberDetails(data)
  });

  const { mutate: mutateAddHouse, isLoading: mutateAddHouseLoading } =
    useMutation({
      mutationKey: "addHouseMutation",
      mutationFn: data => addHouse(data)
    });

  const {
    mutate: mutateEditHouseVisitStatus,
    isLoading: mutateEditHouseVisitStatusLoading
  } = useMutation({
    mutationKey: "editHouseVisitStatus",
    mutationFn: ({ id, data }) => editHouseVisitStatus(id, data)
  });

  const {
    data: houseList,
    isLoading: getHousesLoading,
    refetch
  } = useQuery({
    queryFn: () => getHouseList(),
    queryKey: ["getHousesList"],
    enabled: isSuccess
  });

  const handleSubmit = (values, form) => {
    if (showAllDetails) {
      mutateAddHouse(
        {
          ...values,
          added_by_name: userData.name,
          added_by_contact: userData.contact
        },
        {
          onSuccess: data => {
            form.resetFields();
            setShowAllDetails(false);
            setShowAddHouseModal(false);
            message.success(data);
            refetch();
          },
          onError: error => {
            message.error(error);
          }
        }
      );
    } else {
      mutateFindMember(values, {
        onSuccess: data => {
          setShowAllDetails(true);
          if (data && data !== null)
            form.setFieldsValue({
              hof_id: data?.hof_id?._id,
              tanzeem_file_no: data?.hof_id?.tanzeem_file_no.toString(),
              full_name: data?.full_name,
              contact: data?.mobile
            });
        },
        onError: error => {
          message.error(error);
        }
      });
    }
  };

  const handleMarkVisit = (id, values, form) => {
    mutateEditHouseVisitStatus(
      {
        id,
        data: {
          ...values,
          status: VISIT_STATUS.VISITED,
          visit_date: moment(new Date()),
          visited_by_name: userData.name,
          visited_by_contact: userData.contact
        }
      },
      {
        onSuccess: data => {
          message.success(data);
          form.resetFields();
          refetch();
        },
        onError: error => {
          message.error(error);
        }
      }
    );
  };

  const handleAddHouseModalCancel = () => {
    setShowAddHouseModal(false);
    setShowAllDetails(false);
  };

  const dataCounts = useMemo(() => {
    let TO_BE_VISITED = 0;
    let VISITED = 0;

    if (houseList && houseList.length > 0) {
      TO_BE_VISITED = houseList.filter(
        value => value.status === VISIT_STATUS.TO_BE_VISITED
      ).length;
      VISITED = houseList.filter(
        value => value.status === VISIT_STATUS.VISITED
      ).length;
    }

    return {
      TO_BE_VISITED,
      VISITED
    };
  }, [houseList]);

  const filteredHouseList = useMemo(() => {
    if (!houseList) return [];
    const filteredData = houseList.filter(value => value.status === filter);
    if (!searchText || searchText === "") return filteredData;
    return filteredData.filter(
      value =>
        value.tanzeem_file_no === searchText || value.itsId === searchText
    );
  }, [houseList, filter, searchText]);

  useEffect(() => {
    mutateVerifyUser();
  }, []);

  return (
    <>
      <AppHead />
      {showLoader || getHousesLoading || mutateAddHouseLoading ? (
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
          {!isSuccess && isLoading ? (
            <Card>
              <Skeleton />
            </Card>
          ) : null}
          {isSuccess && !isLoading && !getHousesLoading ? (
            <>
              <div className="mb-4">
                <p className="font-semibold text-gray-500">Logged In User</p>
                <p className="text-xl font-semibold">
                  {userData?.name || "- "}
                </p>
              </div>
              <div className="flex items-end">
                <div className="flex-1">
                  <p className="font-semibold text-gray-500">Sector</p>
                  <p className="text-2xl font-semibold">
                    {userData.assignedArea.join(", ")}
                  </p>
                </div>
                <Button
                  onClick={() => setShowAddHouseModal(true)}
                  type="primary"
                >
                  Add House
                </Button>
              </div>
              <div className="mt-4">
                <Row gutter={[16, 16]}>
                  <Col xs={12} md={8} lg={6} xl={4}>
                    <VisitStatsCard
                      tailwindTextColor="text-amber-500"
                      status="Pending"
                      count={dataCounts.TO_BE_VISITED}
                      icon={<FiAlertCircle />}
                      isActive={filter === VISIT_STATUS.TO_BE_VISITED}
                      handleClick={() => setFilter(VISIT_STATUS.TO_BE_VISITED)}
                    />
                  </Col>
                  <Col xs={12} md={8} lg={6} xl={4}>
                    <VisitStatsCard
                      tailwindTextColor="text-lime-500"
                      status="Visited"
                      count={dataCounts.VISITED}
                      icon={<FiCheckCircle />}
                      isActive={filter === VISIT_STATUS.VISITED}
                      handleClick={() => setFilter(VISIT_STATUS.VISITED)}
                    />
                  </Col>
                </Row>
              </div>
              <Input
                placeholder="Seach by File number or ITS"
                allowClear
                className="my-4"
                size="large"
                onChange={event => setSearchText(event.target.value)}
              />
              <div>
                {filteredHouseList.length > 0 ? (
                  filteredHouseList.map(value => (
                    <HouseDetailsCard
                      loading={mutateEditHouseVisitStatusLoading}
                      handleMarkVisit={handleMarkVisit}
                      key={value._id}
                      {...value}
                    />
                  ))
                ) : (
                  <Card>
                    <Empty />
                  </Card>
                )}
              </div>
            </>
          ) : null}
        </Content>
      </Layout>
      {showAddHouseModal ? (
        <AddHouseVisitModal
          open={showAddHouseModal}
          handleCancel={handleAddHouseModalCancel}
          handleSubmit={handleSubmit}
          loading={mutateFindMemberLoading}
          showAllDetails={showAllDetails}
          memberData={memberData || null}
        />
      ) : null}
    </>
  );
}
