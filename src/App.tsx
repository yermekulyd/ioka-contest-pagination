import { useState, useEffect } from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import users, { User } from "./data/mockData";
import "./styles/App.scss";

const ITEMS_PER_PAGE = 5;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<User[]>([]);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentData(users.slice(startIndex, endIndex));
  }, [currentPage]);

  return (
    <div className="app">
      <h1 className="app__title">Таблица пользователей!</h1>
      <Table data={currentData} />
      <Pagination
        totalPages={totalPages}
        step={3}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default App;
