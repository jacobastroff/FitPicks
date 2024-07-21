import { snakeCaseToProperString } from "../constants";
import { images } from "../constants";
import { ListWorkoutIcon } from "./ListWorkoutIcon";
export function Workout({ lightOrDark, workoutData, dispatch }) {
  // console.log(images.__proto__);
  return (
    <div
      onClick={() => {
        dispatch({
          type: "setSelectedWorkout",
          payload: { ...workoutData },
        });
      }}
      className={`workout ${lightOrDark}`}
    >
      <ListWorkoutIcon src={images.get(workoutData.type)} />
      <div className="workout-list-text">
        <div className="workout-line">
          <h4 className="workout-heading">
            {snakeCaseToProperString(workoutData.name)}
          </h4>
          <span className="workout-detail">
            {snakeCaseToProperString(workoutData.type)}
          </span>
        </div>
        <div className="workout-line">
          <span className="workout-detail">
            Targets {snakeCaseToProperString(workoutData.muscle, false)}
          </span>

          <span className="workout-detail">
            {snakeCaseToProperString(workoutData.difficulty)}
          </span>
        </div>
      </div>
    </div>
  );
}
