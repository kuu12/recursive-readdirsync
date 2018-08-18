# recursive-sync-readdir
#### Recursive readdirSync, using `while` loop to prevent call stack from exceeding.

[![NpmVersion](https://img.shields.io/npm/v/recursive-sync-readdir.svg)](https://www.npmjs.com/package/recursive-sync-readdir)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/recursive-sync-readdir.svg)](https://www.npmjs.com/package/recursive-sync-readdir)

## Motivation
There are some similiar libraries. But all of them use recursive function calls. 
In asynchronous case it's all right, but in synchronous case it may cause ***Maximum call stack size exceeded***.
This library use `while` loop instead of recursive function calls, and **call stack is safe**.

## Installation
```shell
npm install recursive-sync-readdir
```

## Usage
```javascript
import read from 'recursive-sync-readdir';

const files = read(
    __dirname,                          // directory path
    [                                   // exclude rules
        /node_modules/,                 // match regular expression
        '.git',                         // equals to string
        path => path === 'dist',        // filter function returns true
    ]
);
```
