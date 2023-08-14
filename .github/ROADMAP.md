# Typefaceoff Development Roadmap

## 👋 Context

This living document serves to plainly lay out features that are actively being worked on, planned, or under review.

Everyone is welcome to peruse and contribute to our [issues](https://github.com/typefaceoff/typefaceoff/issues). If there’s something you think would be a good addition to Typefaceoff, but it isn’t mentioned here, we encourage you to open a new issue. (If you aren’t sure how to go about that, no worries—check out our [contributing guidelines](CONTRIBUTING.md).)

## 🧹 Housekeeping

Minor bug fixes and enhancements to existing features don’t need to be mentioned here! This roadmap is about the big picture.

## 🗺️ Feature roadmap

*Last updated August 14, 2023.*

### Planned for v0.1 (August 23, 2023)

#### Side-by-side comparison of two fonts

The core-most feature of this tool. A user should be able to drag and drop two fonts into Typefaceoff in the browser, and see two side-by-side “pages”—each effectively a type specimen—one typeset in each of the imported fonts.

- At this stage, text in the proofing template will be fixed and uneditable by the user—unless they’re savvy enough to edit the page source. (If that’s you, you might make a good [contributor](CONTRIBUTING.md) around these parts!)
- To ensure the user is never at risk of violating any of their font licences, the fonts should be accessed using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

#### Configurable leading

Simply changing the typeface used to typeset a document does not lend itself to fair comparison between two choices. This is, in part, because the *point size* of a font is [surprisingly non-standard](https://tonsky.me/blog/font-size). Different typefaces need to be set at different point sizes, with different line spacing, to optically *appear* as though they’re otherwise typeset similarly.

The user should be able to adjust the line spacing (within a small but reasonable range) separately for each font being compared. This lets them see the text typeset closer to how they would use it in production, rather than having to optimise for one font at the detriment of the other.

> [!NOTE]
> **Leading** (pronounced *ledding*) is the traditional term for **line spacing**, because printers used to put strips of lead between lines to adjust line spacing.
