import { images, snakeCaseToProperString } from "../constants";
import { ListWorkoutIcon } from "./ListWorkoutIcon";

export function IconLegend() {
  // console.log([...images]);
  return (
    <div>
      <h3 className="legend-title">Legend</h3>
      <ul className="icon-list">
        {Array.from(images, ([workoutType, src]) => {
          return (
            <li key={workoutType} className="icon-list-item">
              <ListWorkoutIcon
                src={src}
                alt={snakeCaseToProperString(workoutType)}
              />
              <h4 className="workout-icon-name legend-name">
                {snakeCaseToProperString(workoutType)}
              </h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
