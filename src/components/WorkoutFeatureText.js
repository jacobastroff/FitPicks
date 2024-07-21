import { WeightEmoji } from "./WeightEmoji";

export function WorkoutFeatureText({ children }) {
  return (
    <li class="icon-list-item">
      <WeightEmoji className="weight-emoji-feature" />
      <span className="workout-feature-text">{children}</span>
    </li>
  );
}
