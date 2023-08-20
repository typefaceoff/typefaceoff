# Typefaceoff

<img width="1353" alt="Screenshot of Typefaceoff" src="https://github.com/jaskfla/typefaceoff/assets/33956381/600ce943-6102-4033-a9f3-41a9d3e0867d" />

Typefaceoff is a a drag-and-drop tool for proofing and comparing typefaces in a browser.

The tool works locally; font files are not uploaded to any server.

## 🚧 Typefaceoff is in alpha

Typefaceoff is in early stages of development. *Really.* We envisage it becoming a useful tool for anyone who puts text on a page (Office and Google Docs count!), but it isn’t quite ready for widespread adoption.

If that doesn’t put you off, give it a spin, and we encourage you to help us build it by giving feedback or making code contributions. Check out our [contributing guidelines](./.github/CONTRIBUTING.md) and [open issues](https://github.com/typefaceoff/typefaceoff/issues) to get into it!

## 💾 Development

This project uses:

- [React](https://react.dev) for front-end,
- vanilla [CSS](https://www.w3.org/Style/CSS) for styling, and
- [Vite](https://vitejs.dev) for server tooling.

[Node.js](https://nodejs.org) 16+ is recommended for development; Typefaceoff is not tested with older versions. The package manager of choice is pnpm—installation instructions on [the pnpm website](https://pnpm.io/installation).

For a smoother contribution process, we recommend you:

- configure your code editor to use the [Prettier](https://prettier.io) and [ESLint](https://eslint.org) extensions; and
- enable your editor’s *format on save* option.

### 🔧 Set-up

After cloning your fork of this repository and navigating to its root folder, use these commands to set up a development server and run Typefaceoff locally in your browser.

```sh
# Clone your fork of the Git repository and open it
cd typefaceoff

# Install dependencies
pnpm install

# Set up pre-commit hooks for code formatting
pnpm run husky

# Start the development server
pnpm run dev
```

It should look something like this:

![setup](https://github.com/jaskfla/typefaceoff/assets/33956381/3624dbe7-6119-49fb-9e7e-89a2cf2de31b)

In the example above, you could then load `http://localhost:5173` in your web browser to see Typefaceoff in action. Press `q` in this window to terminate the server.

The following commands may also be useful:

```sh
# Build for production
pnpm run build

# Locally preview the production build
pnpm run preview

# Run linter to catch errors
pnpm run lint

# Run formatter to format code
pnpm run format
```

## 🙏 Acknowledgements

- [Dr&nbsp;Kelly Blincoe](https://profiles.auckland.ac.nz/k-blincoe), for making us do this. (Typefaceoff started as an assignment for [SOFTENG&nbsp;310 Software Evolution and Maintenance](https://courseoutline.auckland.ac.nz/dco/course/SOFTENG/310) at [Waipapa Taumata Rau](https://www.auckland.ac.nz/en.html), the University of Auckland.)
- [Pablo Impallari](https://www.impallari.com), whose [Font Testing Page](https://github.com/impallari/Font-Testing-Page) inspired this idea.
- [All](https://mass-driver.com) [the](https://mbtype.com) [many](https://typejockeys.com) [great](https://www.fonderiacavedoni.com) [typeface](https://www.boldmonday.com) [designers](https://djr.com) [out](https://www.colophon-foundry.org) [there](https://tosche.net).

## 📄 Licence

[MIT](./LICENSE). ©&nbsp;2023–present Typefaceoff contributors.
