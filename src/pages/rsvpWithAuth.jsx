import {
  addInvitee,
  findInvitees,
  useGlobalContext,
  validateAuthUser
} from "@/fe";
import { AppHead, FullPageLoader } from "@/fe/components";
import { InviteeRSVPForm } from "@/fe/components/forms/rsvp";
import { useMutation } from "@tanstack/react-query";
import { Card, Layout, Result, Skeleton, message } from "antd";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FileExcelOutlined, SmileOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { Content } = Layout;

const steps = {
  SHOW_FILE_FORM: "show_file_form",
  SHOW_INVITEE_FORM: "show_invitee_form",
  SHOW_INVALID_AUTH: "show_invalid_auth",
  SHOW_THANK_YOU: "show_thank_you",
  SHOW_WHATSAPP: "show_whatapp"
};

export default function Rsvp() {
  const { showLoader } = useGlobalContext();
  const router = useRouter();
  const { query } = router;

  const [current, setCurrent] = useState(steps.SHOW_FILE_FORM);
  const [currentMember, setCurrentMember] = useState(null);

  const {
    mutate: mutatateValidateAuthUser,
    isLoading: validateAuthUserLoading
  } = useMutation({
    mutationKey: "verifyFn",
    mutationFn: token => validateAuthUser(token),
    onSuccess: data => {
      mutateFindInviteesByFile({
        fileNumber: data.fileNumber,
        itsId: data.itsId
      });
    },
    onError: error => {
      message.error(error);
      setCurrent(steps.SHOW_INVALID_AUTH);
    }
  });

  const { mutate: mutateFindInviteesByFile, isLoading: findInviteesLoading } =
    useMutation({
      mutationKey: "findInviteesByFile",
      mutationFn: data => findInvitees(data),
      onSuccess: data => {
        setCurrent(steps.SHOW_INVITEE_FORM);
        setCurrentMember({
          ...data.memberData,
          tanzeem_file_no: data.fileData?.tanzeem_file_no || "",
          sector: data?.fileData?.sub_sector?.sector?.name || "-",
          sub_sector: data?.fileData?.sub_sector?.name || "-"
        });
      },
      onError: error => {
        message.error(error);
        setCurrent(steps.SHOW_INVITEE_FORM);
        setCurrentMember(null);
      }
    });

  const {
    mutate: mutateSendInviteeResponse,
    isLoading: sendInviteeResponseLoading
  } = useMutation({
    mutationKey: "sendInviteeResponse",
    mutationFn: data => addInvitee(data)
  });

  const isCurrentMemberValid = useMemo(() => {
    if (!currentMember) return false;
    return currentMember?.hof_fm_type === "HOF";
  }, [currentMember]);

  const handleSubmitInviteeResponse = (values, form) => {
    mutateSendInviteeResponse(values, {
      onSuccess: data => {
        form.resetFields();
        message.success(data);
        setCurrentMember(null);
        setCurrent(steps.SHOW_THANK_YOU);
      },
      onError: error => message.error(error)
    });
  };

  useEffect(() => {
    const { authToken } = query;
    if (authToken) {
      mutatateValidateAuthUser(authToken);
    } else {
      setCurrent(steps.SHOW_INVALID_AUTH);
    }
  }, [mutatateValidateAuthUser, query]);

  return (
    <>
      <AppHead />
      {showLoader || sendInviteeResponseLoading ? <FullPageLoader /> : null}
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
                Sabeel Niyat Form
              </h2>

              {current === steps.SHOW_FILE_FORM ||
              findInviteesLoading ||
              validateAuthUserLoading ? (
                <Skeleton
                  avatar
                  paragraph={{
                    rows: 4
                  }}
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

              {current === steps.SHOW_INVALID_AUTH && !isCurrentMemberValid ? (
                <Result
                  icon={<FileExcelOutlined />}
                  title="Authentication Failed!"
                  status="error"
                />
              ) : null}

              {current === steps.SHOW_INVITEE_FORM && !isCurrentMemberValid ? (
                <Result
                  icon={<FileExcelOutlined />}
                  title="HOF Id not found!"
                  status="error"
                />
              ) : null}

              {current === steps.SHOW_THANK_YOU && !currentMember ? (
                <Result
                  icon={<SmileOutlined />}
                  title="Thank you for filling the form. Your response has been recorded"
                />
              ) : null}
            </div>
          </Card>
        </Content>
      </Layout>
    </>
  );
}
