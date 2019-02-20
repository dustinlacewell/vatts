**VATTS IS ALPHA SOFTWARE**


# VATTS
VSCode and Tabletop Simulator

Vatts is an extension for VSCode to help with Tabletop Simulator mod development:

- Send scripts to Lua
- Bundle multiple Lua files as one
- Transpile Typescript to Lua

Vatts can be installed ~~from the VSCode Extension Marketplace or~~ as a `.VSIX` downloaded from our releases page:

https://github.com/dustinlacewell/vatts/releases

# Installation

Vatts is an extension for [VScode](https://code.visualstudio.com/).

## ~~Installing from the Marketplace~~

- ~~Use the VScode command-palette (`ctrl-shift-p`)~~
- ~~Access `Extensions: Install Extensions`~~
- ~~Search for `Vatts`~~

## Installing from VSIX Release

- Download a VSIX from our [releases page](https://github.com/dustinlacewell/vatts/releases)
- Use the VSCode command-palette (`ctrl-shift-p`)
- Access `Extensions: Install from VSIX...`
- Select the VSIX file

## Building from Source

The primary requirement for building Vatts is [NodeJS](https://nodejs.org/en/).

From the repository `vatts/vatts/` directory:

    $ npm install # install dependencies

Then package the VSIX:

    $ node node_modules/vsce/out/vsce publish

# Overview

Vatts is an alternative to the official Atom plugin, for VSCode. If you haven't heard, [Ben Dobel got the VSCode Moonsharp debugger working against TTS](https://github.com/tts-community/moonsharp). This means that with VSCode we can step-debug our TTS mods. The value of the step-debugger over `print()` statement debugging can't be understated! But using both VSCode and Atom for different parts of the mod process sucks!

Hence, Vatts.

## TTS Integration

Vatts can do many of the things the official Atom plugin can do:

- Send global and object scripts ~~and XML~~ to TTS
- Display chat and error messages in the editor
- Jump to the line where an error occurs
- Evaluate selection or buffer as Lua

It can also do some new things:

- Send selection or buffer as JSON
- ~~Send text directly to chat~~

It also *can't* do some old things (yet?):

- Highlight objects in TTS when mousing over GUIDs

## Lua Bundler

Each TTS game and object can have only a single associated Lua script file. This makes it cumbersome to organize larger mods with more code. Vatts' Lua bundler will allow you to keep your code in multiple files and use `require()` to import one module into another. Vatts recursively searches your code for these require calls to bring all the code into a single file Lua bundle. This bundle can then be sent to TTS or uploaded to the Workshop as normal.

~~Vatts also implements the same XML include functionality from the Atom plugin.~~

### Source-mapped "jump to error"

When TTS reports an error in your mod, it reports the line within the bundle where the error ocurred. Vatts can jump to the corresponding line in the original Lua file making for a nicer debugging experience.

## Typescript Transpiler

Lua is an OK language and its users love it. However, there are serious advantages (and downsides) to a language like Typescript. Vatts can take your Typescript code and translate it to the (nearly) equivalent Lua code. This Lua code can then be sent to TTS like normal.

### Serious Advantages?

Typescript is a modern language that usually translates to Javascript. Javascript and Lua have a lot in common! The primary way is probably that they both revolve around their table type. However, Javascript and Lua are both dynamically typed. This means that you have to run the program before any errors in the program can be discovered.

Statically typed languages, like Typescript, allow you to specify the types of your variables and function parameters. The advantage is that if you ever use a variable the wrong way, or pass the wrong kind of variable to a function, you'll know about it as you're typing the mistake.

Additionally, if the editor knows the types of your variables then it can help you access their properties or methods with powerful Intellisense capabilities. Typing information can even be provided for the standard Lua libraries and the TTS API itself.

Typescript has many other modern language features which you can explore using its documentation:

https://www.typescriptlang.org/docs/home.html


## Resuable source libraries

Whether developing in Lua or Typescript, Vatts makes authoring and utilizing libraries a realistic option. Got a bunch of helpful TTS utilty functions? Now if you publish them as a library, people using Vatts might be able to put it to use without much pain thanks to the support for `require()` in Lua, and Typescript's import system.

# Documentation

The following documentation sources are available:

- [User Guide](https://github.com/dustinlacewell/vatts/wiki/Userguide)