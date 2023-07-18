import { Button } from "@mui/material";
import { styled } from "styled-components";
import { useState } from "react";
// import { doc, setDoc } from "firebase/firestore/lite";
// import { db } from "../../fb-config";
import CustomModal from "../../components/CustomModal";

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #404042;
  min-width: 400px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 200px;
`;

const Home = () => {
  const [modal, setModal] = useState(false);

  return (
    <Wrapper>
      <div style={{ position: "absolute", top: 100 }}>
        <img
          width={400}
          height={"100%"}
          src={require("../../assets/photoeditorsdk-export.png")}
          alt=""
        />
      </div>
      <ButtonContainer>
        {/* <Button
            sx={{
              color: "white",
              borderRadius: 10,
              backgroundColor: "#ffc906e4",
              width: 300,
              height: 100,
              fontSize: 30,
            }}
            onClick={() =>
              addPerson({
                firstName: "dsa",
                lastName: "asd",
                phoneNumber: "0989808",
              })
            }>
            Войти
          </Button> */}
        <Button
          sx={{
            color: "white",
            borderRadius: 10,
            backgroundColor: "#ffc906e4",
            width: 300,
            height: 100,
            fontSize: 30,
          }}
          onClick={() => setModal(true)}>
          Получить карту
        </Button>
      </ButtonContainer>
      <CustomModal modal={modal} setModal={setModal} />
    </Wrapper>
  );
};

export default Home;
