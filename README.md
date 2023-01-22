### Start react app

#### Update version of npm and install compatible version of node.js
* npm install -g npm
* https://nodejs.org/en/
* If you don't have nvn installed, run: 
* * curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
* nvm install --lts
* nvm use --lts

#### Install and run create-react-app
npm install -g create-react-app
npx create-react-app meaning_maps
cd meaning_maps
npm start

npm audit fix --force


Navigate to localhost:3000 to view app running


# Critical path

Understand new React features - what changed between 16, 17, 18?
Setup web workers





# Resource List

### react & javascript basics
https://reactjs.org/docs/hooks-overview.html#:~:text=Hooks%20are%20functions%20that%20let,if%20you'd%20like.)
https://handsonreact.com/docs/promises-async-await
https://www.harrymt.com/blog/2020/05/20/react-typescript-react-fc.html
https://blog.openreplay.com/dockerize-full-stack-react-apps/
https://reactjs.org/docs/hooks-state.html
https://reactjs.org/docs/context.html
https://www.w3schools.com/react/react_usecallback.asp
https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
https://reactjs.org/docs/refs-and-the-dom.html
https://dmitripavlutin.com/react-useeffect-explanation/
https://stackoverflow.com/questions/59988667/typescript-react-fcprops-confusion
* Considered an anti-pattern
https://stackoverflow.com/questions/56450975/to-fix-cancel-all-subscriptions-and-asynchronous-tasks-in-a-useeffect-cleanup-f
* https://codepen.io/windmaomao/pen/jOLaOxO
* const { useState, useEffect, useRef, useMemo } = React
https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-devtools-profiler
https://reactjs.org/docs/conditional-rendering.html
https://juliangaramendy.dev/blog/managing-remote-data-with-swr
https://betterprogramming.pub/why-you-should-be-separating-your-server-cache-from-your-ui-state-1585a9ae8336
https://reactrouter.com/en/main/start/overview
https://reactjs.org/docs/hooks-reference.html#usetransition
* To show a loading spinner while something happens
https://www.pluralsight.com/guides/how-to-pass-props-object-from-child-component-to-parent-component


### Influential people's githubs
https://github.com/sebmarkbage
* Came up with idea for React Hooks


### pixi:
https://pixijs.download/dev/docs/PIXI.Geometry.html
https://github.com/zakjan/pixi-graph
https://www.npmjs.com/package/pixi-graph
https://medium.com/neo4j/scale-up-your-d3-graph-visualisation-webgl-canvas-with-pixi-js-63f119d96a28
* Web workers
* Part 2 : https://medium.com/neo4j/scale-up-your-d3-graph-visualisation-part-2-2726a57301ec
https://medium.com/thinknum/writing-high-performance-react-pixi-code-c8c75414020b
* React Pixi - https://www.kgbase.com/
* https://reactpixi.org/#install
https://github.com/michalochman/react-pixi-fiber
* React Pixi Fiber
* Support convos: https://gitter.im/react-pixi-fiber/Lobby?at=5a7dd71597cedeb0482f0d02
* Template: https://codesandbox.io/s/react-pixi-fiber-template-ohk6z?file=/package.json:204-311
https://levelup.gitconnected.com/creating-a-force-graph-using-react-d3-and-pixijs-95616051aba
* React, D3, PixiJS
https://www.devauthority.com/react/using-pixi-js-with-react-functional-components-hooks/
* Access Pixi directly
https://medium.com/@mikkanthrope/react-with-pixijs-c8fc4c50facd
* https://github.com/squirrelnest/prairie-dog-vacuum/blob/master/src/index.js



### sigma
https://sim51.github.io/react-sigma/docs/start-setup
https://sim51.github.io/react-sigma/docs/example/load-graph
https://github.com/jacomyal/sigma.js/tree/main/demo/src/views
https://github.com/sim51/react-sigma/tree/main/website/src/components
* Examples from the website
https://github.com/dunnock/react-sigma/blob/master/stories-src/FilteredSample.js
* Includes a component to filter a graph down to just it's neighbors

### three.js
https://threejs.org/
https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene


### Unity
https://hackernoon.com/how-i-built-and-deployed-a-webgl-game-to-a-new-website-in-35m-15b2e8339c31


### graphology
https://graphology.github.io/
* https://graphology.github.io/mutation.html
* https://graphology.github.io/serialization.html
https://github.com/clemsos/graphology-react/blob/master/examples/basic.jsx


### neo4j
https://neo4j.com/developer-blog/creating-a-neo4j-react-app-with-use-neo4j-hooks/
* walk through: https://www.youtube.com/watch?v=GumfNoVqWlU
* another blog: https://medium.com/neo4j/connecting-to-react-app-to-neo4j-148881d838b8
https://github.com/adam-cowley/use-neo4j/blob/main/src/cypher.ts
* Starter: https://github.com/adam-cowley/graphapp-starter-react
https://neo4j.com/docs/cypher-manual/current/clauses/delete/
http://localhost:7474/browser/
https://neo4j.com/blog/discover-soul-product-neo4j-react/
* In depth architecture discussion


### Programming principles
https://en.wikipedia.org/wiki/Dependency_inversion_principle


# Design patterns for supplying data

Load Neo4j data into a component, and submit to React Context (or some cache)
Other components read from that cache, so we don't need to have the data gathering and default property setting in the canvas component



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
