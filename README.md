# Omni UI

Omni UI is an opinionated fork of [shadcn/ui](https://ui.shadcn.com) with a frosted-glass, mono-uppercase aesthetic. The registry supports both React and Solid. Source files live under `registry/react/ui` and `registry/solid/ui`.

- Concept: glassmorphism-inspired surfaces, tight mono type, and tone-driven color tokens ready for cloud dashboards.
- Demo: https://munenick.github.io/omni-ui/components/

## Usage

1. **Initialize shadcn/ui**

   ```bash
   pnpm dlx shadcn@latest init
   ```

2. **Add the Omni registry** – edit your generated `components.json` so the aliases include the scope:

   ```json
   "registries": {
     "@omni": "https://munenick.github.io/omni-ui/r/{name}.json"
   }
   ```

3. **Pull components**

   ```bash
   pnpm dlx shadcn@latest add @omni/button
   ```

   For Solid:

   ```bash
   pnpm dlx shadcn@latest add @omni/solid/button
   ```

## Customization

Omni UI is opinionated by default, but the generated code is organized so you can adjust the look without rewriting every component.

- `@omni/glass-style` and `@omni/solid/glass-style` install the glass tokens plus `lib/glass.ts`. Update the exported recipes there to change shared surface styles such as menu, overlay, dialog, popover, and sheet glass treatments in one place.
- `@omni/tone-style` and `@omni/solid/tone-style` install the tone tokens plus `lib/tone.ts`. Update those tokens and mappings to change alert, sonner, and other tone-driven components consistently.
- Components that share the same mono typography now reference `lib/utils.ts` helpers such as `omniMonoText`. Updating those recipes lets you retune repeated label, menu, and section title typography without editing each component individually.
- CSS variable overrides also work. If you only want to retune the visual system, override tokens such as `--glass-shadow-outline`, `--glass-tint-subtle`, or `--tone-default-border` in your app stylesheet instead of editing component files.
- Local one-off changes are still done the normal shadcn way with `className` or `class`, but Omni is designed so the main styling hooks live in the generated `lib/*.ts` files and style items first.

Local development still uses the standard scripts:

```bash
pnpm install
pnpm run dev
```
