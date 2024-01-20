"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Flex, Text } from "@radix-ui/themes";
import { ReactFlowProvider } from "reactflow";
import { useSession } from "next-auth/react";

import { getHistoryRoute } from "@/utils/api";
import Dashboard from "@/components/Dashboard";

function HistoryPage({ params }: { params: { slug: string } }) {
  const [content, setContent] = useState<string | null>(null);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  useEffect(() => {
    const getContent = async (slug: string) => {
      // @ts-ignore
      const route = await getHistoryRoute(session.accessToken, slug);
      if (route !== null) {
        setContent(route.content);
      }
    };
    if (session) getContent(params.slug);
  }, [params, session]);

  if (status === "loading") {
    return (
      <Flex className="m-auto">
        <Text>Loading....</Text>
      </Flex>
    );
  }

  return (
    <ReactFlowProvider>
      {content && <Dashboard content={content} />}
    </ReactFlowProvider>
  );
}
export default HistoryPage;
