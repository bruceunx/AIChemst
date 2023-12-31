"use client";

import { ReactFlowProvider } from "reactflow";
import Dashboard from "@/components/Dashboard";

function HistoryPage({ params }: { params: { slug: string } }) {
  console.log(params);

  return (
    <ReactFlowProvider>
      <Dashboard />
    </ReactFlowProvider>
  );
}
export default HistoryPage;
