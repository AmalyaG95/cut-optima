import { TextField, Typography } from "@mui/material";
import {styled, css} from "@mui/material/styles";

export const HeaderCell = styled(Typography)(css`
    padding: 0.25rem;
    display: flex;
    border: 1px solid grey;
    flex-basis: 20%;
    justify-content: center;
    align-items: center;
`);

export const TextFieldCell = styled(TextField)(css`
    padding: 0.25rem;
    display: flex;
    border: 1px solid grey;
    flex-basis: 20%;
    justify-content: center;
    align-items: center;
    height: 100%;
`);