import React from "react";
import { User } from "../data/user";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Table.scss";

interface TableProps {
  data: User[];
  isLoading: boolean;
}

const Table: React.FC<TableProps> = ({ data, isLoading }) => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? skeletonRows.map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                </tr>
              ))
            : data.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
