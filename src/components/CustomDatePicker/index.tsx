import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface CustomDatePickerProps {
  name: string;
  label: string;
  type?: string;
  error?: boolean;
}

const CustomDatePicker = ({ ...props }: CustomDatePickerProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      onChange={(val) => {
        console.log("val", val);
        setFieldValue(field.name, val);
      }}
      label={props.label}
      slots={{
        textField: (textFieldProps) => {
          return (
            <TextField
              {...textFieldProps}
              error={props.error}
              style={{ width: "100%" }}
            />
          );
        },
      }}
    />
  );
};
export default CustomDatePicker;
