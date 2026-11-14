// Representative crewed-mission orbit, not an epoch-specific ephemeris.
// NASA Skylab orbit parameters: 435.5 km altitude, 50 degrees, 93.23 minutes.
export const EARTH_RADIUS_KM = 6378
export const EARTH_RADIUS = 10
export const ALTITUDE_KM = 435.5
export const INCLINATION = 50 * Math.PI / 180
export const PERIOD_SECONDS = 93.23 * 60
export const SIDEREAL_DAY_SECONDS = 86164.0905
export const TIME_SCALE = 120
export const ORBIT_RADIUS = EARTH_RADIUS * (1 + ALTITUDE_KM / EARTH_RADIUS_KM)

export function orbitPosition(elapsedSeconds, timeScale = TIME_SCALE) {
  const angle = elapsedSeconds * timeScale * Math.PI * 2 / PERIOD_SECONDS
  // Y is north. Positive angular momentum along Y gives eastward motion,
  // in the same direction as Earth's positive-Y rotation.
  return [
    ORBIT_RADIUS * Math.cos(angle),
    ORBIT_RADIUS * Math.sin(angle) * Math.sin(INCLINATION),
    -ORBIT_RADIUS * Math.sin(angle) * Math.cos(INCLINATION)
  ]
}

export function earthRotation(elapsedSeconds, timeScale = TIME_SCALE) {
  return elapsedSeconds * timeScale * Math.PI * 2 / SIDEREAL_DAY_SECONDS
}

// Model workshop diameter is 1.66 units; historical diameter is 6.7 meters.
export const TRUE_STATION_SCALE = (0.0067 / EARTH_RADIUS_KM * EARTH_RADIUS) / 1.66
export const METERS_TO_SCENE = EARTH_RADIUS / (EARTH_RADIUS_KM * 1000)
