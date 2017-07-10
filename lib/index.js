'use strict';

const termSize  = require( 'term-size' );
const readline  = require( 'readline' );
const chalk     = require( 'chalk' );
const constants = require( './constants' );


const CURRENT_THEME_NAME = 'default'; // TODO: Configurable from env.


const themeConfig   = require( `./../themes/${CURRENT_THEME_NAME}/config.js` )( { constants, chalk } );
const themeTypeface = require( `./../themes/${CURRENT_THEME_NAME}/typeface.js` )( { constants } );


let lastOutputLength = 0;
let output           = [];

function clearOutput() {
    process.stdout.moveCursor( 0, -lastOutputLength );
    process.stdout.write( ' '.repeat( Math.max( 0, lastOutputLength * termSize().columns ) ) );
    readline.clearScreenDown( process.stdout );

    output = [];
}

function print( line = '' ) {
    output.push( line );
}

function render() {
    readline.cursorTo( process.stdout, 0, 0 );
    process.stdout.write( output.join( '\n' ) );

    lastOutputLength = output.length;
}


function formatTimeNum( n ) {
    return ("0" + n).slice( -2 );
}


function getTime() {
    const dateInstance = new Date();

    return {
        h: formatTimeNum( dateInstance.getHours() ),
        m: formatTimeNum( dateInstance.getMinutes() ),
        s: formatTimeNum( dateInstance.getSeconds() ),
    };
}


function printEmptyLines( count = 0 ) {
    for ( let i = 0; i < count; i++ ) {
        print( '' );
    }
}


function buildClock() {
    const time         = getTime();
    const numberMatrix = [
        themeTypeface.numbers[ time.h[ 0 ] ],
        themeTypeface.numberSpace,
        themeTypeface.numbers[ time.h[ 1 ] ],
        themeTypeface.numberSeperator,
        themeTypeface.numbers[ time.m[ 0 ] ],
        themeTypeface.numberSpace,
        themeTypeface.numbers[ time.m[ 1 ] ],
        themeTypeface.numberSeperator,
        themeTypeface.numbers[ time.s[ 0 ] ],
        themeTypeface.numberSpace,
        themeTypeface.numbers[ time.s[ 1 ] ]
    ];

    const stringLines = [];

    numberMatrix.forEach( numberLines => {
        numberLines.forEach( ( line, index ) => {
            if ( stringLines[ index ] === undefined ) stringLines[ index ] = '';

            stringLines[ index ] += line;
        } )
    } );

    // color clock lines
    return stringLines.map( line => themeConfig.clock.styleNumber( line ) );
}


function doClock() {
    const { columns, rows } = termSize();
    const clockLines        = buildClock();

    const clockWidth = clockLines[ 0 ].length;
    const clockLeft  = ' '.repeat( Math.max( 0, Math.ceil( columns / 2 - clockWidth / 2 ) ) );

    printEmptyLines( themeConfig.clock.paddingTop );
    clockLines.forEach( line => print( clockLeft + line ) );
    printEmptyLines( themeConfig.clock.paddingBottom );
}


function loop() {
    clearOutput();

    doClock();

    render();
}


function init() {
    process.stdout.write( '\x1B[2J\x1B[0f\u001b[0;0H' );

    loop();
    setInterval( loop, 1000 );

    process.stdout.on( 'resize', () => {
        loop();
    } );
}


function exit( exitCode = 0 ) {
    process.exit( exitCode );
}


module.exports = ( input, opts ) => {
    init();
};
