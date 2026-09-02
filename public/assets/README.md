# Assets

Static files served from `/assets/**`. Referenced from `src/data/**` as
`ImageAsset` records — never hard-coded inside components.

```
assets/
  brand/                 logo, shared marks, placeholder imagery
  about/                 Ruwwad Tafila story imagery
  youth/                 Youth Program imagery
  drosos/
    hero/
    stages/
    studios/
    projects/
    gallery/
  alumni/
    <slug>/              one folder per graduate, matching their data slug
      portrait.*
      stages/
      gallery/
```

Notes:

- No filenames are assumed. Add the file, then reference it from the matching
  data module with its real intrinsic `width` and `height` so next/image can
  reserve space and avoid layout shift.
- Portraits: white background, consistent framing. Supply the largest available
  version — next/image generates the responsive sizes.
- `brand/placeholder-portrait.svg` is technical scaffolding used by the
  placeholder alumni record. Delete it once real portraits are in place.

### brand/

`ruwwad-logo.jpg` is the supplied master — **do not render it directly and do
not edit it**. Everything else in this folder is derived from it:

| File | What it is |
|---|---|
| `ruwwad-lockup.png` | master with the 1px scan border trimmed; colours untouched |
| `ruwwad-lockup-inverse.png` | cyan field keyed out; composites back over `#0CADD9` identically |
| `ruwwad-mark-inverse.png` | the wing mark alone, keyed out |
| `og-default.jpg` | 1200x630 social card, lockup on the brand cyan |

`src/app/icon.png` and `src/app/apple-icon.png` are generated from the mark.
If the master is replaced, regenerate all of these together so they stay
consistent.
