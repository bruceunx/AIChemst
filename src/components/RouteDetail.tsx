import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

import { RouteProps } from "@/types";
import { findConditions, getChemicalSVG } from "../utils/api";
import { useEffect, useState } from "react";

const RouteDetail: React.FC<RouteProps> = ({
  setConditions,
  currentNode,
  selectCondition,
}) => {
  const [text, setText] = useState<string>("反应条件筛选");
  const [error, setError] = useState<boolean>(false);
  const [reagent, setReagent] = useState<string | null>(null);
  const [solvent, setSolvent] = useState<string | null>(null);
  const [catalyst, setCatalyst] = useState<string | null>(null);

  const onClick = async () => {
    setError(false);
    setText("正在筛选中...");
    const result = await findConditions(
      currentNode.data.reactants,
      currentNode.data.product,
    );
    if (result !== null) {
      setConditions(result);
    } else {
      setError(true);
    }
    setText("反应条件筛选");
  };

  useEffect(() => {
    const updateSvg = async (condition: any) => {
      if (condition.reagent.length > 0) {
        const res = await getChemicalSVG(condition.reagent);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setReagent(svgUrl);
        }
      }
      if (condition.solvent.length > 0) {
        const res = await getChemicalSVG(condition.solvent);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setSolvent(svgUrl);
        }
      }
      if (condition.catalyst.length > 0) {
        const res = await getChemicalSVG(condition.catalyst);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setCatalyst(svgUrl);
        }
      }
    };
    if (currentNode) {
      let condition = JSON.parse(currentNode.data.detail);
      updateSvg(condition);
    }
  }, [currentNode]);

  return (
    <>
      <Heading>反应条件筛选</Heading>

      {currentNode.data.detail ? (
        <Flex direction="column" gap="2" align="start" justify="start">
          <Flex direction="row" gap="2">
            <Text className="w-20">反应试剂:</Text>
            {reagent && (
              <Image
                src={reagent}
                alt="reagent"
                width={70}
                height={70}
                className="bg-white rounded-md p-2"
              />
            )}
          </Flex>
          <Flex direction="row" gap="2">
            <Text className="w-20">反应溶剂:</Text>
            {solvent && (
              <Image
                src={solvent}
                alt="solvent"
                width={70}
                height={70}
                className="bg-white rounded-md p-2"
              />
            )}
          </Flex>
          <Flex direction="row" gap="2">
            <Text className="w-20">催化剂:</Text>
            {catalyst && (
              <Image
                src={catalyst}
                alt="catalyst"
                width={70}
                height={70}
                className="bg-white rounded-md p-2"
              />
            )}
          </Flex>
          <Text>
            反应温度: &nbsp;{" "}
            {JSON.parse(currentNode.data.detail).temperature.toFixed(1)}℃
          </Text>
        </Flex>
      ) : (
        <Button
          radius="full"
          className="hover:cursor-pointer"
          variant="outline"
          onClick={onClick}
        >
          {text}
        </Button>
      )}

      {Boolean(Object.keys(selectCondition).length) && (
        <Flex direction="column">
          <Text>反应溶剂: {selectCondition.solvent}</Text>
          <Text>催化剂: {selectCondition.catalyst}</Text>
          <Text>反应温度: {selectCondition.temperature.toFixed(3)}</Text>
        </Flex>
      )}
      {error && (
        <Text size="1" color="red">
          无法获取条件:( 可以再次尝试获取
        </Text>
      )}
    </>
  );
};

export default RouteDetail;
