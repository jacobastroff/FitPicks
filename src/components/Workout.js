import { snakeCaseToProperString } from "../constants";
import { images } from "../constants";
export function Workout({ lightOrDark, workoutData }) {
  // console.log(images.__proto__);
  return (
    <div className={`workout ${lightOrDark}`}>
      <img
        className="workout-list-img"
        src={images.get(workoutData.type)}
        alt="Workout"
      />
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
