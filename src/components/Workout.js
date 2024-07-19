import { snakeCaseToProperString } from "../constants";

export function Workout({ images, lightOrDark, workoutData }) {
  console.log(images.__proto__);
  return (
    <div className={`workout ${lightOrDark}`}>
      <img
        className="workout-list-img"
        src={images.get("cardio")}
        alt="Workout"
      />
      <div class="workout-list-text">
        <div class="workout-line">
          <h4 class="workout-heading">
            {snakeCaseToProperString(workoutData.name)}
          </h4>
          <span class="workout-detail">
            {snakeCaseToProperString(workoutData.type)}
          </span>
        </div>
        <div class="workout-line">
          <span class="workout-detail">
            Targets {snakeCaseToProperString(workoutData.muscle, false)}
          </span>

          <span class="workout-detail">
            {snakeCaseToProperString(workoutData.difficulty)}
          </span>
        </div>
      </div>
    </div>
  );
}
