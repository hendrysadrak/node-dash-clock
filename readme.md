# dash-clock [![Build Status](https://travis-ci.org/hendrysadrak/dash-clock.svg?branch=master)](https://travis-ci.org/hendrysadrak/dash-clock)

> Terminal Clock


## Install

```
$ npm install dash-clock
```


## Usage

```js
const dashClock = require('dash-clock');

dashClock('unicorns');
//=> 'unicorns & rainbows'
```


## API

### dashClock(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global dash-clock
```

```
$ dash-clock --help

  Usage
    dash-clock [input]

  Options
    --foo  Lorem ipsum [Default: false]

  Examples
    $ dash-clock
    unicorns & rainbows
    $ dash-clock ponies
    ponies & rainbows
```


## License

MIT © [Hendry Sadrak](https://hendrysadrak.com)
