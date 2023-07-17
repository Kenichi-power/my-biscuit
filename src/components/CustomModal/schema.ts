import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  middleName: yup.string(),
  phoneNumber: yup.string().required(),
  email: yup.string().email(),
  cardId: yup.string().required(),
  date: yup.date().required(),
});
