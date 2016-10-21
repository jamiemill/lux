# Lux

An HTML5 presentation framework, with the goals:

- simplicity
- good looks
- export to standalone html/js

- syntax highlighting (not yet implemented)
- remote control (not yet implemented)
- Local control from a popup window on another screen (not yet implemented)
- touch control on mobile (not yet implmented)

## Demo & Docs

<http://jamiemill.github.com/lux/>

## Requirements

node.js

## Browser Support

- Tested on:
  - Chrome 23
  - Firefox 10
- Should work on IE9+, but not tested.

## Install

    npm install -g lux

## Usage

### Generate a skeleton presentation

    lux generate

WARNING: this overwrites files in the current directory.

### Serve the presentation

    lux start

then visit `http://<your computer>:3000`

- remote control it at `/master`
- local control from a second screen by clicking the 'Control Window' button

### Export to static HTML (not implemented)

    lux export

## Development

To run tests first start karma server in one window:

    grunt karma:unit

Then to run jshint, server-side tests and client-side tests run:

    grunt

Or if you want to watch for file changes and automatically run all the above, do:

    grunt watch

To do local development while testing with the global `lux` command, run `npm link` to make your checked-out copy become the global binary.

## License

MIT, see the LICENSE file.
