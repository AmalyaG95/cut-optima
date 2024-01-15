import { memo, useEffect, useRef } from "react";

import { BOARD_HEIGHT, BOARD_WIDTH } from "../../constants";
import { Node, TBoard } from "../../utils/getBoards";

type Props = {
  board: TBoard;
};

const Board = ({ board: [details, root] }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      console.error(
        "Canvas context not supported. Please use a different browser."
      );
      return;
    }

    for (let detail of details) {
      context.fillStyle = "pink";
      context.fillRect(
        detail.fit!.x + 0.5,
        detail.fit!.y + 0.5,
        detail.width / 5,
        detail.height / 5
      );
    }

    const boundary = (node: Node | undefined) => {
      if (node) {
        context.strokeStyle = "black";
        context.strokeRect(node.x + 0.5, node.y + 0.5, node.width, node.height);
        boundary(node.down);
        boundary(node.right);
      }
    };

    boundary(root);

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [details, root]);

  return (
    <canvas ref={canvasRef} width={BOARD_WIDTH} height={BOARD_HEIGHT}>
      <div id="unsupported">
        Sorry, this example cannot be run because your browser does not support
        the &lt;canvas&gt; element
      </div>
    </canvas>
  );
};

export default memo(Board);
