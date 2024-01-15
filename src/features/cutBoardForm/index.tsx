import { memo } from "react";
import Box from "@mui/material/Box";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Container, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import TextField from "@mui/material/TextField";

import { INPUTS } from "../../constants";
import { FormValues, inputProps, validationSchema } from "../../formValidation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetFormData,
  saveFormData,
  selectCutBoardForm,
} from "./cutBoardFormSlice";
import { addNewDetailData } from "../detailsDataTable/detailsDataTableSlice";

const CutBoardForm = () => {
  const dispatch = useAppDispatch();
  const cutBoardFormData = useAppSelector(selectCutBoardForm);

  const handleSubmit = (
    values: FormValues,
    { setValues }: FormikHelpers<FormValues>
  ) => {
    dispatch(saveFormData(values));
    dispatch(resetFormData());
    dispatch(addNewDetailData(values));
    setValues(cutBoardFormData);
  };

  return (
    <Container component="section" maxWidth="md">
      <Formik
        initialValues={cutBoardFormData}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors }: any) => (
          <Form
            noValidate
            autoComplete="off"
            className="form"
          >
            {INPUTS.map(({ id, label }) => (
              <Box key={id} mt={2}>
                <Field
                  as={TextField}
                  id={id}
                  required
                  type="number"
                  label={label}
                  name={id}
                  inputProps={inputProps}
                  error={Boolean(errors[id])}
                  helperText={
                    <ErrorMessage
                      name={id}
                      render={(msg) => (
                        <span className="error">{msg}</span>
                      )}
                    />
                  }
                />
              </Box>
            ))}

            <Box mt={2}>
              <IconButton type="submit" aria-label="add" color="secondary">
                <Add />
              </IconButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default memo(CutBoardForm);
