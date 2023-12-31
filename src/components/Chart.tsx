import { Button, Flex } from "@radix-ui/themes";
import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  MarkerType,
  Node,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import ReactionNode from "./ReactionNode";
import ChemNode from "./ChemNode";
import { useCallback, MouseEvent, useState } from "react";
import Analyzer from "@/utils/synthesis";

const nodeTypes = {
  chemNode: ChemNode,
  reactionNode: ReactionNode,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 1, stroke: "lightgreen" },
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "lightgreen",
  },
};

export default function Chart({
  handleSelect,
}: {
  handleSelect: (node: Node) => void;
}) {
  const [nodes, _, onNodesChange] = useNodesState([]);
  const [edges, __, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      handleSelect(node);
    },
    [handleSelect],
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      // @ts-ignore-next-line
      const flow = rfInstance.toObject();
      const analysis = new Analyzer(flow);
      console.log(JSON.stringify(analysis.getNodeLink()));
      // upload to api and get notifications
    }
  }, [rfInstance]);

  const onExport = useCallback(() => {
    if (rfInstance) {
      // @ts-ignore-next-line
      const flow = rfInstance.toObject();
      const analysis = new Analyzer(flow);
      console.log(JSON.stringify(analysis.getNodeLink()));
      // upload to api and get pdf
    }
  }, [rfInstance]);

  return (
    <Flex className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        defaultEdgeOptions={defaultEdgeOptions}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={{ hideAttribution: true }}
        // @ts-ignore-next-line
        onInit={setRfInstance}
        fitView
      >
        <Background gap={20} />
        <Panel position="top-right">
          <Button variant="outline" onClick={onSave}>
            保存
          </Button>
          <Button variant="outline" color="indigo" onClick={onExport}>
            导出
          </Button>
        </Panel>
      </ReactFlow>
    </Flex>
  );
}
