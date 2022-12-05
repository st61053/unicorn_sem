import { useState } from "react";

const Item = (props) => {
  const [count, setCount] = useState(props.item.count);

  return (
    <div
      style={{
        padding: "0.5rem 2rem 0.5rem 3rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <input
        style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
        type="checkbox"
        onChange={props.onChangeState}
        checked={props.item.state === "completed" ? "checked" : ""}
      />
      <h3>{props.item.content}</h3>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <input
          type="range"
          name="count"
          min="1"
          max="10"
          onMouseUp={() => props.onChangeCount(count)}
          onChange={(e) => setCount(e.target.value)}
          defaultValue={props.item.count}
          style={{ marginLeft: "auto" }}
        />
        <label htmlFor="count">{count}</label>
        <span
          className="material-symbols-outlined"
          onClick={props.onRemove}
          style={{
            cursor: "pointer",
            width: "1.5rem",
            height: "1.5rem",
          }}
        >
          close
        </span>
      </div>
    </div>
  );
};

export default Item;
