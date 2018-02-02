# recursive-readdirsync
Recursive readdirSync using non-recursive loop.

## Usage
```
import read from 'recursive-readdirsync';

// Use regular expression / string / function to match ignored files.  
const files = read(__dirname, [
    /node_modules/, 
    '.git', 
    path => (path.indexOf('.png') === -1),
]);
```
