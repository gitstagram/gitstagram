# Gitstagram

![logo](https://github.com/gitstagram/gitstagram/raw/main/readme-logo.png)

Gitstagram is a full social photo sharing app built with Github's API. It works by creating a `gitstagram-library` repository that hosts your media, and manages the social features by leveraging [Github Issues](https://docs.github.com/en/issues) as a backend. Everything Gitstagram does is self-contained within this repository, which can be deleted at any point desired.

The result is a self-contained social media platform using existing Github features, giving you full control of your personal data - free from advertisements, marketing trackers, and other conflicting interests.

Gitstagram is open source photo sharing made by developers, for developers!

![preview](https://github.com/gitstagram/gitstagram/raw/main/readme-preview.png)

# Development

Running development

## Next JS

Gitstagram is a Next 11 project, with custom entry points at [`pages/_document.tsx`](https://nextjs.org/docs/advanced-features/custom-document) and [`pages/_app.tsx`](https://nextjs.org/docs/advanced-features/custom-app). Make sure proper `.env` variables are set, and project will run with the following:

```bash
yarn
yarn dev
```

## .env

The `.env` should be a template for the env variables required for the app to run.
Populate values for `.env.development.local` to run locally.

Populate environment variable settings in Vercel for production

JWT Signing keys and IDs can be generated via `yarn jose newkey -s 512 -t oct -a HS512 -b`

## Graphql

Files in `graphql/operations` will be parsed for `gql` documents and have types/queries/mutations automatically generated

Change the `codegen.yml` file `Authorization: 'token ${GITHUB_ACCESS_TOKEN}'` to an actual github access token.
An access token can be optained by logging the session in `pages/api/auth/[...nextauth].ts`, beginning with `gho_xxxxx`

Do not commit the token if the `codegen.yml` is changed during development.

## Linting

Linting automatically happens as part of the development process with Webpack plugins.
But manual linting for code/styles can be accomplished through `yarn lint` and `yarn lint:styles` respectively.

Note that `'stylelint-processor-styled-components'` has been turned off during Webpack development stylelinting because it interferes with automatic fixing of style violations. The results don't seem to be different much, but `yarn lint:styles` will lint with the processor enabled.

## Fonts and Icons

Logo font only contains the characters necessary to load the logo. It is subsetted with `yarn subsetFont`

Icon font only contains icons picked in `fontSources/bootstrap-icons/svgs`. Adding new icons to the folder and run `yarn subsetIcons` to rebuild the icon font.

The script will automatically update `styles/bootstrapIconSubset.css`, `public/bootstrap-icons.woff`, `components/ui/icon/types.ts`, and update the preload link in `pages/_document.tsx`

## Sentry

Sentry is disabled in `process.env.NODE_ENV === 'development'` in the files `next.config.js` and in the error handlers in `helpers/errorHandling`. Switch them to test Sentry functionality.

## Committing Code

Code commits should be made via `yarn commit` via Commitizen by following the prompt.
