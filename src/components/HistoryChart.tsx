import { Button, Flex } from "@radix-ui/themes";
import ReactFlow, {
  Background,
  useEdgesState,
  useNodesState,
  MarkerType,
  Node,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import ReactionNode from "./ReactionNode";
import ChemNode from "./ChemNode";
import { useCallback, MouseEvent, useState, useEffect } from "react";
import Analyzer from "@/utils/synthesis";
import { useToast } from "./CustomToast";
import { useSession } from "next-auth/react";
import { saveRoute } from "@/utils/api";

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

export default function HistoryChart({
  handleSelect,
  content,
}: {
  handleSelect: (node: Node) => void;
  content: string;
}) {
  let { showToast } = useToast();
  const [nodes, _, onNodesChange] = useNodesState([]);
  const [edges, __, onEdgesChange] = useEdgesState([]);
  const [rfInstance, setRfInstance] = useState(null);

  const { status, data: session } = useSession();
  const refFlow = useReactFlow();

  const onNodeClick = useCallback(
    (_: MouseEvent, node: Node) => {
      handleSelect(node);
    },
    [handleSelect],
  );
  const onSave = useCallback(async () => {
    if (!session) return;
    if (rfInstance) {
      // @ts-ignore-next-line
      const flow = rfInstance.toObject();
      const analysis = new Analyzer(flow);
      const content = JSON.stringify(flow); // content
      const target = analysis.getNodeLink().smiles; // get target smiles
      // @ts-ignore-next-line
      const res = await saveRoute(session.accessToken, target, content);
      if (res === 0) showToast("反应路线保存成功!");
    }
  }, [rfInstance, showToast, session]);

  const onExport = useCallback(() => {
    if (rfInstance) {
      // @ts-ignore-next-line
      const flow = rfInstance.toObject();
      const analysis = new Analyzer(flow);
      console.log(JSON.stringify(analysis.getNodeLink()));
      // upload to api and get pdf
    }
  }, [rfInstance]);

  useEffect(() => {
    const onRestore = (content: string) => {
      const restoreFlow = async (content: string) => {
        if (refFlow === null) return;
        const flow = JSON.parse(content);
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          refFlow.setNodes(flow.nodes || []);
          refFlow.setEdges(flow.edges || []);
          refFlow.setViewport({ x, y, zoom });
        }
      };
      restoreFlow(content);
    };
    if (refFlow !== null) onRestore(content);
  }, [refFlow, content]);

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
          {status === "authenticated" && (
            <Button variant="outline" onClick={onSave}>
              保存
            </Button>
          )}
          <Button variant="outline" color="indigo" onClick={onExport}>
            导出
          </Button>
        </Panel>
      </ReactFlow>
    </Flex>
  );
}
