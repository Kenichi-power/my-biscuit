import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface CustomDatePickerProps {
  name: string;
  label: string;
  type?: string;
  error?: any;
}

const CustomDatePicker = ({ ...props }: CustomDatePickerProps) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      label={props.label}
      slots={{
        textField: (textFieldProps) => {
          return <TextField {...textFieldProps} error={props.error} />;
        },
      }}
    />
  );
};
export default CustomDatePicker;