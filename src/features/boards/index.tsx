import { memo, useMemo } from "react";
import { Container } from "@mui/material";

import { selectDetailsDataTable } from "../detailsDataTable/detailsDataTableSlice";
import { useAppSelector } from "../../app/hooks";
import getBoards, { TBoard } from "../../utils/getBoards";
import Board from "./Board";

const Boards = () => {
  const details = useAppSelector(selectDetailsDataTable);
  const boards = useMemo(() => getBoards(details), [details]);

  return (
    <Container component="section">
      {boards.map((board: TBoard, index) => (
        <Board key={index} board={board} />
      ))}
    </Container>
  );
};

export default memo(Boards);
