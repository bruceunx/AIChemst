import React, { useEffect, useState } from "react";
import { Flex, RadioGroup, Table } from "@radix-ui/themes";
import Condition from "./Condition";
import { useReactFlow } from "reactflow";

const Conditions: React.FC<any> = ({
  conditions,
  currentNode,
  setSelectCondition,
  locale,
}) => {
  const { setNodes } = useReactFlow();

  const [value, setValue] = useState<string>("0");

  const onChange = (value: string) => {
    setValue(value);
    const condition = conditions[parseInt(value) - 1];
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === currentNode.id) {
          node.data = { ...node.data, detail: JSON.stringify(condition) };
        }
        return node;
      }),
    );
    setSelectCondition(condition);
  };
  useEffect(() => {
    setValue("0");
  }, [currentNode]);

  return (
    <RadioGroup.Root onValueChange={onChange} value={value}>
      <Flex
        direction="column"
        width="100%"
        className="max-h-[54vh] overflow-y-auto"
        gap="4"
      >
        <Flex
          className="w-full p-2"
          align="center"
          justify="center"
          direction="row"
          gap="8"
          style={{ backgroundColor: "var(--gray-a4)" }}
        >
          <Table.Root variant="surface" className="w-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {locale === "en" ? "Plausibility" : "评分"}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {locale === "en" ? "Reagent" : "试剂"}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {locale === "en" ? "Solvent" : "溶剂"}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {locale === "en" ? "Catalyst" : "催化剂"}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {locale === "en" ? "Temperature" : "反应温度"}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {locale === "en" ? "Select" : "选择"}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {conditions.map((condition: any, idx: number) => (
                <Condition condition={condition} idx={idx} key={idx} />
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </RadioGroup.Root>
  );
};

export default Conditions;
