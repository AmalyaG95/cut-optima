import * as Yup from "yup";

const inputProps = {
  min: 1,
};

const positiveNumberField: Yup.NumberSchema<number> = Yup.number()
  .required("Please fill this field")
  .positive("Please enter a positive number");

export type FormValues = {
  width: number;
  height: number;
  quantity: number;
};

const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object().shape({
  width: positiveNumberField,
  height: positiveNumberField,
  quantity: positiveNumberField.integer(
    "Please enter a positive integer number"
  ),
});

export { inputProps, validationSchema };
