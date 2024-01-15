import { memo } from "react";
import { Container, Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { HeaderCell } from "./styled";

import { selectDetailsDataTable } from "./detailsDataTableSlice";
import { Formik } from "formik";
import { validationSchema } from "../../formValidation";

import TableRowForm from "./TableRowForm";

const headerData: string[] = ["Width", "Height", "Quantity"];

const DetailsDataTable = () => {
  const details = useAppSelector(selectDetailsDataTable);

  return (
    <>
      {!!details.length && (
        <Container component="section">
          <Grid container>
            {headerData.map((value: string, index) => (
              <HeaderCell key={index}>{value}</HeaderCell>
            ))}
          </Grid>
          {details.map((detail) => (
            <Formik
              key={detail.id}
              initialValues={detail}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={true}
              onSubmit={() => {}}
              enableReinitialize
            >
              <TableRowForm detail={detail} />
            </Formik>
          ))}
        </Container>
      )}
    </>
  );
};

export default memo(DetailsDataTable);
