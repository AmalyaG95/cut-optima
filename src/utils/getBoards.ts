import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants";
import { DetailsDataTableState } from "../features/detailsDataTable/detailsDataTableSlice";

type DetailSizes = {
  width: number;
  height: number;
};

export type Node = DetailSizes & {
  x: number;
  y: number;
  used?: boolean;
  down?: Node;
  right?: Node;
  fit?: Node;
};

type ExpandedDetails = DetailSizes & {
  area: number;
  fit?: Node;
};

export type TBoard = [ExpandedDetails[], Node];

const getBoards = (details: DetailsDataTableState[]): TBoard[] => {
  const sortCompareFunction = (
    a: ExpandedDetails,
    b: ExpandedDetails
  ): number => {
    const sortCriteria: Record<
      string,
      (a: ExpandedDetails, b: ExpandedDetails) => number
    > = {
      width: (a, b) => b.width - a.width,
      height: (a, b) => b.height - a.height,
      max: (a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height),
      min: (a, b) => Math.min(b.width, b.height) - Math.min(a.width, a.height),
    };

    const msort = (
      a: ExpandedDetails,
      b: ExpandedDetails,
      criteria: string[]
    ): number =>
      criteria.reduce((result, criterion) => {
        if (result !== 0) return result;
        return sortCriteria[criterion](a, b);
      }, 0);

    return msort(a, b, ["max", "min", "height", "width"]);
  };

  const splitNode = (
    node: Node,
    width: number,
    height: number,
    isVertical: boolean
  ): Node => {
    node.used = true;
    const remainingWidth = node.width - width;
    const remainingHeight = node.height - height;

    if (isVertical) {
      node.down = {
        x: node.x,
        y: node.y + height,
        width: node.width,
        height: remainingHeight,
      };
      node.right = {
        x: node.x + width,
        y: node.y,
        width: remainingWidth,
        height: height,
      };
    } else {
      node.down = {
        x: node.x,
        y: node.y + height,
        width: remainingWidth,
        height: height,
      };
      node.right = {
        x: node.x + width,
        y: node.y,
        width: node.width,
        height: remainingHeight,
      };
    }

    return node;
  };

  const findNode = (root: Node, width: number, height: number): Node | null => {
    const { width: rootWidth, height: rootHeight, used, right, down } = root;
    const nodeDefaultValue = { used: false, x: 0, y: 0, width: 0, height: 0 };

    if (used) {
      const rightNode = findNode(right || nodeDefaultValue, width, height);
      const downNode = findNode(down || nodeDefaultValue, width, height);
      return rightNode || downNode;
    } else if (width <= rootWidth && height <= rootHeight) return root;
    else return null;
  };

  const arrangeBlocks = (
    detailBlocks: ExpandedDetails[],
    isVertical: boolean
  ): Node => {
    const root: Node = {
      x: 0,
      y: 0,
      width: BOARD_WIDTH,
      height: BOARD_HEIGHT,
    };

    const blocksCopy = [...detailBlocks];

    blocksCopy.forEach((block) => {
      const { width, height } = block;
      const node = findNode(root, width / 5, height / 5);

      if (!!node) {
        block.fit = splitNode(node, width / 5, height / 5, isVertical);
      }
    });

    return root;
  };

  const boards: TBoard[] = [];
  let sortedDetails: ExpandedDetails[] = [];

  for (let i = 0; i < details.length; i++) {
    for (let j = 0; j < details[i].quantity; j++)
      sortedDetails.push({
        width: details[i].width,
        height: details[i].height,
        area: details[i].width * details[i].height,
      });
  }

  sortedDetails.sort(sortCompareFunction);

  while (sortedDetails.length > 0) {
    const root = arrangeBlocks(sortedDetails, true);

    boards.push([sortedDetails.filter((el) => !!el.fit), root]);
    sortedDetails = sortedDetails.filter((el) => !el.fit);
  }

  return boards;
};

export default getBoards;
