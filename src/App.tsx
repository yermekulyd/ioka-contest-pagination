import { useState, useEffect } from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import { User } from "./data/user";
import "./styles/App.scss";

const ITEMS_PER_PAGE = 5;
const USERS_LENGTH = 100;
const STEP_SKIP = 3;
const BASE_URL = "https://dummyjson.com/users";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<User[]>([]);

  const totalPages = Math.ceil(USERS_LENGTH / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    fetch(`${BASE_URL}?limit=${ITEMS_PER_PAGE}&skip=${startIndex}`)
      .then((res) => res.json())
      .then((response) => {
        setCurrentData(response.users);
      });
  };

  return (
    <div className="app">
      <h1 className="app__title">Таблица пользователей!</h1>
      <Table data={currentData} />
      <Pagination
        totalPages={totalPages}
        step={STEP_SKIP}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default App;
