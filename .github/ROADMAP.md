# Typefaceoff Development Roadmap

## 👋 Context

This living document serves to plainly lay out features that are actively being worked on, planned, or under review.

Everyone is welcome to peruse and contribute to our [issues](https://github.com/typefaceoff/typefaceoff/issues). If there’s something you think would be a good addition to Typefaceoff, but it isn’t mentioned here, we encourage you to open a new issue. (If you aren’t sure how to go about that, no worries—check out our [contributing guidelines](CONTRIBUTING.md).)

## 🧹 Housekeeping

Minor bug fixes and enhancements to existing features don’t need to be mentioned here! This roadmap is about the big picture.

## 🗺️ Feature roadmap

*Last updated September 27, 2023.*

### Planned for v0.3 (October 20, 2023)

- Support testing of Google Fonts.
- Multiple proofing templates, to compare fonts in different contexts.
	- e.g., Article, web page, research paper.

### Under review

#### Configurable tracking

At small point sizes, fonts need more generous letterspacing to maintain legibility. This is especially the case if a particular font does not support [optical sizing](https://justanotherfoundry.com/size-specific-adjustments-to-type-designs).

Given that we cannot know what point sizes at which the user would like to use the fonts they’re testing, we may want to consider letting the user configure the letterspacing used in the proofing template. This lets them optimise for the particular point sizes they are most interested in.

It may also be pertinent to testing all caps or small caps fonts, where increased letterspacing often improves legibility.

> [!NOTE]
> **Tracking**, **letterspacing**, and **character spacing** are interchangeable terms

#### Comparison of more than two fonts at a time

We don’t have a design for how this may be laid out, but it remains on the table… somewhere.

#### Configurable colours

Colourful proofing templates? Maybe?

### Released

#### Side-by-side comparison of two fonts `v0.1.0`

The core-most feature of this tool. A user should be able to drag and drop two fonts into Typefaceoff in the browser, and see two side-by-side “pages”—each effectively a type specimen—one typeset in each of the imported fonts.

- At this stage, text in the proofing template will be fixed and uneditable by the user—unless they’re savvy enough to edit the page source. (If that’s you, you might make a good [contributor](CONTRIBUTING.md) around these parts!)
- To ensure the user is never at risk of violating any of their font licences, the fonts should be accessed using [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

#### Configurable line spacing `v0.1.0`

Different fonts set with the same line height will *optically* look different. Allowing separate adjustments to line height, for each font being proofed, lets the user make manual adjustments to get a truer, one-to-one comparison of how the two fonts they are consider would actually behave in use.

#### Configurable leading

Simply changing the typeface used to typeset a document does not lend itself to fair comparison between two choices. This is, in part, because the *point size* of a font is [surprisingly non-standard](https://tonsky.me/blog/font-size). Different typefaces need to be set at different point sizes, with different line spacing, to optically *appear* as though they’re otherwise typeset similarly.

The user should be able to adjust the line spacing (within a small but reasonable range) separately for each font being compared. This lets them see the text typeset closer to how they would use it in production, rather than having to optimise for one font at the detriment of the other.

> [!NOTE]
> **Leading** (pronounced *ledding*) is the traditional term for **line spacing**, because printers used to put strips of lead between lines to adjust line spacing.

#### Allow the user to customise the text used in the proofing template(s)

Proofing text is currently a fixed, uneditable extract (from *Alice in Wonderland*). Users may wish to enter their own text to see how fonts look using copy that is more immediately relevant to their work.

#### Export type specimen to PDF

#### Comparison of OpenType feature support

For typesetting in English, OpenType features are used to access alternate glyphs in a font, enabling features such as ligatures, proportional/tabular figures, lining/old-style figures, ordinals, true superscript & subscript figures, among others. OpenType features are a domain in which typeface designers can flex their muscles, and support for and execution of OpenType features can be a major deciding factor for some typesetters.

> [!NOTE]
> OpenType was primarily developed for improved support for various international writing systems. OpenType features are somewhat of a luxury when typesetting in Latin script, but are table-stakes for some languages such as Arabic or Urdu.

Typefaceoff should reveal what OpenType features a font supports, let the user enable/disable individual features used in the proofing template, and/or select the stylistic set(s) used.