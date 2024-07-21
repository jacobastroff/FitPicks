import { Workout } from "./Workout";
import { SavedWorkoutsHeader } from "./WorkoutHeader";
import { WorkoutDetail } from "./WorkoutDetail";
import { useState } from "react";
export function WorkoutDetails({ selectedWorkout, dispatch }) {
  const [savedWorkouts, setSavedWorkouts] = useState(
    JSON.parse(localStorage.getItem("savedWorkouts"))
  );
  return (
    <div className="workout-details">
      {!selectedWorkout && (
        <>
          <SavedWorkoutsHeader />
          {savedWorkouts.map((workout, i) => (
            <Workout
              lightOrDark={i % 2 == 0 ? "workout-light" : "workout-dark"}
              workoutData={workout}
              dispatch={dispatch}
              key={i}
            />
          ))}
        </>
      )}
      {selectedWorkout && (
        <WorkoutDetail
          savedWorkouts={savedWorkouts}
          onSaveWorkout={setSavedWorkouts}
          dispatch={dispatch}
          isSaved={true}
          selectedWorkout={selectedWorkout}
          key={selectedWorkout}
        />
      )}
    </div>
  );
}
