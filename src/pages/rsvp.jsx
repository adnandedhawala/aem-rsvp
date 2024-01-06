import { addInvitee, findInvitees, useGlobalContext } from "@/fe";
import { AppHead, FullPageLoader, SearchFileForm } from "@/fe/components";
import { InviteeRSVPForm } from "@/fe/components/forms/rsvp";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Layout, Result, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import { FileExcelOutlined, SmileOutlined } from "@ant-design/icons";

const { Content } = Layout;

const steps = {
  SHOW_FILE_FORM: "show_file_form",
  SHOW_INVITEE_FORM: "show_invitee_form",
  SHOW_THANK_YOU: "show_thank_you"
};

export default function Rsvp() {
  const { showLoader } = useGlobalContext();
  const [current, setCurrent] = useState(steps.SHOW_FILE_FORM);
  const [currentMember, setCurrentMember] = useState(null);

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
    mutationFn: data => addInvitee(data)
  });

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
          sector: data.fileData.sub_sector.sector.name,
          sub_sector: data.fileData.sub_sector.name
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
        setCurrent(steps.SHOW_THANK_YOU);
      },
      onError: error => message.error(error)
    });
  };

  return (
    <>
      <AppHead />
      {showLoader || findInviteesLoading || sendInviteeResponseLoading ? (
        <FullPageLoader />
      ) : null}
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
              <h2 className="text-xl text-center font-semibold mb-2">
                Khidmat Registration: Annual Jamea Imtehaan
              </h2>
              <p className="mb-2 text-center">
                Kindly respond accurately, to confirm your presence in this
                Darees. This invite is only for the persons mentioned in the
                list.
              </p>

              {current === steps.SHOW_FILE_FORM ? (
                <SearchFileForm
                  isLoading={findInviteesLoading}
                  onFinish={handleFindFile}
                />
              ) : null}

              {current === steps.SHOW_INVITEE_FORM && currentMember ? (
                <InviteeRSVPForm
                  isLoading={sendInviteeResponseLoading}
                  onFinish={handleSubmitInviteeResponse}
                  member={currentMember}
                  handleCancel={() => setCurrent(steps.SHOW_FILE_FORM)}
                />
              ) : null}

              {current === steps.SHOW_INVITEE_FORM && !currentMember ? (
                <Result
                  icon={<FileExcelOutlined />}
                  title="No invitees found from the file!"
                  status="error"
                  extra={
                    <Button onClick={() => setCurrent(steps.SHOW_FILE_FORM)}>
                      Go Back
                    </Button>
                  }
                />
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
