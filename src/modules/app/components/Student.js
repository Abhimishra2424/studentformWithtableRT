import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button,  } from "semantic-ui-react";
import { useAppContext } from "../../../context/appContext";
import ReactTable from "../../../utilities/ReactTable";

const Student = () => {
  const { getStudent, allStudent } = useAppContext();

  useEffect(() => {
    getStudent();
  }, []);

  const handleDelete = async (e, data) => {
    const { id } = data;
    const res = await axios.delete(`http://localhost:5000/api/student/${id}`);
    if (res.data) {
      getStudent();
      alert("Student Deleted");
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Zip",
        accessor: "zip",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => (
          <>
            <Button primary size="smaill">
              <Link
                to={`/student/form/${props.row.original.id}`}
                style={{
                  color: "white",
                }}
              >
                Edit
              </Link>
            </Button>
            {/* <Button
              secondary
              onClick={(e) => handleDelete(e, props.row.original)}
            >
              Delete
            </Button> */}
          </>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => allStudent, [allStudent]);

  return <ReactTable columns={columns} data={data} />;
};

export default Student;
