# Presenteur

An HTML5 presentation framework, with the goals:

- simplicity
- good looks
- syntax highlighting
- remote control (not yet implemented)
- export to standalone html/js (not yet implemented)

## Demo & Docs

<http://jamiemill.github.com/presenteur/>

## Features

- Remote control over a network
- Local control from a popup window on another screen
- Local control by keyboard arrows, spacebar, touch swiping, or dragging with the mouse

## Requirements

node.js

## Browser Support

- Tested on:
  - Chrome 23
  - Firefox 10
- Should work on IE9+, but not tested.

## Install

    npm install -g presenteur

## Usage

### Generate a skeleton presentation

    presenteur generate

WARNING: this overwrites files in the current directory.

### Serve the presentation

    presenteur

then visit `http://<your computer>:3000`

- remote control it at `/master`
- local control from a second screen by clicking the 'Control Window' button

### Export to static HTML (not implemented)

    presenteur export

## License

MIT, see the LICENSE file.
