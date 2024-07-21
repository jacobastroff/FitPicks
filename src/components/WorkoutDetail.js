import { images, snakeCaseToProperString } from "../constants";
import { Button } from "./Button";
import { WorkoutFeatureText } from "./WorkoutFeatureText";

export function WorkoutDetail({ selectedWorkout, dispatch }) {
  console.log(selectedWorkout);
  return (
    <div className="workout-content">
      <Button
        callback={() => dispatch({ type: "setSelectedWorkout", payload: null })}
      >
        Back
      </Button>
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
      <img
        className="workout-image"
        src={images.get("plyometrics")}
        alt={selectedWorkout.name}
      />
    </div>
  );
}
