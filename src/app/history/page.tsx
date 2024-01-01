"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Table, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

import SingleRoute from "@/components/SingleRoute";
import { deleteHistoryRoute, getHistoryRoutes } from "@/utils/api";

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

  const onDelete = async (id: number) => {
    // @ts-ignore
    const res = await deleteHistoryRoute(session.accessToken, id);
    if (res === 0) {
      const newRoutes = routes.filter((route) => route.id !== id);
      console.log(newRoutes);
      setRoutes(newRoutes);
    }
  };

  if (status === "loading") {
    return (
      <Flex className="m-auto">
        <Text>正在加载中....</Text>
      </Flex>
    );
  }

  return (
    <Flex p="7" className="w-3/4 mx-auto h-full py-7">
      <Table.Root variant="surface" className="w-full overflow-y-scroll">
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
            routes.map((route) => (
              <SingleRoute route={route} onDelete={onDelete} key={route.id} />
            ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
