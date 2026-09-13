# Component comparison notes

## What shadcn handles that I missed

### Dialog behavior is delegated to a real headless primitive, not just recreated ARIA

`components/ui/dialog.tsx:10-24` exposes separate wrappers around `DialogPrimitive.Root`, `Trigger`, `Portal`, and `Close`; `DialogContent` then composes `Portal`, `Backdrop`, and `Popup` at lines 51-79. That means this generated component delegates the dialog state machine and accessibility mechanics to `@base-ui/react/dialog` (the import at line 4), instead of making one component manually watch the document.

In the installed Base UI implementation, its `DialogPopup` wraps the popup in `FloatingFocusManager` with `initialFocus`, `returnFocus`, `modal`, and `restoreFocus: "popup"` (`node_modules/@base-ui/react/dialog/popup/DialogPopup.js:90-100`). This abstracts the focus guards/trap, initial and final focus configuration, focus restoration when the focused item disappears, and nested-dialog coordination. The generated wrapper itself does not need a selector list or a global `keydown` listener.

By contrast, `playground/Modal.tsx:41-53` maintains a hand-written focusable selector; lines 163-190 manually wrap Tab; lines 119-143 snapshot `document.activeElement`, choose the first queried node, and restore it. That is a solid learning implementation, but every edge case is now application code: elements made non-focusable by an ancestor `fieldset`, `inert`, visibility, or dynamic content can disagree with that selector. Base UI's default `modal: true` contract explicitly limits interaction to the dialog, traps focus, locks page scroll, and disables outside pointer interaction (`DialogRoot.d.ts:27-36`); it also creates an internal portal backdrop (`DialogPortal.js:38-45`). The playground instead relies on `aria-modal="true"` plus a visual sibling backdrop (`Modal.tsx:202-215`). `aria-modal` communicates modality to supporting assistive tech; it does not itself make outside DOM interaction inert.

### Close states stay mounted long enough to animate

The generated overlay explicitly has both `data-open:animate-in` and `data-closed:animate-out` classes (`components/ui/dialog.tsx:34`); the popup has the same open/closed fade and zoom classes (`:56`). Those attributes come from the primitive's transition state—Base UI documents `data-closed` as present while the dialog is closed and `data-ending-style` while it animates out (`DialogPopupDataAttributes.js:13-23`). It can therefore retain the portal/popup for the exit transition rather than removing it immediately.

`Modal.tsx:198` immediately returns `null` whenever `open` is false. There is no closed DOM node on which an exit animation could run, so a real user sees a hard disappearance and any child state is destroyed immediately. The same idea is available in Base UI's portal through its `keepMounted` option (`DialogPortal.js:24-37`) when persistent DOM is desired.

### Composition is intentionally finer grained, including element ownership

The generated export is a compound API: `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, and `DialogClose` are all separately exported (`components/ui/dialog.tsx:149-160`). A caller can place a trigger away from the content, omit the stock header, use the title/description primitives for the correct relationships, or put a close control in the footer. The tabs API follows the same pattern: `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` (`components/ui/tabs.tsx:7-81`).

The playground APIs instead require one pre-shaped object/component: `ModalProps` requires `title` and `children` (`Modal.tsx:57-76`) and hard-codes the header/title/body at lines 239-282; `TabsProps` accepts a `tabs: TabItem[]` data array (`Tabs.tsx:23-46`) and creates all buttons and panels internally (`:145-206`). That prevents a consumer from naturally composing rich trigger markup, a custom dialog heading/description/footer, a tab with a badge/icon/disabled state, or panels sourced from separate components without expanding the bespoke props.

### `render` preserves primitive behavior while allowing the design-system element

The close icon is still a `DialogPrimitive.Close`, but it renders through the project `Button` via `render={<Button variant="ghost" ... />}` (`components/ui/dialog.tsx:62-76`); the footer does the same with an outline button (`:111-115`). This is not merely nesting a Button inside a close button (which would produce invalid nested interactive controls). The primitive owns the semantic button behavior and close handler while Base UI merges that behavior into the supplied Button host.

`Modal.tsx:254-278` hard-codes a native close `<button>`, and any close action supplied by children must independently call `onClose` (for example, the Cancel button at `:351-358`). That works in the demo, but it spreads close wiring across each consumer and does not let a caller supply a shared Button/link/custom component while retaining one close primitive.

## What I'd fix now that I've seen theirs

- Fix modal cleanup and make outside content genuinely modal. The `open` effect sets `document.body.style.overflow = "hidden"` (`Modal.tsx:117-135`), but its cleanup on an unmount while still open only cancels the animation frame; it does not restore `overflow`. It also overwrites a pre-existing body overflow value and cannot coordinate two overlays. Use a managed scroll-lock/inert layer (or the Base UI dialog) so a user is neither left with a permanently unscrollable page nor able to interact with background controls.

- Replace the home-grown focus trap or considerably harden it. The query in `getFocusable` (`Modal.tsx:81-84`) is reused at open and on every Tab press (`:127-132`, `:163-190`), but it does not filter hidden, inert, disconnected, or effectively disabled elements. It also installs one document listener for every open Modal (`:148-196`), so nested/open-overlapping dialogs can all react to Escape. A primitive's focus manager is safer for the focus and nested-dialog cases real keyboard and screen-reader users encounter.

- Add a close/transition phase rather than using `if (!open) return null` (`Modal.tsx:198`). Mirror the generated `data-open`/`data-closed` styling at `components/ui/dialog.tsx:34,56`, or use the primitive's transition support, so closing does not abruptly vanish. Decide explicitly whether child state should persist through that short exit period.

- Make Modal composition flexible: replace the required string `title`/fixed header (`Modal.tsx:66-67`, `:239-282`) with title, description, close, and footer parts or slots. This permits long/rich labels, description wiring, design-system buttons, and multiple valid layouts without weakening dialog semantics.

- Harden the playground tabs for changing data. `activeIndex` is initialized once from `defaultIndex` (`Tabs.tsx:78-80`); it is not reconciled if `tabs` shrinks/reorders, so it can point outside the array and leave no tab selected. The use of `key={tab.label}` for both tabs and panels (`:161`, `:196`) also breaks React identity if labels repeat or are edited. Use a stable `value`/id per tab and a controlled `value` + `onValueChange` option, as the primitive-oriented API does.

- Add orientation and disabled/activation choices before treating this Tabs component as reusable. The playground only handles ArrowLeft/ArrowRight/Home/End (`Tabs.tsx:104-130`), so a vertical tablist would have the wrong keys; its data model has no disabled tab state. The generated Root accepts an `orientation` and writes `data-orientation` (`components/ui/tabs.tsx:7-21`), while each primitive Tab receives its behavioral props rather than the wrapper assuming all tabs are identical (`:55-67`). These gaps matter for keyboard users and for product screens with permissions/loading states.

## What my version does that's simpler

`playground/Tabs.tsx:72-206` is easier to trace end-to-end for a fixed dashboard: one `tabs` array becomes one tablist plus one panel per entry, and `activeIndex` is the only selection state. Likewise, `Modal.tsx:99-286` lets a reader see its complete DOM, focus policy, dismissal policy, and portal in one component. The generated shadcn/Base UI version is more production-hardened, but its behavior is distributed across compound wrappers and the headless library; for a one-off static UI, the playground's single-component shape is more immediately legible.
