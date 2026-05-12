<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tafutanga-agent-rules -->
## Tafutanga project rules

### Product and tone
- **Product**: Tafutanga helps Kenyans in Nairobi make house hunting easier.
- **Name**: Tafutanga (use this in UI copy and metadata).
- **No emojis**: Do not use emojis anywhere (UI strings, docs, commit messages).

### UI and styling
- **Tailwind only**: Use Tailwind CSS utilities only. Do not add other styling systems (CSS modules, styled-components, MUI, Chakra, etc.).
- **Icons**: Use `lucide-react` icons only. No icon animations.

### Responsiveness (required)
- **100% responsive**: Every component must work on all screen sizes (mobile → desktop) with no horizontal scroll, clipped content, or overlapping UI.
- **Mobile-first**: Start from small screens, then add `sm:`/`md:`/`lg:` enhancements.
- **Overflow safety**: Use `min-w-0`, wrapping, `truncate`, and responsive grids to prevent layout breakage with long text.

### State management
- **Global state**: Use `zustand`. Avoid adding Redux/MobX/Recoil unless explicitly requested.

### Domain-Driven Design (DDD) — lightweight
- **Goal**: Keep DDD practical and low-ceremony. Prefer clarity over taxonomy.
- **Structure**:
  - Put business concepts under `src/domain/<bounded-context>/`.
  - Keep app wiring and UI under `src/app/` and `src/ui/` (if introduced).
  - Prefer feature/bounded-context folders over generic `utils/`.
- **Modeling guidance**:
  - Use **entities** when identity matters, **value objects** for immutable concepts, and **domain services** only when logic does not belong on a single entity/value.
  - Keep invariants in the domain layer (validation rules, state transitions).
  - Keep IO concerns (HTTP, persistence) out of domain objects.
- **Application layer**:
  - Use small “use case” functions for workflows (e.g. `searchHomes`, `saveShortlist`).
  - UI should call use cases, not reach into persistence directly.
- **Don’t overbuild**:
  - Avoid repositories/aggregates/interfaces until there are at least 2 implementations or the abstraction reduces complexity.

### Comments (required where logic exists)
- **Rule**: Where there is logic (non-trivial conditionals, parsing, transformations, state transitions, business rules), add a **short comment** explaining the intent.
- **Keep it short**: 1 line is usually enough.
- **No narration**: Avoid obvious comments like “increment i” or “return result”; comment *why* the logic exists or what constraint it satisfies.

### Clean code (required)
- **Naming**: Use clear, domain terms (Nairobi/Kenya house-hunting language). Avoid ambiguous names like `data`, `item`, `temp` unless truly generic.
- **Small units**: Keep components/functions small and single-purpose. Extract helpers when a block has its own intent.
- **No duplication**: If logic repeats, extract it into a shared function (prefer domain/use-case helpers over UI copies).
- **Explicit over clever**: Prefer readable code to “smart” one-liners.
- **Boundaries**: UI components should focus on rendering + user interaction; business rules belong in domain/use-cases.
- **Consistent patterns**: Follow the existing project structure and conventions; don’t introduce new patterns without removing old ones.

### Logic that does not break (robustness rules)
- **Validate inputs**: Guard against `null/undefined`, empty strings, and unexpected shapes before using values.
- **Preserve invariants**: Enforce business rules in the domain layer; fail fast (throw/return error) when invariants are violated.
- **Handle errors intentionally**: Don’t swallow errors silently unless there is a clear fallback; if you must catch, add a short comment explaining why.
- **Avoid fragile assumptions**: Don’t rely on array indices, implicit ordering, or undocumented API behavior without a guard.
- **Safe defaults**: Provide sensible defaults for optional fields and state to prevent runtime crashes.
- **Change with confidence**: When editing existing logic, add or update the closest lightweight check/test (at minimum, a small validation or invariant guard) to prevent regressions.
<!-- END:tafutanga-agent-rules -->
 