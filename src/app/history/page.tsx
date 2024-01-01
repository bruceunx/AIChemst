"use client";

import SingleRoute from "@/components/SingleRoute";
import { getHistoryRoutes } from "@/utils/api";
import { Table, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type Route = {
  id: number;
  time_stamp: string;
  target: string;
};

export default function History() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  useEffect(() => {
    const getData = async () => {
      // @ts-ignore
      const routes = await getHistoryRoutes(session.accessToken);
      setRoutes(routes);
    };
    if (session) getData();
  }, [session]);

  if (status === "loading") {
    return (
      <Flex className="m-auto">
        <Text>正在加载中....</Text>
      </Flex>
    );
  }

  return (
    <Flex p="7" className="w-1/2 mx-auto">
      <Table.Root variant="surface" className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>序号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>时间</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>目标Smiles</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>删除</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {routes &&
            routes.map((route, index) => (
              <SingleRoute route={route} key={index} />
            ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
