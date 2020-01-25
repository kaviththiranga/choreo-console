
## Developer Guide

### Build Tool

We use a gradle multi module project configuration.

### Requirements

- Java 7 or later
- NodeJs 10.x or later
- NPM 6.x or later
- Docker
- Ballerina 1.1.0 or later

### Folder Structure

```javascript
|--app // web app code base
    |--src 
        |--api
        |--assets
        |--components
        |--lang
            |--keys
            |--locales
                |--en
        |--lib
        |--store
            |--actions
            |--definitions
            |--reducers
            |--sagas
        |--styles
        |--views
```