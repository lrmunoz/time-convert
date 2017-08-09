Development log
===============

## User stories

* User can share the current configuration in social networks, at least on facebook, twitter, linkedin
* User can drag and drop to reorder time boxes. New order reflects on the URL (the URL changes)

## Tech stories

* Setup automatic build and deployment to Github pages under a custom domain
* Track usage with Google Analytics, add goals to track different events, especially actually configuring places, user sharing on social networks
* URL defines the state of the screen (maybe including frozen time?)

## Pending decisions

* What to do on incorrect entered time? Show a validation error, do nothing, or cancel edit (currently doing the latter)

## Technical debt

* Remove event handlers defined with arrow functions of the form `onClose={() => { this.removePlace(index) }` in render methods to prevent avoidable renders

## Design debt

* When entering an invalid time, show some validation/indication of the situation to the user
* Make boxes responsive (wrap to next line as screen shrinks)
* Add transition to sky light component