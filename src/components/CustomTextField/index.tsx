import { Field } from "formik";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  name: string;
  label: string;
  type?: string;
  error?: boolean;
}

const CustomTextField = ({
  name,
  label,
  type,
  error,
}: CustomTextFieldProps) => {
  return (
    <Field validateOnBlur validateOnChange name={name}>
      {({ field }: any) => {
        return (
          <TextField
            style={{ width: "100%" }}
            {...field}
            id="outlined-basic"
            label={label}
            variant="outlined"
            type={type}
            error={!!error}
          />
        );
      }}
    </Field>
  );
};
export default CustomTextField;
