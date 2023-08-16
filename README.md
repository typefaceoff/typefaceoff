# Typefaceoff

Typefaceoff is a a drag-and-drop tool for proofing and comparing typefaces in a browser.

The tool works locally; font files are not uploaded to any server.

## Development

This project uses React for Front-end, Vanilla CSS for styling, and Vite for server tooling.

[Node.js](https://nodejs.org/en) 16+ is recommended for development as anything less has yet to be tested.
The package manager of choice is pnpm instead of npm or yarn. Installation instructions [here](https://pnpm.io/installation).
The following commands should enable you to set up a development server running of the website.

```sh
# clone your fork of the git repository and open it
cd typefaceoff
# install dependencies with pnpm (see docs if not installed https://pnpm.io/installation)
pnpm install
# set up pre-commit hooks for formatting
pnpm run husky
# start the dev server
pnpm run dev
```

Additionally, the following commands are provided:

```sh
# Build for production
npm run build
# Locally preview the production build
npm run preview
# Run linter to catch errors
npm run lint
# Run formatter to format code
npm run format
```

## Licence

To be determined.

## Acknowledgements

- [Dr Kelly Blincoe](https://profiles.auckland.ac.nz/k-blincoe), for making us do this.
- [Pablo Impallari](https://www.impallari.com), whose [Font Testing Page](https://github.com/impallari/Font-Testing-Page) inspired this idea.
- [All](https://mass-driver.com) [the](https://mbtype.com) [many](https://typejockeys.com) [great](https://www.fonderiacavedoni.com) [typeface](https://www.boldmonday.com) [designers](https://djr.com) [out](https://www.colophon-foundry.org) [there](https://tosche.net).
