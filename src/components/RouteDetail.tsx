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
  const [temperature, setTemperature] = useState<number | null>(null);

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
      if (condition.temperature !== null) {
        setTemperature(condition.temperature);
      }
    };
    if (currentNode) {
      try {
        let condition = JSON.parse(currentNode.data.detail);
        updateSvg(condition);
      } catch (err) {
        return;
      }
    }
  }, [currentNode]);

  useEffect(() => {
    const updateSvg = async (condition: any) => {
      if (condition.reagent.length > 0) {
        const res = await getChemicalSVG(condition.reagent);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setReagent(svgUrl);
        }
      } else {
        setReagent(null);
      }
      if (condition.solvent.length > 0) {
        const res = await getChemicalSVG(condition.solvent);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setSolvent(svgUrl);
        }
      } else {
        setSolvent(null);
      }
      if (condition.catalyst.length > 0) {
        const res = await getChemicalSVG(condition.catalyst);
        if (res !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(res)}`;
          setCatalyst(svgUrl);
        }
      } else {
        setCatalyst(null);
      }
      if (condition.temperature !== null) {
        setTemperature(condition.temperature);
      }
    };
    if (Object.keys(selectCondition).length > 0) {
      try {
        updateSvg(selectCondition);
      } catch (err) {
        return;
      }
    }
  }, [selectCondition]);

  return (
    <>
      <Heading align="center" className="py-2">
        反应条件筛选
      </Heading>
      <Flex direction="column" gap="2" py="4" align="start" justify="start">
        <Flex direction="row" gap="2">
          <Text className="w-20">反应试剂:</Text>
          {reagent && (
            <Image
              src={reagent}
              alt="reagent"
              width={70}
              height={70}
              className="bg-green-200 rounded-md p-2"
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
              className="bg-yellow-200 rounded-md p-2"
            />
          )}
        </Flex>
        <Text>
          反应温度: &nbsp; {temperature && `${temperature.toFixed(1)}℃ `}
        </Text>
      </Flex>
      <Button
        radius="full"
        className="hover:cursor-pointer"
        variant="outline"
        onClick={onClick}
      >
        {text}
      </Button>
      {error && (
        <Text size="1" color="red">
          无法获取条件:( 可以再次尝试获取
        </Text>
      )}
    </>
  );
};

export default RouteDetail;
