import { Button, Layout, Tooltip } from "antd";
import { LeftOutlined } from "@ant-design/icons";
const { Header } = Layout;

export const MainLayoutHeader = ({
  pageTitle,
  handleBack,
  showBack,
  handleLogout
}) => {
  return (
    <Header className="w-full fixed top-0 left-0 flex items-center px-6 z-10 !bg-[#1E293B]">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-white text-2xl font-medium">
          {showBack ? (
            <Tooltip title="Go Back">
              <LeftOutlined
                onClick={handleBack}
                className="mr-2 hover:cursor-pointer"
              />
            </Tooltip>
          ) : null}
          {pageTitle}
        </h3>
        <Button onClick={handleLogout} type="primary" danger>
          Logout
        </Button>
      </div>
    </Header>
  );
};
