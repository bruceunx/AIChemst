"use client";
import { ReactFlowProvider } from "reactflow";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <ReactFlowProvider>
      <Dashboard />
    </ReactFlowProvider>
  );
}
