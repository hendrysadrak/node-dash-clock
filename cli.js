#!/usr/bin/env node

'use strict';


const meow      = require( 'meow' );
const dashClock = require( './lib/index' );


const cli = meow( `
	Usage
	  $ dash-clock [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ dash-clock
	  unicorns & rainbows
	  $ dash-clock ponies
	  ponies & rainbows
` );


dashClock( cli.input, cli.flags );
