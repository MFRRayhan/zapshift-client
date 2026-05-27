import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Download,
  MoreVertical,
  SlidersHorizontal,
  Truck,
  XCircle,
} from "lucide-react";

// Mock Data for UI stability and consistency
const statsData = [
  {
    name: "Central area",
    percentage: 52,
    color: "bg-[#109f3b]",
    text: "text-[#109f3b]",
  },
  {
    name: "South - Western area",
    percentage: 15,
    color: "bg-[#b6f076]",
    text: "text-[#b6f076]",
  },
  {
    name: "Eastern area",
    percentage: 33,
    color: "bg-[#ff7a00]",
    text: "text-[#ff7a00]",
  },
];

const ordersHistory = [
  {
    id: "#12345678",
    status: "Completed",
    time: "1/10/2024 at 5:12 PM",
    amount: "$ 32,85",
    statusType: "success",
  },
  {
    id: "#12345677",
    status: "Pending",
    time: "1/10/2024 at 3:24 PM",
    amount: "$ 12",
    statusType: "pending",
  },
  {
    id: "#12345676",
    status: "Faild",
    time: "1/10/2024 at 1:56 PM",
    amount: "$ 21,99",
    statusType: "failed",
  }, // Typo preserved from reference UI "Failed"
  {
    id: "#12345675",
    status: "Pending",
    time: "1/10/2024 at 1:17 PM",
    amount: "$ 52",
    statusType: "pending",
  },
  {
    id: "#12345674",
    status: "Completed",
    time: "1/10/2024 at 12:31 PM",
    amount: "$ 19,99",
    statusType: "success",
  },
  {
    id: "#12345673",
    status: "Completed",
    time: "1/10/2024 at 11:29 AM",
    amount: "$ 15",
    statusType: "success",
  },
  {
    id: "#12345672",
    status: "Completed",
    time: "1/10/2024 at 11:03 AM",
    amount: "$ 15",
    statusType: "success",
  },
];

export default function DashboardHome() {
  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium">
              <SlidersHorizontal className="w-4 h-4 text-[#109f3b]" />
              Filters
            </button>
            <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium">
              <Calendar className="w-4 h-4 text-[#109f3b]" />
              Last 30 days
              <span className="text-gray-400 text-xs ml-1">▼</span>
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 bg-[#109f3b] text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#0e8a33] transition-all font-medium text-sm self-start sm:self-auto">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>

        {/* Top Overview Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Monthly Delivery */}
          <div className="bg-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium text-sm">
                  Monthly Delivery
                </p>
                <h3 className="text-3xl font-bold mt-2 tracking-tight">
                  857 orders
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl text-[#109f3b]">
                <Truck className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-red-500">
              <span>📉</span>
              <span>-10% vs past month</span>
            </div>
          </div>

          {/* Card 2: Monthly Work Hours */}
          <div className="bg-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium text-sm">
                  Monthly work hours
                </p>
                <h3 className="text-3xl font-bold mt-2 tracking-tight">
                  158 hours
                </h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl text-[#ff7a00]">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#109f3b]">
              <span>📈</span>
              <span>+20% vs past month</span>
            </div>
          </div>

          {/* Card 3: Earned Funds */}
          <div className="bg-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 font-medium text-sm">
                  Earned funds
                </p>
                <h3 className="text-3xl font-bold mt-2 tracking-tight">
                  1,5k $
                </h3>
              </div>
              <div className="p-3 bg-lime-50 rounded-xl text-[#b6f076]">
                <CircleDollarSign className="w-6 h-6 text-lime-700" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-[#109f3b]">
              <span>📈</span>
              <span>+5% vs past month</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Statistics Donut */}
          <div className="bg-white p-6 rounded-3xl shadow-sm lg:col-span-4 flex flex-col justify-between h-full min-h-115">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold">Statistics</h4>
              <button className="text-[#109f3b] text-sm font-semibold hover:underline flex items-center gap-0.5">
                more <span className="text-xs">❯</span>
              </button>
            </div>

            <div className="space-y-3 mb-8">
              {statsData.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${stat.color}`} />
                    <span className="text-gray-600 font-medium">
                      {stat.name}
                    </span>
                  </div>
                  <span className="font-bold">{stat.percentage}%</span>
                </div>
              ))}
            </div>

            {/* Custom SVG Donut Chart with Overlay text */}
            <div className="relative flex justify-center items-center my-auto">
              <svg
                width="220"
                height="220"
                viewBox="0 0 42 42"
                className="transform -rotate-90"
              >
                {/* Gray Background Circle Track */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#f3f4f6"
                  strokeWidth="4.5"
                />

                {/* Central area - 52% (Green) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#109f3b"
                  strokeWidth="4.5"
                  strokeDasharray="52 48"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />

                {/* Eastern area - 33% (Orange) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#ff7a00"
                  strokeWidth="4.5"
                  strokeDasharray="33 67"
                  strokeDashoffset="-54"
                  strokeLinecap="round"
                />

                {/* South - Western area - 15% (Lime) */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#b6f076"
                  strokeWidth="4.5"
                  strokeDasharray="15 85"
                  strokeDashoffset="-89"
                  strokeLinecap="round"
                />
              </svg>

              {/* Inner Circle Text Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full m-12 ">
                <span className="text-xs text-gray-400 font-medium">
                  Total orders
                </span>
                <span className="text-2xl font-bold tracking-tight">857</span>
              </div>
            </div>
          </div>

          {/* Right Column: Orders History */}
          <div className="bg-white p-6 rounded-3xl shadow-sm lg:col-span-8 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold">Orders history</h4>
              <button className="text-[#109f3b] text-sm font-semibold hover:underline flex items-center gap-0.5">
                more <span className="text-xs">❯</span>
              </button>
            </div>

            {/* Responsive Desktop Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-150">
                <thead>
                  <tr className="text-xs font-semibold text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium">Order number</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date and Time</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 text-right">Info</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm font-medium">
                  {ordersHistory.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      {/* Order ID Badge */}
                      <td className="py-3.5">
                        <span className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 text-xs font-semibold text-gray-700">
                          {order.id}
                        </span>
                      </td>

                      {/* Status Badges */}
                      <td className="py-3.5">
                        {order.statusType === "success" && (
                          <span className="flex items-center gap-1.5 text-[#109f3b] text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            Completed
                          </span>
                        )}
                        {order.statusType === "pending" && (
                          <span className="flex items-center gap-1.5 text-[#ffb012] text-xs font-bold">
                            <AlertCircle className="w-4 h-4 stroke-[2.5]" />
                            Pending
                          </span>
                        )}
                        {order.statusType === "failed" && (
                          <span className="flex items-center gap-1.5 text-red-500 text-xs font-bold">
                            <XCircle className="w-4 h-4 stroke-[2.5]" />
                            Failed
                          </span>
                        )}
                      </td>

                      {/* Date Field */}
                      <td className="py-3.5 text-gray-400 font-normal">
                        {order.time}
                      </td>

                      {/* Cost Field */}
                      <td
                        className={`py-3.5 font-bold ${order.statusType === "failed" ? "text-red-500" : "text-[#109f3b]"}`}
                      >
                        {order.amount}
                      </td>

                      {/* Action Menu button */}
                      <td className="py-3.5 text-right text-gray-300 hover:text-gray-600 transition-colors cursor-pointer">
                        <div className="inline-block p-1">
                          <MoreVertical className="w-4 h-4" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
