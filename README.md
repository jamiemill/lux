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

## Development

To run tests first start karma server in one window:

    grunt karma:unit

Then to run jshint, server-side tests and client-side tests run:

    grunt

Or if you want to watch for file changes and automatically run all the above, do:

    grunt watch

To do local development while testing with the global `presenteur` command, run `npm link` to make your checked-out copy become the global binary.

## License

MIT, see the LICENSE file.
