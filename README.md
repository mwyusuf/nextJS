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

## Theme UI
<a href="https://theme-ui.com/">Theme UI</a> is a library that allows you to create theme objects and use them in your components. It also handles scoping and injecting the CSS into your app—pretty dope stuff.

Let's get our app looking like an app. First, install some things.
```
yarn add theme-ui @theme-ui/presets
```

Next, we'll create a theme. Make a file on the root of your app.
```
theme.js
```
Now add this theme:
```js
import { roboto } from '@theme-ui/presets'

const theme = {
  ...roboto,
  containers: {
    card: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      border: '1px solid',
      borderColor: 'muted',
      borderRadius: '4px',
      p: 2,
    },
    page: {
      width: '100%',
      maxWidth: '960px',
      m: 0,
      mx: 'auto',
    }
  },
  styles: {
    ...roboto.styles
  }
}

export default theme
```
Next we'll create a Navigation component at ```src/components/nav.jsx```
```js
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

const Nav = () => (
  <header sx={{height: '60px', width: '100vw', bg: 'primary', borderBottom: '1px solid', borderColor: 'primary'}}>
    <nav sx={{display: 'flex', alignItems: 'center',  justifyContent: 'space-between', variant: 'containers.page', height: '100%'}}>
      <Link href="/">
        <a sx={{fontWeight: 'bold', fontSize: 4, cursor: 'pointer'}}>Note App</a>
      </Link>

      <Link href="/notes">
        <a sx={{color: 'text', fontSize: 3, cursor: 'pointer'}}>notes</a>
      </Link>

    </nav>
  </header>
)

export default Nav
```

Ummm, what is that, and how does this component render JSX without importing React? That comment is something called JSX pragma. Its a hint to the compiler how to compile this file. The comment combined with the JSX import from theme-ui tells the compiler, babel, in this case, of what JSX tool to use to handle JSX in this file. It's the same reason you had to import React in your JSX files.

We need the theme-ui JSX to use the sx prop on all of our components. The sx prop allows us to add inline styles to components using CSS properties and values and values from our theme object that we created. It's BEAUTIFUL 💋.

And now, our pages.
```js
// pages/index.jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

export default () => (
  <div sx={{ height: `calc(100vh - 60px)`}}>
    <div sx={{variant: 'containers.page', display: 'flex', alignItems: 'center', height: '100%'}}>
      <h1 sx={{fontSize: 8, my: 0}}>This is a really dope note taking app.</h1>
    </div>
  </div> 
)
```
```js
// pages/notes/index.jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

export default () => {
  const notes = new Array(15).fill(1).map((e, i) => ({id: i, title: `This is my note ${i}`}))

  return (
    <div sx={{variant: 'containers.page'}}>
      <h1>My Notes</h1>

      <div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        {notes.map(note => (
          <div sx={{width: '33%', p: 2}}>
            <Link key={note.id} href="/notes/[id]" as={`/notes/${note.id}`}>
              <a sx={{textDecoration: 'none', cursor: 'pointer'}}>
                <div sx={{variant: 'containers.card',}}>
                  <strong>{note.title}</strong>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
```
```js
// pages/[id].jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default () => {
  const router = useRouter()
  const { id }= router.query

  return (
    <div sx={{variant: 'containers.page'}}>
      <h1>Note: {id} </h1>
    </div>
  )
}
```
We now need to wrap our app in the Theme UI provider. We have two options:

wrap every page individually
wrap the root component
Because we want to use Theme UI in our entire app, its safe to wrap the root. So in the ```pages/_app.jsx``` file:
```js
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'
import Nav from '../src/components/nav'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Nav />
        <Component {...pageProps} />
      </div>      
    </ThemeProvider>
  )
}
```

## Customizing Next.js config
If you want to change the build system's behavior, extend Next.js's features, or add ENV variables, you can do this easily in the ```next-config.js``` file.

Either export and objet:
```js
module.exports = {
  webpack: {
    // webpack config properties
  },
  env: {
    MY_ENV_VAR: process.env.SECRET
  }
}
```
Or a function:
```js
const { PHASE_PRODUCTION_SERVER } = require('next/constants')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      ...defaultConfig,
      webpack: {
        plugins: [new BundleAnalyzerPlugin()]
      }
    }
  }

  return defaultConfig
} 
```
Above I'm adding the bundle analyzer webpack plugin during a prod build of Next.js. You can check out all the <a href="https://github.com/vercel/next.js/blob/canary/packages/next/next-server/lib/constants.ts#L1-L4">different phases</a> of Next.js.

