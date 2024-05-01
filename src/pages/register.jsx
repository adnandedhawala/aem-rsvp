import {
  addInvitee,
  findInvitees,
  getInviteeCount,
  useGlobalContext
} from "@/fe";
import { AppHead, FullPageLoader, SearchFileForm } from "@/fe/components";
import { InviteeRSVPForm } from "@/fe/components/forms/rsvp";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Layout, Result, message } from "antd";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FileExcelOutlined, SmileOutlined } from "@ant-design/icons";

const { Content } = Layout;

const steps = {
  SHOW_FILE_FORM: "show_file_form",
  SHOW_INVITEE_FORM: "show_invitee_form",
  SHOW_THANK_YOU: "show_thank_you",
  SHOW_WHATSAPP: "show_whatapp"
};

export default function Rsvp() {
  const { showLoader } = useGlobalContext();
  const [current, setCurrent] = useState(steps.SHOW_FILE_FORM);
  const [currentMember, setCurrentMember] = useState(null);

  const {
    data: inviteeCount,
    isLoading: getInviteeLoading,
    refetch
  } = useQuery({
    queryFn: () => getInviteeCount(),
    queryKey: ["getInviteeCount"]
  });

  const { mutate: mutateFindInviteesByFile, isLoading: findInviteesLoading } =
    useMutation({
      mutationKey: "findInviteesByFile",
      mutationFn: data => findInvitees(data)
    });

  const {
    mutate: mutateSendInviteeResponse,
    isLoading: sendInviteeResponseLoading
  } = useMutation({
    mutationKey: "sendInviteeResponse",
    mutationFn: data => addInvitee(data),
    onSuccess: () => refetch()
  });

  const availableSeats = useMemo(() => {
    const maleCount =
      inviteeCount?.data?.filter(({ _id }) => _id === "Male")[0]?.count || 0;
    const femaleCount =
      inviteeCount?.data?.filter(({ _id }) => _id === "Female")[0]?.count || 0;
    return {
      male: Number(500) - maleCount,
      female: Number(144) - femaleCount
    };
  }, [inviteeCount]);

  const isCurrentMemberValid = useMemo(() => {
    if (!currentMember) return false;
    if (currentMember?.gender === "Male" && availableSeats.male < 1)
      return false;
    if (currentMember?.gender === "Female" && availableSeats.female < 1)
      return false;
    return currentMember && currentMember?.age > 1;
  }, [currentMember, availableSeats]);

  const handleFindFile = (values, form) => {
    mutateFindInviteesByFile(values, {
      onError: error => {
        message.error(error);
      },
      onSuccess: data => {
        setCurrent(steps.SHOW_INVITEE_FORM);
        setCurrentMember({
          ...data.memberData,
          tanzeem_file_no: values.fileNumber,
          sector: data?.fileData?.sub_sector?.sector?.name || "-",
          sub_sector: data?.fileData?.sub_sector?.name || "-"
        });
        form.resetFields();
      }
    });
  };

  const handleSubmitInviteeResponse = (values, form) => {
    mutateSendInviteeResponse(values, {
      onSuccess: data => {
        form.resetFields();
        message.success(data);
        setCurrentMember(null);
        if (values.enrolled_for_khidmat === "yes") {
          setCurrent(steps.SHOW_WHATSAPP);
        } else {
          setCurrent(steps.SHOW_THANK_YOU);
        }
      },
      onError: error => message.error(error)
    });
  };

  return (
    <>
      <AppHead />
      {showLoader ||
      findInviteesLoading ||
      sendInviteeResponseLoading ||
      getInviteeLoading ? (
        <FullPageLoader />
      ) : null}
      <Layout className="min-h-screen bg-[#1E293B] px-2">
        <Content className="flex items-center justify-center p-0">
          <Card className="w-full sm:w-10/12 md:w-8/12 lg:w-5/12">
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/jamaatLogo.png"
                alt="logo"
                width={100}
                height={100}
              />
              <h2 className="text-2xl text-center font-semibold mb-2">
                Al Jamea TUS Saifiyah Marol - Zakereen Barnamaj
              </h2>
              <p className="mb-2 text-center text-lg font-semibold">
                Available Seats
              </p>
              <div>
                <p className="mb-1 text-center ">
                  Mardo : <span>{availableSeats?.male || 0}</span>
                </p>
                <p className="mb-1 text-center ">
                  Bairao : <span>{availableSeats?.female || 0}</span>
                </p>
              </div>

              {current === steps.SHOW_FILE_FORM ? (
                <SearchFileForm
                  isLoading={findInviteesLoading}
                  onFinish={handleFindFile}
                />
              ) : null}

              {current === steps.SHOW_INVITEE_FORM && isCurrentMemberValid ? (
                <InviteeRSVPForm
                  isLoading={sendInviteeResponseLoading}
                  onFinish={handleSubmitInviteeResponse}
                  member={currentMember}
                  handleCancel={() => setCurrent(steps.SHOW_FILE_FORM)}
                />
              ) : null}

              {current === steps.SHOW_INVITEE_FORM && !isCurrentMemberValid ? (
                <Result
                  icon={<FileExcelOutlined />}
                  title="Seats for the Barnamaj are not available!"
                  status="error"
                  extra={
                    <Button onClick={() => setCurrent(steps.SHOW_FILE_FORM)}>
                      Go Back
                    </Button>
                  }
                />
              ) : null}

              {current === steps.SHOW_WHATSAPP ? (
                <div className="my-4 flex flex-col items-center justify-center">
                  <p className="text-lg mb-2 text-center font-semibold">
                    Click Image below to Join WhatsApp Group of Zakereen
                    Barnamaj
                  </p>
                  <a
                    target="_blank"
                    href="https://chat.whatsapp.com/ErqyyVWB32Z2sKdCVeL3OP"
                    rel="noreferrer"
                  >
                    <Image
                      className="border-2 border-solid border-black p-2"
                      src="/sample.png"
                      alt="logo"
                      width={200}
                      height={270}
                    />
                  </a>
                  <Button onClick={() => setCurrent(steps.SHOW_FILE_FORM)}>
                    Go Back
                  </Button>
                </div>
              ) : null}

              {current === steps.SHOW_THANK_YOU && !currentMember ? (
                <Result
                  icon={<SmileOutlined />}
                  title="Thank you for filling the form. Your response has been recorded"
                  extra={
                    <Button onClick={() => setCurrent(steps.SHOW_FILE_FORM)}>
                      Go Back
                    </Button>
                  }
                />
              ) : null}
            </div>
          </Card>
        </Content>
      </Layout>
    </>
  );
}
