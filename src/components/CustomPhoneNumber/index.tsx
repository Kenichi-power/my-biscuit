import { forwardRef } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { TextField, makeStyles } from "@mui/material";

// const useStyles = makeStyles((theme: any): any => ({
//   input: {
//     backgroundColor: "#fff",
//   },
// }));

const CustomPhoneNumber = (props: any, ref: any) => {
  //   const classes = useStyles<any>();

  return (
    <TextField
      {...props}
      //   InputProps={{
      //     className: classes.input,
      //   }}
      inputRef={ref}
      fullWidth
      size="small"
      label="Phone Number"
      variant="outlined"
      name="phone"
    />
  );
};
export default forwardRef(CustomPhoneNumber);