Next.js is production-ready and handles almost everything, but don't be scared to reach to that config and extend what you need.

We're going to install and env plugin that makes it super simple to use env vars in our app.

First, let's install the modules we need.
```
yarn add next-env dotenv-load
```
In your next.config.js file:
```js
const nextEnv = require('next-env')
const dotenvLoad = require('dotenv-load')

dotenvLoad()

const withNextEnv = nextEnv()
module.exports = withNextEnv()
```
Next, create a .env file on the root and add some envs.
```
HELP_APP_URL=https://google.com
```

## API Routes
Next.js is a full-stack framework. Fullstack, as in it, has a server, not just for development, for rendering components on your server, but also for an API!

Yes, you can legit ship an API right next to your App with no setup. Let's see how.

All we have to do is create an ```api``` folder in our ```pages``` director. The file names and paths work just like pages do. However, instead of building components in those files, we'll create API handlers.
```
pages
  api
    hello.js
```
## API Handlers
Now let's create some API handlers to handle data for our Notes app. The handlers are based on <a href="https://www.npmjs.com/package/connect">Connect</a>, which <a href="https://expressjs.com/">Express</a>.
A handler looks like this:
```js
// pages/api/data.js
// route => /api/data

export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ message: 'hello' }))
}
```
By default, this handler will respond to all requests to ```/api/data```. We need to split our logic based on the methods (```GET```, ```PUT```, ```DELETE```, etc.). We also need some way to use connect-based middleware, which would make building out these handlers much simpler.

We can quickly look at the incoming request and get the method, and we can create some HOF's to handle middleware, but I landed on an excellent package that helps with this.
```js
// pages/api/data
import nc from 'next-connect';
import cors from 'cors'

const handler = nc()
  // use connect based middleware
  .use(cors())
  // express like routing for methods
  .get((req, res) => {
    res.send('Hello world')
  })
  .post((req, res) => {
    res.json({ hello: 'world' })
  })
  .put(async (req, res) => {
    res.end('hello')
  })
  
export default handler;
```
Pretty clean! Now, let's create some API routes for our Notes app. We need some basic CRUD:
```
create note => POST /api/note
update note => PATCH /api/note/:id
delete note => DELETE /api/note/:id
get one note => DELETE /api/note/:id
get all notes => DELETE /api/note/
```
So from above, we only have 2 routes: ```/api/note/:id```
```
/api/note/
```
First, let's create a place to store our data. We'll stick to in memory for now.
```js
// src/data/data.js
const notes = []

module.exports = notes
```
Next, we'll create the routes in the ```page/api/``` directory.
```
pages
  api
    note
      [id].js
      index.js
```
```js
// pages/api/note/index.js
import nc from 'next-connect'
import notes from '../../../src/data/data'

const handler = nc()
  .get((req, res) => {
    res.json({data: notes})
  })
  .post((req, res) => {
    const id = Date.now()
    const note = {...req.body, id}

    notes.push(note)
    res.json({data: note})
  })
export default handler
```
```js
// pages/api/note/[id].js
import nc from 'next-connect'
import notes from '../../../src/data/data'

const getNote = id => notes.find(n => n.id === parseInt(id))

const handler = nc()
  .get((req, res) => {
    
    const note = getNote(req.query.id)

    if (!note) {
      res.status(404)
      res.end()
      return
    }

    res.json({data: note})
  })
  .patch((req, res) => {
    const note = getNote(req.query.id)

    if (!note) {
      res.status(404)
      res.end()
      return
    }
    
    const i = notes.findIndex(n => n.id === parseInt(req.query.id))
    const updated = {...note, ...req.body}

    notes[i] = updated
    res.json({data: updated})
  })
  .delete((req, res) => {
    const note = getNote(req.query.id)

    if (!note) {
      res.status(404)
      res.end()
      return
    }
    const i = notes.findIndex(n => n.id === parseInt(req.query.id))
    
    notes.splice(i, 1)

    res.json({data: req.query.id})
  })
  

export default handler
```

## Fetching Data
There are many ways to fetch data with Next.js. Depending on when you need the data and what you're doing with it, you have options.

Let's start with what you already know. You can continue to fetch the data client-side to react the same way you do now. Hooks, fetch, etc.

Now, for fetching data ahead time, we have three options.
```
- getStaticProps

- getStaticPaths

- getServerSideProps
```

