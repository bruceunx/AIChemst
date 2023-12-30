"use client";

import { Table, Flex, Link } from "@radix-ui/themes";

export default function History() {
  return (
    <Flex p="7" className="w-1/2 mx-auto">
      <Table.Root variant="surface" className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>序号</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>目标Smiles</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>
              <Link>C1CCC</Link>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>2</Table.RowHeaderCell>
            <Table.Cell>
              <Link>C1CCC</Link>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>3</Table.RowHeaderCell>
            <Table.Cell>
              <Link>C1CCC</Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}
