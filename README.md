# PointOps – Planning Poker

A simple, frontend-only **Planning Poker** app for agile teams to estimate story points collaboratively.

## Features

- **Join screen** – enter your name to start a session
- **Fibonacci card deck** – standard planning poker values: `0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, ☕`
- **Participant management** – add or remove teammates during a session
- **Hidden votes** – cards are face-down until the facilitator reveals them
- **Results panel** – shows the average, most common vote, and a per-participant breakdown; displays a consensus banner when everyone agrees
- **New Round** – resets all votes and increments the round counter
- **Dark mode** – respects the OS preference automatically

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The production build is output to the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

## Usage

1. Enter your name on the join screen and click **Start Session**.
2. Optionally add other participants using the sidebar form.
3. Each participant selects a card from the deck (click again to deselect).
4. When ready, click **Reveal Votes** to show everyone's estimate.
5. Review the results, then click **New Round** to reset for the next ticket.

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- CSS Modules
