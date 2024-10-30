# exo.inc

## Setup

```bash
# Make sure you have pnpm installed
npm i -g pnpm

# Install the Vercel CLI globally
pnpm i -g vercel

# Login to Vercel
vercel login

# Link the repo to the Vercel project
vercel link

# Install dependencies
pnpm i

# Pull the environment variables from Vercel
pnpm pull-env
# or you can copy .env.example to .env.development.local and enter them manually

# Generate CMS types and SDK in src/cms/graphql-generated.ts
pnpm generate
```

VSCode should recommend a few plugins when you first open the project. Please install these for the best development experience.

## Develop

```bash
# Generate CMS types and SDK if it's possible the CMS has changed it's structure recently
pnpm generate

# Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Creating Components

You can quickly create new components using the [Folder Templates](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) VSCode extension. Once it's installed just right-click any directory and select `Create New Templated Folder` and then `Component`. Enter the component's name and the root html element or just hit return to use a `div`. This should make a new folder with the required `index.tsx` and `ComponentName.module.scss` files.

## Project Anatomy

### Styling

exo.inc is styled using SCSS for global styles and SCSS modules for scoped styles.

You can find the global styles and utils in the styles folder.

To use all the variables and mixins in a components SCSS module just import the utils like this:

```scss
@import '~/styles/utils';
```

#### Breakpoints

All breakpoints can be used via mixins. You should be using the sm and lg breakpoints for a majority of use cases. These breakpoints are when the site changes from 2 to 4 to 12 columns. exo.inc is a mobile first, no less than media queries should be used.

#### Colors

All colors have variables in the format $color-name which in turn reference CSS variables. If you need to change the opacity of the color use the provided mixin and pass it the color name and opacity. No colors should ever be hardcoded outside of the vars file. There are a set of responsive colors that can be used for components or page section which can be both light or dark. You can change the current theme at any level by using data-theme="dark".

#### Typography

All typography styles have a mixin. If you find yourself overriding more than one typography related value evalute if the type styling being used is inconsistent with the design system or if a new mixin needs to be added.

#### Combining classes

If you want to combine multiple classes and/or apply some classes conditionally use the cx util. It can be imported from ~/utils.

### Typescript

#### Typing Component Props

All components should except typed props. The type should almost all extend something like ComponentProps<'div'> (from react) and pass all props to component using ...otherProps. This allows native attribute for the given html element to be passed in safely.

#### Exports

Default exports should only be used when absolutely needed for example if next requires it.

### Dependencies

```bash
# Validates and types env variables
@t3-oss/env-nextjs

# Typescript types for packages missing them
@types/node
@types/react
@types/react-dom

# React animations
framer-motion

# For 3D development
@react-three/fiber
@types/three
framer-motion-3d
leva
r3f-perf

# Use for the GraphQL client
graphql
graphql-request
graphql-tag

# The project framework
next

# React
react
react-dom

# CSS Preprocessor
sass

# It's typescript baby
typescript

# Used for validation of any user inputs etc
zod
```

### Dev Dependencies

```bash
# Generates the types/queries for the GraphQL client
@graphql-codegen/cli
@graphql-codegen/client-preset
@graphql-codegen/typescript-graphql-request

# Used to access the .env outside of the main site
dotenv

# Enforces standardized formatting of code
prettier
pretty-quick

# File linting
eslint
eslint-config-next # Adds next specific linting
eslint-config-prettier # Adds linting rules that work with prettier

# Runs pre-commit hooks
husky

# Peer dependency of a few different dependencies
@babel/core
```
