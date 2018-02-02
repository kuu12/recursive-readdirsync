# recursive-sync-readdir
Recursive readdirSync using non-recursive loop.

##install
```
npm install recursive-sync-readdir
```

## Usage
```
import read from 'recursive-sync-readdir';

// Use regular expression / string / function to match ignored files.  
const files = read(__dirname, [
    /node_modules/, 
    '.git', 
    path => (path.indexOf('.png') === -1),
]);
```
