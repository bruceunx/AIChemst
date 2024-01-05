import React, { useEffect, useState } from "react";
import { Flex, RadioGroup, Table } from "@radix-ui/themes";
import Reaction from "./Reaction";
import { useReactFlow } from "reactflow";
import { getChemicalSVG } from "../utils/api";

const Reactions: React.FC<any> = ({ routes, currentNode }) => {
  const [defaultValue, setDefaultValue] = useState<string>("0");
  const [tempNodes, setTempNodes] = useState<any[]>([]);
  const [tempEdges, setTempEdges] = useState<any[]>([]);

  const { addEdges, addNodes, setEdges, setNodes, fitView } = useReactFlow();

  const generateNode = async (smiles: string, idx: number, value: number) => {
    const svg = await getChemicalSVG(smiles);
    if (svg === null) {
      return null;
    } else {
      const svgUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      let _id = `chemNode_${currentNode.id}_${idx}_${value}`;
      if (idx % 2 === 1) {
        idx = (idx + 1) / -2;
      } else {
        idx = idx / 2;
      }
      const offsetY = 100 * idx;
      return {
        id: _id,
        type: "chemNode",
        data: { imgUrl: svgUrl, isLeaf: true, smiles: smiles },
        position: {
          x: currentNode.position.x - 300,
          y: currentNode.position.y + offsetY,
        },
      };
    }
  };

  const generateEdge = (chemNode: any, reactionNode: any) => {
    let _id = `e${chemNode.id}-${reactionNode.id}`;
    return {
      id: _id,
      source: `${chemNode.id}`,
      target: `${reactionNode.id}`,
      type: "smoothstep",
    };
  };

  useEffect(() => {
    setTempNodes([]);
    setTempEdges([]);
    setDefaultValue("0");
  }, [currentNode]);

  const onChange = async (value: string) => {
    if (Number.parseInt(value) < 0) return;
    setDefaultValue(value);

    if (tempNodes.length > 0) {
      setNodes((nodes) => nodes.filter((node) => !tempNodes.includes(node.id)));
    }
    if (tempEdges.length > 0) {
      setEdges((edges) => edges.filter((edge) => !tempEdges.includes(edge.id)));
    }

    setTempNodes([]);
    setTempEdges([]);

    const route = routes[value];
    const reactants = route.outcome.split(".");

    let newChemNodes = [];

    for (let i = 0; i < reactants.length; i++) {
      let node = await generateNode(reactants[i], i, Number.parseInt(value));
      if (node !== null) {
        newChemNodes.push(node);
      }
    }

    let newReactionNode = {
      id: `reactionNode_${currentNode.id}`,
      type: "reactionNode",
      data: {
        condition: "#R",
        reactants: route.outcome,
        product: currentNode.data.smiles,
      },
      position: {
        x: currentNode.position.x - 120,
        y: currentNode.position.y + 24,
      },
    };

    let newEdges = newChemNodes.map((chemNode: any) =>
      generateEdge(chemNode, newReactionNode),
    );
    newEdges.push({
      id: `e${newReactionNode.id}-${currentNode.id}`,
      source: newReactionNode.id,
      target: currentNode.id,
      type: "smoothstep",
    });

    newChemNodes.push(newReactionNode);
    setTempNodes(newChemNodes.map((node) => node.id));
    setTempEdges(newEdges.map((edge) => edge.id));

    addNodes(newChemNodes);
    addEdges(newEdges);

    function sleep(milliseconds: number) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    await sleep(1000);

    fitView();
  };
  return (
    <RadioGroup.Root onValueChange={onChange} value={defaultValue}>
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
                <Table.ColumnHeaderCell>可靠性</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-[800px]">
                  反应路线
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>选择</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {routes.map((route: any, idx: number) => (
                <Reaction
                  route={route}
                  target={currentNode.data.smiles}
                  key={idx}
                  idx={idx}
                />
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      </Flex>
    </RadioGroup.Root>
  );
};

export default Reactions;
