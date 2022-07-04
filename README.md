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

## Navigation

Similar to an ```<a>``` tag, we can use the Link component from then ``` next/link``` module.

```js
import Link from 'next/link';

<Link href="/settings">
  <a>settings</a>
</Link>
```

The href prop takes a page name as it is in the pages directory. For dynamic routes, you will need the as prop as well.

```js
<Link href="/user/[id].js" as={`/user/${user.id}`}>
  <a>user</a>
</Link>
```

Let's link our pages together!

```js
// pages/index.jsx
import React from 'react'
import Link from 'next/link'

export default () => (
  <div>
    <h1>Index page</h1>

    <Link href="/notes">
      <a>Notes</a>
    </Link>
  </div> 
)
```

```js
// pages/notes/index.jsx
import React from 'react'
import Link from 'next/link'

export default () => {
  const notes = new Array(15).fill(1).map((e, i) => ({id: i, title: `Note: ${i}`}))

  return (
    <div>
      <h1>Notes</h1>

      {notes.map(note => (
        <div>
          <Link key={note.id} href="/notes/[id]" as={`/notes/${note.id}`}>
            <a>
              <strong>{note.title}</strong>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
```

```js
// pages/notes/[id].jsx
import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default () => {
  const router = useRouter()
  const { id }= router.query

  return (
    <div>
      <h1>Note: {id} </h1>

      <Link href="/notes">
        <a>Notes</a>
      </Link>
    </div>
  )
}
```

## Programmatic routing

Just like the ```Link``` component, use the router for client-side routing. To navigate to a page, you can use the ```push``` method, which works like ```href``` on the ```Link``` component.

```js
import React from 'react'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const id = 2

  return (
    <div>
      <button onClick={e => router.push('/')}>
        Go Home
      </button>

      <button onClick={e => router.push('/user/[id]', `/user/${id}`)}>
        Dashboard
      </button>
    </div>
  )
}
```

## Styling

When it comes to styling, you have global styles and component styles. For global CSS, you have to import them at the entry point of your app. Wait, where is the entrance to my Next.js app? It's actually created for you, but you can and have to create your own now that you want global styles.

Create an ```pages/_app.jsx``` file and add this:

```js
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

You can import a CSS module file anywhere in your app. To create a CSS module, you have to use a special syntax in the file name.
```styles.module.css```
This makes CSS modules a perfect solution to styling components.
```
components
  button.jsx
  button.module.css
```