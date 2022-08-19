import React from "react";
import {
  useTable,
  useFilters,
  useBlockLayout,
  useSortBy,
  usePagination,
} from "react-table";
import { Table } from "semantic-ui-react";
import { FixedSizeList } from "react-window";
import { Filter, DefaultColumnFilter } from "./filters";

const ReactTable = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        initialState: { pageIndex: 0, pageSize: 10 },
      },
      useFilters,
      useSortBy,
      usePagination,
      useBlockLayout
    );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];

      const itemLoading = index === row.length;

      if (itemLoading) {
        <div style={style}>loading...</div>;
      } else {
        prepareRow(row);
        return (
          <div {...row.getRowProps({})} className="trBody" style={style}>
            {row.cells.map((cell) => {
              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
          </div>
        );
      }
    },
    [prepareRow, rows]
  );

  return (
    <>
      <Table {...getTableProps()} className=" red" size="large">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="trDiv">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <div {...getTableBodyProps()}>
          <FixedSizeList
            height={400}
            itemSize={50}
            itemCount={rows.length}
            overscanCount={4}
          >
            {RenderRow}
          </FixedSizeList>
        </div>
      </Table>
    </>
  );
};

export default ReactTable;
