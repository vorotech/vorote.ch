# vorote.ch

This is a Git repo of Dmytro Vorotyntsev personal [blog](https://vorote.ch). It is based on minimal, lightweight and mobile-first starter [Lumen](https://github.com/alxshelepenok/gatsby-starter-lumen) uses [Gatsby](https://github.com/gatsbyjs/gatsby).
All blog posts and pages content is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

## Features
+ [Styled Components Grid](https://github.com/jameslnewell/styled-components-grid).
+ [Modern font stack](https://bitsofco.de/the-new-system-font-stack).
+ Beautiful typography inspired by [matejlatin/Gutenberg](https://github.com/matejlatin/Gutenberg).
+ Syntax highlighting in code blocks using [PrismJS](http://prismjs.com).
+ [Mobile-First](https://medium.com/@mrmrs_/mobile-first-css-48bc4cc3f60f) approach in development.
+ Archive organized by tags and categories.
+ Pagination support.
+ [Netlify CMS](https://www.netlifycms.org) support.
+ Color mode toggler.
+ Google Analytics.
+ Disqus Comments.
+ [Flow](https://flow.org/) static type checking.
+ Automated using [GitHub Actions](https://github.com/features/actions).
+ Deployed to [Netlify](https://netlify.com).

## Local development

### Access CMS Locally

To test the CMS locally run a production build of the site:

```sh
$ yarn run serve
```

### Start Development

Navigate into your new site’s directory and start it up.

```sh
$ yarn run develop
```

### Open the source code and start editing!

Your site is now running at `http://localhost:8000`!

Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

Open the `blog` directory in your code editor of choice and edit `src/templates/index-template.js`. Save your changes and the browser will update in real time!

### Folder Structure

```sh
└── content
    ├── pages
    └── posts
└── static
    ├── admin
    └── media
└── src
    ├── cms
    │   └── preview-templates
    ├── components
    │   ├── Feed
    |   ├── GlobalStyles
    │   ├── Icon
    │   ├── Layout
    │   ├── Page
    │   ├── Pagination
    │   ├── Post
    │   │   ├── Author
    │   │   ├── ColorModeToggler
    │   │   ├── Comments
    │   │   ├── Content
    │   │   ├── Meta
    │   │   └── Tags
    │   ├── Sidebar
    │   │   ├── Author
    │   │   ├── Contacts
    │   │   ├── Copyright
    │   │   └── Menu
    |   └── Theme
    ├── constants
    ├── gatsbyapis
    ├── templates
    └── utils

```
