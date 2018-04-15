# recursive-sync-readdir
Recursive readdirSync with non-recursive loop.

## Installation
```shell
$ npm install recursive-sync-readdir
```

## Usage
```js
import read from 'recursive-sync-readdir';

// Use regular expression / string / function to match ignored files.  
const files = read(__dirname, [
    /node_modules/, 
    '.git', 
    path => (path.indexOf('.png') === -1),
]);
```
