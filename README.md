# Starlight Starter Kit: Auth

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

```
npm create astro@latest -- --template TheOtterlord/starlight-auth
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/TheOtterlord/starlight-auth/tree/main/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/TheOtterlord/starlight-auth/tree/main/examples/basics)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTheOtterlord%2Fstarlight-auth%2Ftree%2Fmain%2Fexamples%2Fbasics&project-name=my-starlight-docs&repository-name=my-starlight-docs)

## Setting up Auth

<!-- Authentication is configured in `auth.config.js`, and handled in `src/server/index.ts` for node deployments, or `middleware.js` for Vercel(/Netlify). Any on-demand `.astro` page may also access the session, like seen in `index.astro`. -->

### Authentication

You can customize the available sign-in methods in `auth.config.js`. [Auth.js](https://authjs.dev) supports [e-mail signin](https://authjs.dev/getting-started/authentication/email), traditional [username/password](https://authjs.dev/getting-started/authentication/credentials) auth, and 80+ [OAuth](https://authjs.dev/getting-started/authentication/oauth) providers. This template uses GitHub OAuth as an example.

### Authorization

By default, any authenticated user will be authorized to view your gated content. You can add additional authorization checks to the `isAuthed` function in `src/lib/auth.ts`. If the function returns `true`, a user it authorized to access the page, and vice-versa if `false` is returned. The example logic restricts access to routes defined in `paths` above the `isAuthed` function.

### Environment Variables

You may require different environment variables depending on your authentication method(s). Follow the example given in `.env.example` to create your `.env` file, replacing the `GITHUB` variables with the variables for your auth provider.

## Deploy

In `astro.config.ts`, comment out the `adapter` for the platform you want to deploy to, removing the others. Deploy to your preferred provider, adding the environment variables you've defined.

## Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
