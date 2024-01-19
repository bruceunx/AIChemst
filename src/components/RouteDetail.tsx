import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

import { RouteProps } from "@/types";
import { findConditions, getChemicalSVG } from "../utils/api";
import { useEffect, useState } from "react";

const RouteDetail: React.FC<RouteProps> = ({
  setConditions,
  currentNode,
  selectCondition,
  locale,
}) => {
  const [text, setText] = useState<string>(
    `${locale === "en" ? "Condition Recommend" : "反应条件推荐"}`,
  );
  const [error, setError] = useState<boolean>(false);
  const [reagent, setReagent] = useState<string | null>(null);
  const [solvent, setSolvent] = useState<string | null>(null);
  const [catalyst, setCatalyst] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  const onClick = async () => {
    setError(false);
    setText(`${locale === "en" ? "Recommend..." : "条件推荐..."}`);
    const result = await findConditions(
      currentNode.data.reactants,
      currentNode.data.product,
    );
    if (result !== null) {
      setConditions(result);
    } else {
      setError(true);
    }
    setText(`${locale === "en" ? "Condition Recommend" : "反应条件推荐"}`);
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
    setTemperature(null);
    setReagent(null);
    setSolvent(null);
    setCatalyst(null);
    if (currentNode.data.detail !== undefined) {
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
    setTemperature(null);
    setReagent(null);
    setSolvent(null);
    setCatalyst(null);
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
        {locale === "en" ? "Condition Recommend" : "反应条件推荐"}
      </Heading>
      <Flex direction="column" gap="2" py="4" align="start" justify="start">
        <Flex direction="row" gap="2">
          <Text className="w-20">
            {locale === "en" ? "Reagent" : "反应试剂"}:
          </Text>
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
          <Text className="w-20">
            {locale === "en" ? "Solvent" : "反应溶剂"}:
          </Text>
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
          <Text className="w-20">
            {locale === "en" ? "Catalyst" : "催化剂"}:
          </Text>
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
          {locale === "en" ? "Temperature" : "反应温度"}: &nbsp;{" "}
          {temperature && `${temperature.toFixed(1)} °C`}
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
          {locale === "en"
            ? "Condition Recommend failed :("
            : "反应条件筛选失败 :("}
        </Text>
      )}
    </>
  );
};

export default RouteDetail;
