"use client";

import { Table, Flex, Link, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function History() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

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
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>
             2023-12-01 
            </Table.Cell>
            <Table.Cell>
              <Link>C1CCC</Link>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>2</Table.RowHeaderCell>
            <Table.Cell>
             2023-12-01 
            </Table.Cell>
            <Table.Cell>
              <Link>C1CCC</Link>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>3</Table.RowHeaderCell>
            <Table.Cell>
             2023-12-01 
            </Table.Cell>
            <Table.Cell>
              <Link>C1CCC</Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
