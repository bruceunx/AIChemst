import Image from "next/image";
import { Button, Text } from "@radix-ui/themes";

import { NodeProps } from "@/types";
import { useState } from "react";
import { findRoutes } from "../utils/api";

const NodeDetail: React.FC<NodeProps> = ({ currentNode, setRoutes, locale }) => {
  const [text, setText] = useState<string>(`${locale==="en"?"AI Design": "开始AI设计"}`);
  const [error, setError] = useState<boolean>(false);

  const onClick = async () => {
    setText(`${locale==="en"?"AI Design...": "正在设计中..."}`);
    setError(false);

    const routes = await findRoutes(currentNode.data.smiles);
    if (routes === null) {
      setError(true);
    } else {
      setRoutes(routes);
    }
    setText("开始AI设计");
  };

  return (
    <>
      <Text>SMILES: {currentNode.data.smiles}</Text>
      <Image
        src={currentNode.data.imgUrl}
        alt="currentNode"
        width={270}
        height={270}
        className="bg-green-50 rounded-xl hover:cursor-pointer"
      />
      {currentNode.data.isLeaf && (
        <Button
          radius="full"
          className="hover:cursor-pointer my-4"
          variant="outline"
          onClick={onClick}
        >
          {text}
        </Button>
      )}
      {error && (
        <Text size="1" color="red">
          {locale==="en"?"AI Design failed :(": "AI设计失败 :("}
        </Text>
      )}
    </>
  );
};

export default NodeDetail;
