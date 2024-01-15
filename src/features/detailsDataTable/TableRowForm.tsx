import { Grid, IconButton } from "@mui/material";
import {
  ErrorMessage,
  Field,
  Form,
  FormikErrors,
  useFormikContext,
} from "formik";
import { FocusEvent, memo } from "react";
import {
  DetailsDataTableState as Detail,
  deleteDetailFromTable,
  editDetailFromTable,
} from "./detailsDataTableSlice";
import { TextFieldCell } from "./styled";
import { inputProps } from "../../formValidation";
import { Close } from "@mui/icons-material";
import { useAppDispatch } from "../../app/hooks";

const isKeyInErrors = (
  key: string,
  errors: FormikErrors<Detail>
): key is keyof Detail => {
  return key in errors;
};

type Props = {
  detail: Detail;
};

const TableRowForm = ({ detail }: Props) => {
  const dispatch = useAppDispatch();
  const { errors, setValues } = useFormikContext<Detail>();

  const handleDeleteCell = (id: string) => {
    dispatch(deleteDetailFromTable(id));
  };

  const handleBlur = (id: string, editableDetail: Detail) => {
    dispatch(editDetailFromTable({ ...editableDetail, id }));
  };

  return (
    <Form noValidate autoComplete="off">
      <Grid container key={detail.id}>
        {Object.keys(detail)
          .splice(1, 4)
          .map((key, index) => (
            <Field
              key={index}
              as={TextFieldCell}
              id={key}
              required
              type="number"
              hiddenLabel
              variant="filled"
              size="small"
              name={key}
              inputProps={inputProps}
              error={Boolean(
                errors && isKeyInErrors(key, errors) && errors[key]
              )}
              helperText={
                <ErrorMessage
                  name={key}
                  render={(msg) => <span className="error">{msg}</span>}
                />
              }
              onBlur={(e: FocusEvent<HTMLInputElement>) => {
                setValues({
                  ...detail,
                  [key]: Number(e.target.value),
                });
                handleBlur(detail.id, {
                  ...detail,
                  [key]: Number(e.target.value),
                });
              }}
            />
          ))}
        <IconButton
          aria-label="close"
          color="secondary"
          onClick={() => handleDeleteCell(detail.id)}
        >
          <Close />
        </IconButton>
      </Grid>
    </Form>
  );
};

export default memo(TableRowForm);
