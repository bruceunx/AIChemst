import React, { useEffect, useState } from "react";
import { Flex, RadioGroup, Table } from "@radix-ui/themes";
import Reaction from "./Reaction";
import { useReactFlow, getConnectedEdges, getIncomers, Node } from "reactflow";
import { getChemicalSVG } from "../utils/api";

const Reactions: React.FC<any> = ({ routes, currentNode }) => {
  const [defaultValue, setDefaultValue] = useState<string>("0");

  const { getEdges, getNodes, setEdges, setNodes, fitView } = useReactFlow();

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
    setDefaultValue("0");
  }, [currentNode]);

  const onChange = async (value: string) => {
    setDefaultValue(value);
    if (Number.parseInt(value) < 0) return;

    // remove old nodes and old edges
    const nodes = getNodes();
    const edges = getEdges();
    const removeNodes: Node[] = [];
    const removeNodeIds: string[] = [];
    let incomes = getIncomers(currentNode, nodes, edges);
    while (incomes.length > 0) {
      const firtIncome = incomes.shift();
      removeNodes.push(firtIncome!);
      removeNodeIds.push(firtIncome!.id);
      const newIncomers = getIncomers(firtIncome!, nodes, edges);
      if (newIncomers.length > 0) incomes = incomes.concat(newIncomers);
    }
    const connectedEdges = getConnectedEdges(removeNodes, edges);
    let remainingEdges = edges.filter((edge) => !connectedEdges.includes(edge));
    let remainingNodes = nodes.filter(
      (node) => !removeNodeIds.includes(node.id),
    );

    const route = routes[value];
    const reactants = route.outcome.split(".");

    const newChemNodes = [];

    for (let i = 0; i < reactants.length; i++) {
      const node = await generateNode(reactants[i], i, Number.parseInt(value));
      if (node !== null) {
        // eslint-disable-next-line
        // @ts-ignore
        newChemNodes.push(node);
      }
    }

    const newReactionNode = {
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

    const newEdges = newChemNodes.map((chemNode: Node) =>
      generateEdge(chemNode, newReactionNode),
    );
    newEdges.push({
      id: `e${newReactionNode.id}-${currentNode.id}`,
      source: newReactionNode.id,
      target: currentNode.id,
      type: "smoothstep",
    });

    // eslint-disable-next-line
    // @ts-ignore
    newChemNodes.push(newReactionNode);

    remainingEdges = remainingEdges.concat(newEdges);
    remainingNodes = remainingNodes.concat(newChemNodes);

    setEdges(remainingEdges);
    setNodes(remainingNodes);

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
