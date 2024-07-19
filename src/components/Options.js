import { snakeCaseToProperString } from "../constants";
export function Options({ callback, optionsArray, title, stateVar }) {
  //   console.log(callback, optionsArray, title, stateVar);
  return (
    <div>
      <span className="options-title">{title}</span>
      <select
        className="options"
        value={stateVar || "Please select a value"}
        onChange={callback}
      >
        <option value="Please select a value">Please Select a Value</option>
        {optionsArray.map((option, i) => {
          return (
            <option key={i} value={`${option}`}>
              {snakeCaseToProperString(option)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
