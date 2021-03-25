import React from "react";

export default function PersonForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          name:
          <input value={props.newName} onChange={props.nameHandleOnChange} />
        </div>
        <div>
          phone:
          <input value={props.newPhone} onChange={props.phoneHandleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}
