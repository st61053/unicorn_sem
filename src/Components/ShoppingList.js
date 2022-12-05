import { useState, useEffect } from "react";
import Calls from "../Calls";
import Item from "./Items";

const ShopingList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const fetchData = async () => {
    try {
      await Calls.getShoppingListAll().then((result) => setData(result));
      setIsOffline(false);
    } catch (error) {
      setIsOffline(true);
    }

    setIsLoading(false);
  };

  // ---------------  change data functions ---------------

  async function handleAddItem(e) {
    const newItem = {
      content: input,
      state: "active",
      count: 1,
    };

    if (e.key === "Enter") {
      setIsLoading(true);
      await Calls.createShoppingItem(newItem).then(fetchData());
      setInput("");
    }
  }

  async function handleChangeState(id) {
    setIsLoading(true);
    const item = await Calls.getShoppingItem(id);

    const updateState = {
      state: item.state === "completed" ? "active" : "completed",
    };

    await Calls.updateShoppingItem(id, updateState);
    fetchData();
  }

  async function handleChangeCount(id, count) {
    const updateCount = {
      count: count,
    };

    await Calls.updateShoppingItem(id, updateCount);
    fetchData();
  }

  async function handleRemove(id) {
    setIsLoading(true);
    await Calls.deleteShoppingItem(id);
    fetchData();
  }

  // ---------------  filter functions ---------------

  function handleFilterAll() {
    setFilteredData(data);
  }

  function handleFilterActive() {
    setFilteredData(data.filter((item) => item.state === "active"));
  }

  function handleFilterPurchased() {
    setFilteredData(data.filter((item) => item.state === "completed"));
  }

  return (
    <div
      style={{
        width: "40rem",
        border: "2px solid #D5DBDB",
        margin: "7rem 0 0 0",
        maxHeight: "75vh",
        overflow: "auto",
      }}
    >
      <div style={{ position: "sticky", top: "0", backgroundColor: "white" }}>
        <h1
          style={{
            padding: "1rem 3rem 0 3rem",
            margin: "0 0",
          }}
        >
          Shopping list
        </h1>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            padding: "1rem 3rem",
            borderBottom: "2px solid #D5DBDB",
          }}
        >
          <span style={{ cursor: "pointer" }} onClick={() => handleFilterAll()}>
            All
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleFilterActive()}
          >
            Active
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => handleFilterPurchased()}
          >
            Purchased
          </span>
        </div>
      </div>
      {isOffline && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            padding: "1rem",
            borderRadius: "1rem",
            fontSize: "1rem",
            margin: "2rem 2rem 0.5rem 3rem"
          }}
        >
          Server is offline
        </div>
      )}
      {isLoading
        ? filteredData &&
          filteredData.map((item, index) => (
            <div
              key={index}
              className="skeleton"
              style={{
                backgroundColor: "lightgray",
                borderRadius: "10px",
                height: "2rem",
                margin: "1.5rem 2rem 2.1rem 3rem",
              }}
            ></div>
          ))
        : filteredData &&
          filteredData.map((item) => (
            <Item
              key={item.id}
              item={item}
              onChangeState={() => handleChangeState(item.id)}
              onChangeCount={(count) => handleChangeCount(item.id, count)}
              onRemove={() => handleRemove(item.id)}
            />
          ))}

      <div
        style={{
          padding: "1.5rem 3rem 2rem 3rem",
          position: "sticky",
          bottom: "0",
          backgroundColor: "white",
        }}
      >
        <input
          style={{
            width: "15rem",
            outline: "0",
            borderWidth: "0 0 2px",
            borderColor: "#D5DBDB",
            fontSize: "1.2rem",
            padding: "0.2rem 0.5rem 0.7rem 0.5rem",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          onKeyDown={(e) => handleAddItem(e)}
          placeholder="Add item..."
        ></input>
      </div>
    </div>
  );
};

export default ShopingList;