### Static data
All of these methods are for prerendering Pages only. You cannot use them in components or client-side data fetching. Let's talk about ```getStaticProps``` on a page.
```js
// /pages/index.js

const IndexPage = () => {// jsx }
export default IndexPage

export async function getStaticProps(context) {
  return {
    props: {}
  }
}
```
By having your page export getStaticPros, Next.js will run this function at build time. Whatever your return as props will be passed into the exported page.
This function and all other data fetching functions will only ever run on the server. The actual code won't even be bundled with the client code. That means you can do some exciting things here:

- file system work
- connect to a DB
- crawl a website? Yup.

The ```context``` object is useful when the page is dynamic. The context will contain the value of the params. This function is not run at runtime in the browser, so where do the params come in?

That's where ```getStaticPaths``` come in.
```js
// /pages/blog/:slug.js

const IndexPage = () => {// jsx }
export default IndexPage

export async function getStaticPaths() {
  // get all the paths for your posts from an API
  // or file system
  const results = await fetch('/api/posts')
  const posts = await results.json()
  const paths = posts.map(post => ({params: {slug: 
  post.slug}}))
  /*
  [
    {params: {slug: 'get-started-with-node'}},
    {params: {slug: 'top-frameworks'}}
  ]
  */
  return {paths}
}

export async function getStaticProps({ params }) {
  const res = await fetch(`/api/post/${params.slug}`)
  const post = await res.json()
  return {
    props: {post}
  }
}
```
### Static paths
If a page has a dynamic path ```[id].jsx``` and uses ```getStaticProps```, it must also use ```getStaticPaths``` to prerender all the pages at build time into HTML.

### Server data
Lastly we have ```getServerSideProps```. This will be called at runtime during every request. So unlike ```getStaticProps```, you will have the runtime data like query params, HTTP headers, and the req and res objects from API handlers.
```js
const IndexPage = () => {// jsx }
export default IndexPage

export async function getServerSideProps() {
  const response = await fetch(`https://somedata.com`)
  const data = await response.json()

  return { props: { data } }
}
```
### When to use what
Do you need data at runtime but don't need SSR? Use client-side data fetching.

Do you need data at runtime but do need SSR? Use ```getServerSideProps```

Do you have pages that rely on data that is cachable and accessible at build time? Like from a CMS? Use ```getStaticProps```

Do you have the same as above but the pages have dynamic URL params? Use ```getStaticProps``` and ```getStaticPaths```

### Fetch notes
We won't get into creating a UI to create notes, so let's just seed our in-memory DB with some notes.
```js
// src/data/data
const notes = new Array(15)
  .fill(1)
  .map((_, i) => ({
    id: Date.now() + i,
    title: `Note ${i}`
  }))
```
Let's fetch some notes from our API in our app now. First, getting all the notes. Because the notes can be created and are dynamic, we can fetch them client-side or server-side render. Let's do the latter.
```js
// pages/note/index.jsx

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/note/`)
  const {data} = await res.json()
  return {
    props: {notes: data}
  }
}
```
We'll do the same for getting one note. Except, we'll redirect if the request fails.
```js
export async function getServerSideProps({params, req, res}) {
  const response = await fetch(`http://localhost:3000/api/note/${params.id}`)

  // so much power!
  if (!response.ok) {
    res.writeHead(302, { Location: '/notes' })
    res.end()
    return {props: {}}
  }

  const {data} = await response.json()
  
  if (data) {
    return {
      props: {note: data}
    }
  }
}
```
Next, we'll simulate a CMS and fetch the content for the landing page.
```js
/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

export default ({content}) => (
  <div sx={{ height: `calc(100vh - 60px)`}}>
    <div sx={{variant: 'containers.page', display: 'flex', alignItems: 'center', height: '100%'}}>
      <h1 sx={{fontSize: 8, my: 0}}>{content.title}</h1>
    </div>
  </div> 
)

export async function getStaticProps() {
  return {
    props: {
      content: {
        title: 'Look at my note app tho'
      }
    }
  }
}
```
## Rendering Modes
Next.js looks at the data fetching in your page components to determine how and when to prerender your page. Here are the different modes:

```Static Generation``` Pages built at build time into HTML. CDN cacheable.

```Server-side Rendering``` Pages built at run time into HTML. Cached after the initial hit.

```Client-side Rendering``` Single-page app

By default, all pages are prerendered, even if they don't export a data fetching method. You choose the prerendering method (static or SSR) by what data function you export in your page component.

For client-side rendering, fetch your data inside your components. You can mix and match these rendering modes to have a genuinely hybrid app ✨.


