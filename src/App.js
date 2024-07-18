import { Children, useReducer } from "react";

const initialState = {
  muscleGroup: null,
  query: "",
  difficulty: null,
  exerciseType: null,
};
const allExerciseTypes = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];
const allMuscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];
const allDifficulties = ["beginner", "intermediate", "expert"];
function reducer(state, action) {
  switch (action.type) {
    case "setMuscleGroup":
      return { ...state, muscleGroup: action.payload };
    case "setQuery":
      return { ...state, query: action.payload };
    case "setDifficulty":
      return { ...state, difficulty: action.payload };
    case "setExerciseType":
      return { ...state, exerciseType: action.payload };
    default:
      console.error("Action not recognized");
  }
}
function App() {
  const [{ muscleGroup, query, difficulty, exerciseType }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <>
      <NavBar>
        <NavSide>
          <Options
            stateVar={exerciseType}
            optionsArray={allExerciseTypes}
            callback={(e) => {
              dispatch({ type: "setExerciseType", payload: e.target.value });
            }}
            title="Choose Exercise Type"
          />

          <Options
            stateVar={muscleGroup}
            optionsArray={allMuscleGroups}
            callback={(e) => {
              dispatch({ type: "setMuscleGroup", payload: e.target.value });
            }}
            title="Choose Muscle Group"
          />
          <Options
            stateVar={difficulty}
            optionsArray={allDifficulties}
            callback={(e) => {
              dispatch({ type: "setDifficulty", payload: e.target.value });
            }}
            title="Choose Difficulty"
          />
        </NavSide>
        <NavSide>
          <Search />
        </NavSide>
      </NavBar>
    </>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function NavSide({ children }) {
  return <div class="left-nav-side">{children}</div>;
}
function Logo() {
  return <span className="logo">FitPicks</span>;
}
function Options({ callback, optionsArray, title, stateVar }) {
  console.log(callback, optionsArray, title, stateVar);
  return (
    <div>
      <span className="options-title">{title}</span>
      <select
        className="options"
        value={stateVar || "Please select a value"}
        onChange={callback}
      >
        <option value="Please select a value">Please Select a Value</option>
        {optionsArray.map((option) => {
          return (
            <option value={`${option}`}>
              {option[0].toUpperCase() +
                option.slice(1).toLowerCase().replaceAll("_", " ")}
            </option>
          );
        })}
      </select>
    </div>
  );
}
function Search({ stateVar, callback }) {
  return (
    <div>
      <input
        class="search-input"
        value={stateVar}
        onChange={callback}
        placeholder="Type Specific Workout Name Here..."
      />
    </div>
  );
}
export default App;
