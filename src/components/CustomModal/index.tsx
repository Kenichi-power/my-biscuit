import { Box, Button, Modal } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Formik } from "formik";
import CustomTextField from "../CustomTextField";
import CustomDatePicker from "../CustomDatePicker";
import { validationSchema } from "./schema";
// import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore/lite";
import { db } from "../../fb-config";
import { useState } from "react";

interface CustomModalProps {
  modal: boolean;
  setModal: (e: boolean) => void;
}
const CustomModal = ({ modal, setModal }: CustomModalProps) => {
  // const navigation = useNavigate();
  const [policy, setPolicy] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    fathersName: "",
    phoneNumber: "",
    email: "",
    cardId: "",
    date: null,
  };

  const style = {
    display: "flex",
    alignItems: "center",
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

  const addPerson = async ({
    firstName,
    lastName,
    fathersName,
    phoneNumber,
    email,
    cardId,
    date,
  }: {
    firstName: string;
    lastName: string;
    fathersName: string;
    phoneNumber: string;
    email: string;
    cardId: string;
    date: string;
  }) => {
    console.log("first", firstName);
    const id = new Date().getTime().toString();

    await setDoc(doc(db, "guests", id), {
      id,
      firstName,
      lastName,
      fathersName,
      phoneNumber,
      email,
      cardId,
      date: date.toString(),
    }).then(() => console.log("success"));
  };

  const onPress = async (e: any) => {
    // e.preventDefault();
    console.log("values sumbmit", e);
    await addPerson(e);
    // navigation("admin");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          {!policy ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onPress}
              className="relative"
              validationSchema={validationSchema}>
              {({ handleSubmit, errors }: any) => {
                // console.log("Errors", errors);
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
                      name="fathersName"
                      error={errors.fathersName}
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
                      type="tel"
                    />

                    <Button
                      sx={{
                        color: "white",
                        borderRadius: 10,
                        backgroundColor: "#838383",
                        width: 300,
                        height: 80,
                        fontSize: 30,
                        "&:active": {
                          backgroundColor: "#ffc906e4",
                        },
                        "&:hover": {
                          backgroundColor: "#ffc906e4",
                        },
                      }}
                      onClick={() => handleSubmit(onPress)}>
                      Регистрация
                    </Button>
                  </>
                );
              }}
            </Formik>
          ) : (
            <h4>
              Уважаемый покупатель,
              <br />
              <br />
              <br />
              Мы рады, что вы являетесь держателем нашей карты любимого
              покупателя. Хотелось бы сообщить вам, что карта предназначена для
              использования только при покупках в нашем заведении.
              <br />
              <br />
              Однако, стоит отметить, что данная карта не действует на товары,
              которые уже имеют скидку. Мы предоставляем скидки на определенные
              товары и акции, но в таких случаях карта не может быть
              использована для дополнительного получения скидки.
              <br />
              <br />
              Мы ценим вашу лояльность и благодарим за вашу поддержку. Если у
              вас возникли какие-либо вопросы относительно использования карты
              или других условий, пожалуйста, обратитесь к нашему персоналу, и
              мы с радостью вам поможем.
            </h4>
          )}
          <Button
            sx={{
              color: "#838383",
            }}
            onClick={() => setPolicy(!policy)}>
            {!policy ? "Правила пользования" : "Назад"}
          </Button>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default CustomModal;
