import { Workout } from "./Workout";
import { SavedWorkoutsHeader } from "./WorkoutHeader";
import { WorkoutDetail } from "./WorkoutDetail";
import { useState } from "react";
export function WorkoutDetails({ selectedWorkout, dispatch, savedWorkouts }) {
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
          dispatch={dispatch}
          selectedWorkout={selectedWorkout}
          key={selectedWorkout.name}
        />
      )}
    </div>
  );
}
