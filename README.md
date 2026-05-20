# Telegram Type Language (TL) for Zed

A [Zed](https://zed.dev) extension that adds syntax highlighting for
Telegram's [Type Language](https://core.telegram.org/mtproto/TL)
schema files (`*.tl`).

The highlight categories mirror the regex-based highlighter from
[`libprisma`](https://github.com/desktop-app/libprisma)'s
[`prism-tl.js`](https://github.com/desktop-app/libprisma/blob/master/components/prism-tl.js)
component:

| Prism token   | Matches                                       | Zed scope                        |
|---------------|-----------------------------------------------|----------------------------------|
| `builtin`     | `---functions---`, `---types---`, `flags.N`   | `@keyword` / `@keyword.modifier` |
| `comment`     | `// …` and `/* … */`                          | `@comment`                       |
| `function`    | the type of a field (right of `:`)            | `@type`                          |
| `punctuation` | `{ } [ ] ; , < >`                             | `@punctuation.*`                 |
| `operator`    | `:` `=` `?` `*`                               | `@operator`                      |
| `entity`      | constructor id `#abcd1234`                    | `@constant.numeric`              |
| `class-name`  | the result type (between `=` and `;`)         | `@type`                          |

Zed only supports Tree-sitter for highlighting, so the prism-tl.js
regex patterns are ported to a minimal Tree-sitter grammar
(`grammar/grammar.js`) whose node types map one-to-one to the original
Prism categories.

## Layout

```text
zed-tl/
├── extension.toml              # Zed extension manifest
├── languages/tl/
│   ├── config.toml             # File suffix, comment markers, brackets
│   └── highlights.scm          # Zed-scope highlight queries
└── grammar/                    # tree-sitter-tl, referenced via path = "grammar"
    ├── grammar.js              # Grammar definition
    ├── package.json
    ├── queries/highlights.scm  # Generic highlight queries (Neovim / Helix)
    ├── src/                    # Generated parser (parser.c, headers, ABI files)
    └── test/
        ├── corpus/basic.txt    # `tree-sitter test` fixtures
        └── sample.tl           # Standalone sample for manual testing
```

## Installing in Zed (dev install)

1. Clone this repo.
2. Open Zed, then `Ctrl-Shift-P` / `Cmd-Shift-P` → `zed: install dev extension`.
3. Pick the cloned `zed-tl` folder.

Zed will clone this repo at the commit pinned in `extension.toml`,
compile the grammar in `grammar/` to WebAssembly, and load the
extension. Open any `.tl` file to verify (the bundled
`grammar/test/sample.tl` works).

## Working on the grammar

```sh
cd grammar
npm install
npx tree-sitter generate
npx tree-sitter test
npx tree-sitter parse test/sample.tl
```

Requires Node.js and `tree-sitter-cli` 0.25+ (older 0.22.x has a
Windows module-resolution bug on Node 22).

## Updating

After editing `grammar/grammar.js` or `languages/tl/highlights.scm`:

1. From `grammar/`, run `npx tree-sitter generate && npx tree-sitter test`.
2. Bump `version` in `extension.toml`.
3. Commit and push.
4. Update the `commit` field in `extension.toml` to the new SHA.
5. Commit and push again. (Zed reads `extension.toml` from the
   newest commit and clones the grammar at the SHA it names.)
6. On each machine: `zed: rebuild dev extension` (or reinstall).

## License

MIT.
