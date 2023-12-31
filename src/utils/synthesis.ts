import lodash from "lodash";
import { ReactFlowJsonObject } from "reactflow";

interface _ReactionNode {
  id: string;
  detail: string | undefined;
  next: _ChemNode[];
}

interface _ChemNode {
  id: string;
  smiles: string;
  next: _ReactionNode[];
}

class Analyzer {
  private _flowChart: ReactFlowJsonObject;
  private _head: _ChemNode | undefined;

  constructor(flowChart: ReactFlowJsonObject) {
    this._flowChart = flowChart;
    this.makeLink();
  }

  getNodeLink(): _ChemNode {
    return this._head!;
  }

  makeLink(): void {
    this.getHeadNode();
    this.makeLineHelper(this._head!);
  }

  makeLineHelper(currentNode: _ChemNode | _ReactionNode): void {
    for (const edge of this._flowChart.edges) {
      if (edge.target === currentNode.id) {
        const nextNode = this.getTargetNode(edge.source);
        // @ts-ignore-next-line
        currentNode.next.push(nextNode);
        this.makeLineHelper(nextNode);
      }
    }
  }

  getTargetNode(id: string): _ChemNode | _ReactionNode {
    const head = lodash.filter(this._flowChart.nodes, function (o) {
      return o.id === id;
    })[0];
    if (head.type === "chemNode") {
      return {
        id: head.id,
        smiles: head.data.smiles,
        next: [],
      };
    } else {
      return {
        id: head.id,
        detail: head.data.detail,
        next: [],
      };
    }
  }

  getHeadNode(): void {
    const head = lodash.filter(this._flowChart.nodes, function (o) {
      return o.data.isTarget === true;
    })[0];
    this._head = {
      id: head.id,
      smiles: head.data.smiles,
      next: [],
    };
  }
}

export default Analyzer;
