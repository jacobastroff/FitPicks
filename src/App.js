import { useEffect, useRef, useReducer } from "react";
import { NavBar } from "./NavBar";
import { NavLeftSide } from "./components/NavLeftSide";
import { Options } from "./components/Options";
import { Search } from "./components/Search";
import { Main } from "./components/Main";
import { WorkoutList } from "./components/WorkoutList";
import { WorkoutDetails } from "./components/WorkoutDetails";
import {
  API_KEY,
  allExerciseTypes,
  allMuscleGroups,
  images,
  allDifficulties,
} from "./constants";

const initialState = {
  muscleGroup: "",
  query: "",
  difficulty: "",
  exerciseType: "",
  isLoading: false,
  isError: false,
  workouts: null,
  selectedWorkout: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setWorkouts":
      return { ...state, workouts: action.payload };
    case "setError":
      return { ...state, isError: action.payload };
    case "setLoading":
      return { ...state, isLoading: action.payload };
    case "setMuscleGroup":
      return {
        ...state,
        muscleGroup: action.payload,
      };
    case "setQuery":
      return {
        ...state,
        query: action.payload,
      };
    case "setDifficulty":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "setExerciseType":
      return {
        ...state,
        exerciseType: action.payload,
      };
    case "setSelectedWorkout":
      return { ...state, selectedWorkout: action.payloao };
    default:
      console.error("Action not recognized");
  }
}

function App() {
  console.log(images.get("cardio"));

  const [
    {
      muscleGroup,
      query,
      difficulty,
      exerciseType,
      isLoading,
      isError,
      workouts,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const selectedValue = useRef({
    query: "",
    value: "",
  });
  function isEmpty(val) {
    return (
      val === "" || val?.toLowerCase() === "Please select a value".toLowerCase()
    );
  }

  useEffect(
    function () {
      const controller = new AbortController();
      const settings = {
        headers: {
          "X-api-key": API_KEY,
        },
        signal: controller.signal,
      };

      async function fetchData() {
        try {
          dispatch({ type: "setError", payload: false });
          dispatch({ type: "setLoading", payload: true });
          if (isEmpty(selectedValue.current.value)) {
            selectedValue.current = {
              query: !isEmpty(query)
                ? "name"
                : !isEmpty(muscleGroup)
                ? "muscle"
                : !isEmpty(exerciseType)
                ? "type"
                : !isEmpty(difficulty)
                ? "difficulty"
                : "",
              value:
                [query, muscleGroup, exerciseType, difficulty].find(
                  (val) =>
                    val &&
                    val.toLowerCase() !== "Please select a value".toLowerCase()
                ) || "Please select a value",
            };
          }
          if (isEmpty(selectedValue.current.value))
            throw new Error("Please search for a workout");

          // const linkAPI = `https://api.api-ninjas.com/v1/exercises${
          //   !checkIsEmpty(query) ? `?name=${query}` : ""
          // }${!checkIsEmpty(exerciseType) ? `?type=${exerciseType}` : ""}${
          //   !checkIsEmpty(muscleGroup) ? `?muscle=${muscleGroup}` : ""
          // }${!checkIsEmpty(difficulty) ? `?difficulty=${difficulty}` : ""}`;
          const linkAPI = `https://api.api-ninjas.com/v1/exercises${
            selectedValue
              ? `?${selectedValue.current.query}=${selectedValue.current.value}`
              : ""
          }`;

          const res = await fetch(linkAPI, settings);
          if (!res.ok) throw new Error("Bad Request. Try again...");
          const data = await res.json();

          dispatch({ type: "setLoading", payload: false });
          dispatch({ type: "setWorkouts", payload: data });
          console.log(data);
          if (!data.length) throw new Error("No results found");
          //   Render List
        } catch (err) {
          //   console.log(err);
          if (!err.message.includes("signal")) {
            //React bug causes signal abort to cause error
            console.error(err.message);
            dispatch({ type: "setLoading", payload: false });
            dispatch({ type: "setError", payload: err.message });
          }
        }
      }
      fetchData();
      return () => {
        controller.abort();
      };

      //   console.log("YESSIR");
    },
    [muscleGroup, query, difficulty, exerciseType]
  );
  return (
    <>
      <NavBar>
        <NavLeftSide>
          <Options
            stateVar={exerciseType}
            optionsArray={allExerciseTypes}
            callback={(e) => {
              selectedValue.current = {
                query: "type",
                value: e.target.value,
              };

              dispatch({ type: "setExerciseType", payload: e.target.value });
            }}
            title="Choose Exercise Type"
          />

          <Options
            stateVar={muscleGroup}
            optionsArray={allMuscleGroups}
            callback={(e) => {
              selectedValue.current = {
                query: "muscle",
                value: e.target.value,
              };
              dispatch({ type: "setMuscleGroup", payload: e.target.value });
            }}
            title="Choose Muscle Group"
          />
          <Options
            stateVar={difficulty}
            optionsArray={allDifficulties}
            callback={(e) => {
              selectedValue.current = {
                query: "difficulty",
                value: e.target.value,
              };
              dispatch({ type: "setDifficulty", payload: e.target.value });
            }}
            title="Choose Difficulty"
          />
        </NavLeftSide>

        <Search
          stateVar={query}
          callback={(e) => {
            selectedValue.current = {
              query: "name",
              value: e.target.value,
            };

            dispatch({ type: "setQuery", payload: e.target.value });
          }}
        />
      </NavBar>
      <Main>
        <WorkoutList
          workouts={workouts}
          isLoading={isLoading}
          isError={isError}
          images={images}
        />
        <WorkoutDetails />
      </Main>
    </>
  );
}
export default App;
