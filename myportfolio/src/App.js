import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setFilteredUsers(sortedUsers);
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredUsers = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );

    setFilteredUsers(filteredUsers);
  };

  return (
    <div className="App">
      <h1>User Grid</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleFilter}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortConfig.key === "name" && sortConfig.direction}
            </th>
            <th onClick={() => handleSort("username")}>
              Username {sortConfig.key === "username" && sortConfig.direction}
            </th>
            <th onClick={() => handleSort("email")}>
              Email {sortConfig.key === "email" && sortConfig.direction}
            </th>
            <th onClick={() => handleSort("phone")}>
              Phone {sortConfig.key === "phone" && sortConfig.direction}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
