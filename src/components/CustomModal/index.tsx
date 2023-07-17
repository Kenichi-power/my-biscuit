import { Box, Button, Modal } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import CustomTextField from "../CustomTextField";
import CustomDatePicker from "../CustomDatePicker";
import { validationSchema } from "./schema";
import { useNavigate } from "react-router-dom";

interface CustomModalProps {
  modal: boolean;
  setModal: (e: boolean) => void;
}
const CustomModal = ({ modal, setModal }: CustomModalProps) => {
  const navigation = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    email: "",
    acknowledge: false,
    cardId: "",
    date: null,
  };

  const style = {
    display: "flex",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 800,
    borderRadius: 10,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    gap: 2,
    flexDirection: "column",
  };

  const onPress = (e: any) => {
    // e.preventDefault();
    console.log("values sumbmit", e);
    navigation("admin");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            onSubmit={onPress}
            className="relative"
            validationSchema={validationSchema}>
            {({ handleSubmit, errors }: any) => {
              console.log("Errors", errors);
              return (
                <>
                  <CustomTextField
                    label="Фамилия"
                    name="lastName"
                    error={errors.lastName}
                  />
                  <CustomTextField
                    label="Имя"
                    name="firstName"
                    error={errors.firstName}
                  />
                  <CustomTextField
                    label="Отчество"
                    name="middleName"
                    error={errors.middleName}
                  />
                  <CustomDatePicker
                    label="День Рождение"
                    name="date"
                    error={errors.date}
                  />
                  <CustomTextField
                    label="Номер телефона"
                    name="phoneNumber"
                    type="tel"
                    error={errors.phoneNumber}
                  />
                  <CustomTextField
                    label="Почта"
                    name="email"
                    error={errors.email}
                  />

                  <CustomTextField
                    label="Номер карты"
                    name="cardId"
                    error={errors.cardId}
                  />

                  <Button
                    sx={{
                      color: "white",
                      borderRadius: 10,
                      backgroundColor: "#838383",
                      width: 300,
                      height: 80,
                      fontSize: 30,
                    }}
                    onClick={() => handleSubmit(onPress)}>
                    Регистрация
                  </Button>
                </>
              );
            }}
          </Formik>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default CustomModal;
