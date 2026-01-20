# Water Intake Tracker

A simple, responsive hydration tracker built with HTML, CSS, and vanilla JavaScript. Set your daily goal, log cups, and get a quick visual of your progress.

## Features
- Live progress ring that fills as you log cups
- Custom daily goal (cups) and adjustable cup size (ml)
- Quick add/remove cup and reset day actions
- Hydration reminders that adapt to your progress
- Responsive layout for desktop and mobile

## Getting Started
1. Open `index.html` in your browser.
2. Set your daily goal (cups) and cup size (ml) if needed.
3. Use the `+1 cup` and `-1 cup` buttons to log intake; use `Reset day` to start over.

## Controls
- Daily goal (cups): number input + “Update goal” button
- Cup size (ml): number input; updates reminder text
- Add/remove: `+1 cup` and `-1 cup` buttons (never goes below 0)
- Reset: clears today’s logged cups

## Customization
- Default goal and cup size are set in `script.js` (`state.goalCups` and `state.cupSizeMl`).
- Styling lives in `style.css`; adjust colors or spacing as you like.

## Tech Stack
- HTML for structure
- CSS (custom) for layout and styling
- Vanilla JavaScript for state, calculations, and UI updates

