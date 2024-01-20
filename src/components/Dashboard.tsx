import { useState } from "react";
import { Flex, Separator, Text } from "@radix-ui/themes";
import Search from "./Search";
import Chart from "./Chart";
import { Node } from "reactflow";
import Reactions from "./Reactions";
import NodeDetail from "./NodeDetail";
import RouteDetail from "./RouteDetail";
import Conditions from "./Conditions";
import { ToastProvider } from "./CustomToast";
import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../i18nConfig";

type Props = {
  content?: string;
};

export default function Dashboard(props: Props) {
  const locale = useCurrentLocale(i18nConfig);
  const [currentNode, setCurrentNode] = useState<Node | null>(null);
  const [routes, setRoutes] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectCondition, setSelectCondition] = useState<any>({});

  const handleSelect = (node: Node | null) => {
    setRoutes([]);
    setConditions([]);
    setSelectCondition({});
    setCurrentNode(node);
  };

  return (
    <Flex direction="column" width="100%">
      {!props.content && (
        <>
          <Search
            setRoutes={setRoutes}
            setConditions={setConditions}
            setCurrentNode={setCurrentNode}
          />
          <Separator orientation="horizontal" size="4" className="bg-gray-500" />
        </>
      )}
      <Flex width="100%" className="h-80">
        <ToastProvider>
          <Chart handleSelect={handleSelect} content={props.content} />
        </ToastProvider>
      </Flex>
      <Separator orientation="horizontal" size="4" className="bg-gray-500" />
      <Flex className="min-h-[300px]" width="100%" direction="row">
        <Flex className="w-3/4" direction="column">
          {Boolean(routes.length) && (
            <Reactions
              routes={routes}
              currentNode={currentNode}
              locale={locale!}
            />
          )}
          {Boolean(conditions.length) && (
            <Conditions
              conditions={conditions}
              currentNode={currentNode}
              setSelectCondition={setSelectCondition}
              locale={locale!}
            />
          )}
        </Flex>
        <Flex
          className="w-1/4 ml-2 h-[54vh]"
          align="center"
          direction="column"
          gap="2"
          style={{ backgroundColor: "var(--gray-a4)" }}
        >
          <Text align="center" className="text-gray-300">
            {currentNode
              ? locale === "en"
                ? "Current Target"
                : "当前目标"
              : locale === "en"
                ? "No Target"
                : "未选中目标"}{" "}
          </Text>
          <Flex className="w-64 h-full" direction="column">
            {currentNode && currentNode.type === "chemNode" && (
              <NodeDetail
                setRoutes={setRoutes}
                currentNode={currentNode}
                locale={locale!}
              />
            )}
            {currentNode && currentNode.type === "reactionNode" && (
              <RouteDetail
                setConditions={setConditions}
                currentNode={currentNode}
                selectCondition={selectCondition}
                locale={locale!}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
