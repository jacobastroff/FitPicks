import { useEffect, useRef, useReducer } from "react";
import { NavBar } from "./components/NavBar";
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
  isListLoading: false,
  isDetailsLoading: false,
  isError: false,
  workouts: null,
  selectedWorkout: null,
  savedWorkouts: JSON.parse(localStorage.getItem("savedWorkouts")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setWorkouts":
      return { ...state, workouts: action.payload };
    case "setSavedWorkouts":
      return { ...state, savedWorkouts: action.payload };
    case "setError":
      return { ...state, isError: action.payload };
    case "setListLoading":
      return { ...state, isListLoading: action.payload };
    case "setDetailsLoading":
      return { ...state, isDetailsLoading: action.payload };

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
      return { ...state, selectedWorkout: action.payload };
    default:
      console.error("Action not recognized");
  }
}
function isEmpty(val) {
  return (
    val === "" || val?.toLowerCase() === "Please select a value".toLowerCase()
  );
}
function App() {
  //   console.log(images.get("cardio"));

  const [
    {
      muscleGroup,
      query,
      difficulty,
      exerciseType,
      isListLoading,
      isError,
      workouts,
      selectedWorkout,
      savedWorkouts,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  //   console.log(typeof dispatch);
  const selectedValue = useRef({
    query: "",
    value: "",
  });
  useEffect(
    function () {
      localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
      console.log("DONE");
    },
    [savedWorkouts]
  );
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
          dispatch({ type: "setListLoading", payload: true });
          if (isEmpty(selectedValue.current.value)) {
            selectedValue.current = {
              query: !isEmpty(exerciseType)
                ? "type"
                : !isEmpty(muscleGroup)
                ? "muscle"
                : !isEmpty(difficulty)
                ? "difficulty"
                : !isEmpty(query)
                ? "name"
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

          dispatch({ type: "setListLoading", payload: false });
          const filteredWorkouts = data.filter((workout) => {
            // console.log(workout);
            let condition = true;
            if (!isEmpty(query)) {
              //   console.log(query.toLowerCase(), workout.name.toLowerCase());
              condition =
                condition &&
                workout.name.toLowerCase().includes(query.toLowerCase());
              //   console.log(workout.name.toLowerCase(), query.toLowerCase());
              //   console.log(condition);
              //   condition = false;
              //   console.log(query, workout.name);
            }
            if (!isEmpty(muscleGroup)) {
              //   console.log(muscleGroup, workout.muscle);
              condition = condition && muscleGroup === workout.muscle;
            }

            if (!isEmpty(exerciseType)) {
              //   console.log(exerciseType, workout.type);
              condition = condition && exerciseType === workout.type;
            }
            if (!isEmpty(difficulty)) {
              //   console.log(difficulty, workout.difficulty);
              //   condition = condition && muscleGroup === workout.muscle;
              // condition = condition && exerciseType === workout.type;
              condition = condition && difficulty === workout.difficulty;
            }
            // console.log(condition);
            return condition;
          });
          dispatch({ type: "setWorkouts", payload: filteredWorkouts });
          //   dispatch({ type: "setWorkouts", payload: data });
          //   console.log(data);
          if (!filteredWorkouts.length) throw new Error("No results found");
          //   Render List
        } catch (err) {
          //   console.log(err);
          if (!err.message.includes("signal")) {
            //React bug causes signal abort to cause error
            // console.error(err.message);
            dispatch({ type: "setListLoading", payload: false });
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
              dispatch({ type: "setExerciseType", payload: e.target.value });

              if (selectedValue.current.query === "muscle") return;

              selectedValue.current = {
                query: "type",
                value: e.target.value,
              };
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
            className="last-option"
            callback={(e) => {
              dispatch({ type: "setDifficulty", payload: e.target.value });

              if (
                selectedValue.current.query === "muscle" ||
                selectedValue.current.query === "type"
              )
                return;

              selectedValue.current = {
                query: "difficulty",
                value: e.target.value,
              };
            }}
            title="Choose Difficulty"
          />
        </NavLeftSide>

        <Search
          stateVar={query}
          callback={(e) => {
            dispatch({ type: "setQuery", payload: e.target.value });

            if (
              selectedValue.current.query === "muscle" ||
              selectedValue.current.query === "type" ||
              selectedValue.current.query === "difficulty"
            )
              return;
            selectedValue.current = {
              query: "name",
              value: e.target.value,
            };
          }}
        />
      </NavBar>
      <Main>
        <WorkoutList
          workouts={workouts}
          isListLoading={isListLoading}
          isError={isError}
          images={images}
          dispatch={dispatch}
        />
        <WorkoutDetails
          savedWorkouts={savedWorkouts}
          selectedWorkout={selectedWorkout}
          dispatch={dispatch}
        />
      </Main>
    </>
  );
}
export default App;
