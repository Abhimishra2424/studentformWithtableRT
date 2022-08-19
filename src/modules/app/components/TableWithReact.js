import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { FixedSizeList } from "react-window";
import { Button, Container, Grid, Segment, Table } from "semantic-ui-react";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
const data = [
  {
    firstName: "ABHI",
    lastName: "mishra",
    email: "abhi@gmail.com",
    phone: "1234567890",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "abhi@gmail.com",
    phone: "1234567890",
  },
];

const TableWithReact = () => {
  const [tableData, setTableData] = useState(data);
  const [editingRow, setEditingRow] = useState();

  useEffect(() => {
    localStorage.getItem("data") &&
      setTableData(JSON.parse(localStorage.getItem("data")));
  }, []);

  const handleDelete = useCallback(
    (index) => {
      setTableData(tableData.filter((v, i) => i !== index));
    },

    [tableData]
  );

  const tableColumns = useMemo(
    () => [
      {
        Header: "first Name",
        accessor: "firstName",
      },
      {
        Header: "last Name",
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
        Header: "Action",
        id: "action",
        accessor: (originalRow, rowIndex) => {
          return (
            <div className="btn">
              <Button
                primary
                size="mini"
                onClick={() => setEditingRow({ originalRow, rowIndex })}
              >
                Edit
              </Button>
              <Button size="mini" secondary onClick={() => handleDelete(rowIndex)}>
                Remove
              </Button>
            </div>
          );
        },
      },
    ],
    [handleDelete]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableData,
    });

  const handleSubmit = (values) => {
    setTableData((prevData) => {
      return [...prevData, values];
    });
  };

  const handleEdit = useCallback(
    (row, rowIndex) => {
      const editedData = tableData.map((rowData, index) => {
        if (index === rowIndex) {
          return row;
        }
        return rowData;
      });
      setTableData(editedData);
      setEditingRow();
    },
    [tableData]
  );

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);
      return (
        <tr {...row.getRowProps({})} style={style} className="trBodyInTable">
          {row.cells.map((cell) => {
            return <td className="dis" {...cell.getCellProps()}>{cell.render("Cell")}</td>;
          })}
        </tr>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <Container>
              <Segment>
                {editingRow ? (
                  <EditStudent row={editingRow} onSave={handleEdit} />
                ) : (
                  <AddStudent handleSubmit={handleSubmit} />
                )}
              </Segment>
            </Container>
          </Grid.Column>
          <Grid.Column width={10}>
            <Container>
              <Table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="trHeader">
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                {/* <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody> */}

                <tbody {...getTableBodyProps()}>
                  <FixedSizeList
                    height={300}
                    itemSize={50}
                    itemCount={rows.length}
                    overscanCount={4}
                  >
                    {RenderRow}
                  </FixedSizeList>
                </tbody>
              </Table>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default TableWithReact;
