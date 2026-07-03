# Builder Sync (maintainers only)

Internal tooling for syncing Living Design content into the Builder.io project. Not published in the `@walmart/ld-kit` npm package — invoke from source via `tsx`.

## 1) Configure environment

Copy `.env.example` values into `.env`:

- `BUILDER_URL`: Builder project URL

Example:

```env
BUILDER_URL="https://builder.io/app/projects/..."
```

## 2) Build portable output

Before syncing, generate portable component copies:

```bash
npm run build:portable
```

## 3) Run Builder sync

From the repo root:

```bash
npm run sync:builder
```

Or the test variant:

```bash
npm run sync:builder:test
```

## Notes

- First run may require logging in when the browser opens.
- The sync flow uses a persistent browser profile at `sync/builder/.browser-profile`, so later runs reuse your session.
- Override the URL from CLI with `--url`.
