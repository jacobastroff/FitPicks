import { useState } from "react";
import { images, snakeCaseToProperString } from "../constants";
import { Button } from "./Button";
import { WorkoutFeatureText } from "./WorkoutFeatureText";
const isObjectEqual = function (objectA, objectB) {
  return JSON.stringify(objectA) === JSON.stringify(objectB);
};
export function WorkoutDetail({
  selectedWorkout,
  dispatch,
  savedWorkouts,
  onSaveWorkout,
}) {
  const [isSaved, setIsSaved] = useState(
    savedWorkouts.some((savedWorkout) =>
      isObjectEqual(savedWorkout, selectedWorkout)
    )
  );
  localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));

  return (
    <div className="workout-content">
      <div className="buttons">
        <Button
          className="non-delete-button button"
          callback={() =>
            dispatch({ type: "setSelectedWorkout", payload: null })
          }
        >
          Back
        </Button>
        <Button
          className={`button ${
            isSaved ? "non-delete-element" : `non-delete-button`
          }`}
          callback={() => {
            if (
              !savedWorkouts.some((savedWorkout) =>
                isObjectEqual(savedWorkout, selectedWorkout)
              )
            ) {
              onSaveWorkout([...savedWorkouts, selectedWorkout]);
              setIsSaved(true);
            }
          }}
        >
          Save{isSaved ? "d✅" : ""}
        </Button>
        {isSaved && (
          <Button
            callback={() => {
              console.log("Hello");
              onSaveWorkout(
                savedWorkouts.filter(
                  (workout) => !isObjectEqual(workout, selectedWorkout)
                )
              );
              console.log(savedWorkouts);
              dispatch({ type: "setSelectedWorkout", payload: null });
              setIsSaved(false);
            }}
            className="delete-button button"
          >
            Delete
          </Button>
        )}
      </div>
      <div className="workout-content-text">
        <h2 className="workout-name">
          {snakeCaseToProperString(selectedWorkout.name)}
        </h2>
        <ul className="icon-list">
          <WorkoutFeatureText>
            Workout type: {snakeCaseToProperString(selectedWorkout.type)}
          </WorkoutFeatureText>
          <WorkoutFeatureText>
            Muscle Targeted: {snakeCaseToProperString(selectedWorkout.muscle)}
          </WorkoutFeatureText>
          <WorkoutFeatureText>
            Difficulty: {snakeCaseToProperString(selectedWorkout.difficulty)}
          </WorkoutFeatureText>
          <WorkoutFeatureText>
            Equipment:{" "}
            {snakeCaseToProperString(selectedWorkout.equipment) === "Other"
              ? "See Instructions"
              : snakeCaseToProperString(selectedWorkout.equipment)}
          </WorkoutFeatureText>
        </ul>
        <h3 className="workout-instructions-heading">How to do it</h3>
        <p className="workout-instructions-text">
          {selectedWorkout.instructions}
        </p>
      </div>
      {/* <img
        className="workout-image"
        src={images.get("plyometrics")}
        alt={selectedWorkout.name}
      /> */}
    </div>
  );
}
