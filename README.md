# Next.JS

## What is next JS?
First, let's talk about React. I like to think of React as a view library. Alone, you couldn't quickly build a modern app with React. You need routing, a build system, a way to style things, performance, etc.

Next.js is a complete full-stack framework for modern apps. So if you know React, then Next.js will be very familiar. When building an app from scratch with React, you have so many decisions to make and so many choices. Next.js has well thought out conventions baked in that make these decisions for you. So in that way, it's very opinionated. It's the conventions that are the secret sauce, though. These opinions come from years of experience building production-ready React apps.

### Here are some of the highlights that you get for free:
- Dev build system
- Production build system
- Prerendering
    - SSR
    - Build time
    - Static
- Routing
- API routes

### When to use Next.js
Do you only need a single page app?
- Use Create React App

Do you need a static site, like a blog, that's also a SPA?
- Use Next.js or Gatsby.

Need SSR, an API, and all the above?
- Use Next.js

## Getting Started
- Easy way
```npx create-next-app``` or ```yarn create next-app```
- The still pretty easy way
```npm i next react react-dom --save``` or ```yarn add next react react-dom```

Next, we need to add some helpful scripts to our package.json
```js
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

So what do these commands do?
- ```next``` Will start Next.js in dev mode with hot reloading.
- ```next build``` Will build your project and ready it for production.
- ```next start``` Will start your built app, used in production.


## Routing with Pages
To get started, create a directory on your called ```/pages```. Next.js will associate any file in this directory as a route. The file names determine the route name or pattern, and whatever component is exported is the actual page.

Now let's create an index route by creating a file: ```/pages/index.jsx```.

Next, let's create a component and export it:

```js
import React from 'react'

export default () => <h1>Index Page</h1>
```

Start your dev server: ```yarn dev```

## Folders and routes
To create a path like ```/project/settings``` we can use folders in our ```/pages``` directory. For our note taking app, we need the following routes for now:

```
index => /
all notes => /notes
one note => /notes/:id
```
We already created the index route; let's create the all notes route:
```
pages
  notes
    index.jsx
```
By adding an ```index``` page in a folder, we're telling Next.js that we want this component to be the index route for this path. So in this case, navigating to ```/notes``` will render the ```pages/notes/index.jsx``` component.

Here's a placeholder component for that page that you can use.
```js
import React from 'react'

export default () => <h1>Notes</h1>
```
