# Typefaceoff

Typefaceoff is a a drag-and-drop tool for proofing and comparing typefaces in a browser.

The tool works locally; font files are not uploaded to any server.

## Development

This project uses React for front-end, vanilla CSS for styling, and Vite for server tooling.

[Node.js](https://nodejs.org) 16+ is recommended for development; Typefaceoff is not tested with older versions.
The package manager of choice is pnpm—installation instructions [here](https://pnpm.io/installation).
The following commands should enable you to set up a development server running of the website.

```sh
# Clone your fork of the Git repository and open it
cd typefaceoff
# Install dependencies with pnpm
# (Consult https://pnpm.io/installation if you don’t have pnpm installed)
pnpm install
# Set up pre-commit hooks for code formatting
pnpm run husky
# Start the development server
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
