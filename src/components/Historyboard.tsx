import { useState } from "react";
import { Flex, Separator, Text } from "@radix-ui/themes";
import { Node } from "reactflow";
import Reactions from "./Reactions";
import NodeDetail from "./NodeDetail";
import RouteDetail from "./RouteDetail";
import Conditions from "./Conditions";
import { ToastProvider } from "./CustomToast";
import HistoryChart from "./HistoryChart";

type HistoryProps = {
  content: string;
};

export default function Dashboard(props: HistoryProps) {
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [routes, setRoutes] = useState([]);
  const [conditions, setConditions] = useState([]);

  const [selectCondition, setSelectCondition] = useState<any>({});

  const handleSelect = (node: Node) => {
    setRoutes([]);
    setConditions([]);
    setSelectCondition({});
    setCurrentNode(node);
  };

  return (
    <Flex direction="column" width="100%">
      <Flex width="100%" className="h-80">
        <ToastProvider>
          <HistoryChart handleSelect={handleSelect} content={props.content} />
        </ToastProvider>
      </Flex>
      <Separator orientation="horizontal" size="4" />
      <Flex className="min-h-[300px]" width="100%" direction="row">
        <Flex className="w-3/4" direction="column">
          {Boolean(routes.length) && (
            <Reactions routes={routes} currentNode={currentNode} />
          )}
          {Boolean(conditions.length) && (
            <Conditions
              conditions={conditions}
              currentNode={currentNode}
              setSelectCondition={setSelectCondition}
            />
          )}
        </Flex>
        <Flex
          className="w-1/4 ml-2 h-[54vh]"
          align="center"
          direction="column"
          gap="4"
          style={{ backgroundColor: "var(--gray-a4)" }}
        >
          <Text align="center">{currentNode ? "当前目标" : "未选中目标"} </Text>
          <Flex
            align="center"
            justify="center"
            className="w-64 p-2 mt-4 h-full"
            direction="column"
            gap="4"
          >
            {currentNode && currentNode.type === "chemNode" && (
              <NodeDetail setRoutes={setRoutes} currentNode={currentNode} />
            )}
            {currentNode && currentNode.type === "reactionNode" && (
              <RouteDetail
                setConditions={setConditions}
                currentNode={currentNode}
                selectCondition={selectCondition}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
