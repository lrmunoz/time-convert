Development log
===============

## User stories

* User can share the current configuration in social networks, at least on facebook, twitter, linkedin
* User can drag and drop to reorder time boxes. New order reflects on the URL (the URL changes)
* User can choose time mode, am/pm or 24h
* User can find out when the next daylight/non-daylight change will happen, or the lack thereof
* When empty state, user is informed there are no added places, and he should click the add button. Also provide links with sample dashboard configuration

## Tech stories

* Setup automatic build and deployment to Github pages under a custom domain
* Track usage with Google Analytics, add goals to track different events, especially actually configuring places, user sharing on social networks
* URL defines the state of the screen (maybe including frozen time?)

## Pending decisions

* What to do on incorrect entered time? Show a validation error, do nothing, or cancel edit (currently doing the latter)

## Technical debt

* Add licensing
* Remove event handlers defined with arrow functions of the form `onClose={() => { this.removePlace(index) }` in render methods to prevent avoidable renders
* When setting a time in one box, make caret go to the end after entering edit mode

## Design debt

* When entering an invalid time, show some validation/indication of the situation to the user
* Make boxes responsive (wrap to next line as screen shrinks)
* Add transition to sky light component
* Extract CSS color to constants

## Bugs

* When time is frozen, setting another time in another box start't work
* When clicking on a time, put caret at the end of the input field
* Fix Pacific/Kiritimati not having a timezone name
* Empty dashboard still says "Showing current time. Click the time label in any box to do a conversion."

