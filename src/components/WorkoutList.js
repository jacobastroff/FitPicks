import { Loading } from "./Loading";
import { ErrorModule } from "./ErrorModule";
import { ListHeader } from "./ListHeader";
import { Workout } from "./Workout";
import { images, snakeCaseToProperString } from "../constants";
import { ListWorkoutIcon } from "./ListWorkoutIcon";
export function WorkoutList({
  isListLoading,
  isError,
  workouts,
  images,
  dispatch,
}) {
  // console.log(workouts);
  return (
    <div className="workout-list">
      {isListLoading && <Loading />}
      {isError && <ErrorModule>{isError}</ErrorModule>}
      {isError === "Please search for a workout" && (
        <div className="icon-legend-container">
          <IconLegend />
        </div>
      )}
      {!isError && !isListLoading && workouts && (
        <>
          <ListHeader numResults={workouts?.length} />
          {workouts.map((workout, i) => (
            <Workout
              workoutData={workout}
              key={i}
              lightOrDark={i % 2 === 0 ? "workout-light" : "workout-dark"}
              dispatch={dispatch}
            />
          ))}
        </>
      )}
    </div>
  );
}
function IconLegend() {
  console.log([...images]);
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
