{\rtf1\ansi\ansicpg1252\cocoartf2706
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww13840\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf0 \expnd0\expndtw0\kerning0
/*****************************************************************\
** Author: Asvin Goel, goel@telematique.eu\
**\
** A plugin allowing slides to use the full window size. \
**\
** Version: 1.0.0\
** \
** License: MIT license (see LICENSE.md)\
**\
******************************************************************/\
\
window.RevealFullscreen = window.RevealFullscreen || \{\
    id: 'RevealFullscreen',\
    init: function(deck) \{\
        initFullscreen(deck);\
    \}\
\};\
\
const initFullscreen = function(Reveal)\{\
	var config = null;\
	var ready = false;\
\
	Reveal.addEventListener( 'ready', function( event ) \{\
		ready = true;\
		config = \{ width: Reveal.getConfig().width, height: Reveal.getConfig().height, margin: Reveal.getConfig().margin \};\
		if ( Reveal.getCurrentSlide().hasAttribute("data-fullscreen") ) \{\
			Reveal.configure( \{ width: window.innerWidth, height: window.innerHeight, margin: 0 \} );\
		\}\
	\} );\
\
	Reveal.addEventListener( 'slidechanged', function( event ) \{\
		if ( Reveal.getCurrentSlide().hasAttribute("data-fullscreen") ) \{\
			Reveal.configure( \{ width: window.innerWidth, height: window.innerHeight, margin: 0 \} );\
		\}\
		else \{\
			Reveal.configure( config );\
		\}\
	\} );\
\
	window.addEventListener( 'resize', function( event ) \{\
		if ( ready && Reveal.getCurrentSlide().hasAttribute("data-fullscreen") ) \{\
			Reveal.configure( \{ width: window.innerWidth, height: window.innerHeight, margin: 0 \} );\
		\}\
	\} );\
\
\};}