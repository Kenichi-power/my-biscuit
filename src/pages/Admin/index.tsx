import React, { useState } from "react";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../fb-config";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import Person from "@mui/icons-material/Person";
import Birth from "@mui/icons-material/Cake";

import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AdminWrapper = styled.div`
  display: flex;
  border-radius: 10px;
  background: #404042;
  flex-direction: column;
  width: 80%;
  height: 65vh;
`;
export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #404042;
  min-width: 400px;
`;

type DataRow = {
  firstName: string;
  lastName: string;
  fathersName: string;
  phoneNumber: string;
  email: string;
  cardId: string;
  date: string;
};
const Admin = () => {
  const [guest, setGuest] = useState(false);
  const navigation = useNavigate();

  const getData = async (state?: any) => {
    const guestsCol = collection(db, "guests");
    const guestsSnapshot = await getDocs(guestsCol);
    const guestList: DataRow[] = guestsSnapshot.docs.map(
      (doc) => doc.data() as DataRow
    );
    const filteredArray = guestList.filter((obj) => {
      const day = new Date(obj.date).getDate();
      const month = new Date(obj.date).getMonth();
      const todayDay = new Date().getDate();
      const todayMonth = new Date().getMonth();
      return day === todayDay && month === todayMonth && obj;
    });

    return state ? filteredArray : guestList;
  };

  const { data, isSuccess, refetch }: any = useQuery({
    queryFn: () => getData(guest),
    queryKey: ["guests"],
    enabled: true,
    refetchInterval: 1000,
  });
  const handleClick = () => [setGuest(!guest), refetch()];
  const exportExcel = () => {
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, `GuestList1`);
    XLSX.writeFile(wb, `GuestList.xlsx`);
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: "Имя",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Фамилия",
      selector: (row) => row.lastName,
      sortable: true,
    },
  ];

  const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({
    data,
  }) => {
    return (
      <div style={{ flexDirection: "column" }}>
        <p>Имя: {data.firstName}</p>
        <p>Фамилия: {data.lastName}</p>
        {data.fathersName && <p>Отчество: {data.fathersName}</p>}
        <p>Номер телфона: {data.phoneNumber}</p>
        <p>Номер карты: {data.cardId}</p>
        <p>
          Дата рождения: {new Date(data.date).getDate()}/
          {new Date(data.date).getMonth() + 1}/
          {new Date(data.date).getFullYear()}
        </p>
      </div>
    );
  };

  const customStyles = {
    table: {
      style: {
        maxHeight: "50vh", // override the row height
      },
    },
    subHeader: {
      style: {
        maxHeight: "5vh",
      },
    },
  };
  const buttonStyle = {
    color: "white",
    backgroundColor: "#838383",

    "&:active": {
      backgroundColor: "#ffc906e4",
      color: "black",
    },
    "&:hover": {
      backgroundColor: "#ffc906e4",
      color: "black",
    },
  };

  return (
    <MainContainer>
      <div style={{ position: "absolute", top: 100 }}>
        <img
          width={400}
          height={"100%"}
          src={require("../../assets/photoeditorsdk-export.png")}
          alt=""
          onClick={() => navigation("/")}
        />
      </div>
      <AdminWrapper>
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Button onClick={handleClick} sx={buttonStyle}>
            {!guest ? <Person /> : <Birth />}
          </Button>
          <Button onClick={exportExcel} sx={buttonStyle}>
            <DownloadIcon />
          </Button>
        </div>
        <DataTable
          fixedHeader
          columns={columns}
          data={data}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          expandOnRowClicked
          expandableRowsHideExpander
          pagination
          defaultSortFieldId={1}
          progressPending={!isSuccess}
          customStyles={customStyles}
        />
      </AdminWrapper>
    </MainContainer>
  );
};

export default Admin;
