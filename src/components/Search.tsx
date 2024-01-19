import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { findRoutes, findSmiles, getChemicalSVG } from "../utils/api";
import { Node, useReactFlow } from "reactflow";
import dynamic from "next/dynamic";

import { useCurrentLocale } from "next-i18n-router/client";
import i18nConfig from "../../i18nConfig";

const ChemEditor = dynamic(() => import("./ChemEditor"), { ssr: false });

export default function Search({
  setRoutes,
  setConditions,
  setCurrentNode,
}: {
  setRoutes: Dispatch<SetStateAction<never[]>>;
  setConditions: Dispatch<SetStateAction<never[]>>;
  setCurrentNode: Dispatch<SetStateAction<Node | null>>;
}) {
  const locale = useCurrentLocale(i18nConfig);

  const { setEdges, setNodes } = useReactFlow();
  const [input, setInput] = useState<string>("");
  const [text, setText] = useState<string>(
    `${locale === "en" ? "Search" : "查询"}`,
  );
  const [error, setError] = useState<boolean>(false);
  const handleClick = async () => {
    if (input.trim().length === 0) return;
    setText(`${locale === "en" ? "Calclulating..." : "计算中..."}`);
    setError(false);

    setRoutes([]);
    setConditions([]);
    setNodes([]);
    setEdges([]);
    setCurrentNode(null);

    const smiles = await findSmiles(input);
    if (smiles === null) {
      setError(true);
    } else {
      const routes = await findRoutes(smiles);
      if (routes === null) {
        setError(true);
      } else {
        const svg = await getChemicalSVG(smiles);
        if (svg !== null) {
          const svgUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
          let node = {
            id: "target_0",
            type: "chemNode",
            data: {
              imgUrl: svgUrl,
              isLeaf: true,
              isTarget: true,
              smiles: smiles,
            },
            position: { x: 300, y: 70 },
          };
          setCurrentNode(node);
          setNodes([node]);
          setEdges([]);
          setRoutes(routes);
        }
      }
    }
    setText(`${locale === "en" ? "Search" : "查询"}`);
  };

  return (
    <Flex direction="row" justify="center" gap="2" align="center" p="2">
      <TextField.Root className="w-64">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          className="outline-none"
          placeholder={`${
            locale === "en"
              ? "Please input standard chemical name or SMILES"
              : "输入标准化学名称或者SMILES"
          }`}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
        />
      </TextField.Root>
      {error && (
        <Text size="2" color="red">
          {locale === "en" ? "Can not find the route :(" : "无法获取路线:("}
        </Text>
      )}
      <Button onClick={handleClick}>{text}</Button>
      <ChemEditor setInput={setInput} locale={locale} />
    </Flex>
  );
}
