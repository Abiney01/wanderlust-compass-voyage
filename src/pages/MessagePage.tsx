
import { DashboardLayout } from "@/components/layout/Dashboard";

const MessagePage = () => {
  return (
    <DashboardLayout>
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-500">Your conversations with hosts and guests.</p>
      </div>
    </DashboardLayout>
  );
};

export default MessagePage;
