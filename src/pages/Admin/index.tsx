import React from "react";
import { styled } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../../fb-config";
// import { exportToExcel } from "react-json-to-excel";

import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import { Button } from "@mui/material";

export const AdminWrapper = styled.div`
  display: flex;
  border: 1px solid white;
  border-radius: 10px;
  background: #404042;
  flex-direction: column;
  width: 100%;
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
  middleName: string;
  phoneNumber: string;
  email: string;
  cardId: string;
  date: string;
};
const Admin = () => {
  const client = useQueryClient();

  const getData = async (state?: any) => {
    const guestsCol = collection(db, "guests");
    const guestsSnapshot = await getDocs(guestsCol);
    const guestList: DataRow[] = guestsSnapshot.docs.map(
      (doc) => doc.data() as DataRow
    );
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10); // Форматируем в "гггг-мм-дд"

    // Фильтруем массив объектов, оставляя только те, у которых сегодня день рождения
    const filteredArray = guestList.filter((obj) => {
      // new Date(obj.date).toISOString().slice(0, 10) === todayFormatted}
      const day = new Date(obj.date).getDate();
      const month = new Date(obj.date).getMonth();
      const todayDay = new Date().getDate();
      const todayMonth = new Date().getMonth();
      return day === todayDay && month === todayMonth && obj;
    });
    console.log("filteredArray", filteredArray);

    return state ? filteredArray : guestList;
    // return state === 'birthday' ? guestList.filter(person=>{
    //   if(new Date(data.date))
    // })
  };
  const deletePerson = async (id: any) => {
    await deleteDoc(doc(db, "guests", id));
  };
  const { data, isSuccess }: any = useQuery({
    queryFn: () => getData(true),
    queryKey: ["guests"],
    enabled: true,
    refetchInterval: 3000,
  });

  const { mutate: removePerson } = useMutation({
    mutationFn: deletePerson,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["guests"] });
    },
  });

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
    console.log("data", data);
    return (
      <div style={{ flexDirection: "column" }}>
        <p>Имя: {data.firstName}</p>
        <p>Фамилия: {data.lastName}</p>
        <p>Номер телфона: {data.phoneNumber}</p>
        <p>Номер карты: {data.cardId}</p>
        <p>
          Дата рождения: {new Date(data.date).getDate()}/
          {new Date(data.date).getMonth()}/{new Date(data.date).getFullYear()}
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

  const subHeaderComponentMemo = React.useMemo(() => {
    return <Button>Скачать</Button>;
  }, []);
  return (
    <MainContainer>
      <div style={{ position: "absolute", top: 100 }}>
        <img
          width={400}
          height={"100%"}
          src={require("../../assets/photoeditorsdk-export.png")}
          alt=""
        />
      </div>
      <AdminWrapper>
        <DataTable
          fixedHeader
          columns={columns}
          data={data || []}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          expandOnRowClicked
          expandableRowsHideExpander
          pagination
          defaultSortFieldId={1}
          progressPending={!isSuccess}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          customStyles={customStyles}
        />
      </AdminWrapper>
    </MainContainer>
  );
};

export default Admin;
