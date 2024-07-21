import { Loading } from "./Loading";
import { ErrorModule } from "./ErrorModule";
import { ListHeader } from "./ListHeader";
import { Workout } from "./Workout";
import { IconLegend } from "./IconLegend";
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
