import { Loading } from "./Loading";
import { ErrorModule } from "./ErrorModule";
import { ListHeader } from "./ListHeader";
import { Workout } from "./Workout";
export function WorkoutList({ isLoading, isError, workouts, images }) {
  console.log(workouts);
  return (
    <div className="workout-list">
      {isLoading && <Loading />}
      {isError && <ErrorModule>{isError}</ErrorModule>}
      {!isError && !isLoading && workouts && (
        <>
          <ListHeader numResults={workouts?.length} />
          {workouts.map((workout, i) => (
            <Workout
              workoutData={workout}
              lightOrDark={i % 2 === 0 ? "workout-light" : "workout-dark"}
              images={images}
            />
          ))}
        </>
      )}
    </div>
  );
}
