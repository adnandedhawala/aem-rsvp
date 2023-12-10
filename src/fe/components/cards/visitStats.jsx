import { Card } from "antd";

export const VisitStatsCard = ({
  handleClick,
  isActive,
  icon,
  tailwindTextColor,
  count,
  status
}) => {
  return (
    <Card
      onClick={handleClick}
      className={isActive ? "p-0 rounded-lg bg-gray-200" : "p-0 rounded-lg"}
    >
      <div className="flex">
        <span
          className={`flex items-center justify-center w-12 text-5xl mr-4 ${tailwindTextColor}`}
        >
          {icon}
        </span>
        <div className="flex flex-col flex-grow">
          <p className="text-xs">{status}</p>
          <p className={`text-4xl ${tailwindTextColor}`}>{count}</p>
        </div>
      </div>
    </Card>
  );
};
