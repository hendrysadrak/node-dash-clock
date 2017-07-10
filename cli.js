#!/usr/bin/env node

'use strict';


const meow      = require( 'meow' );
const dashClock = require( '.' );


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


const arg0 = cli.input[ 0 ] || 'unicorns';


console.log( dashClock( arg0 ) );
