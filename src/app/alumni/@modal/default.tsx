/**
 * Fallback for the `@modal` slot.
 *
 * Rendered whenever the slot has no matching route — on the archive itself and
 * on a direct visit to a profile — so no overlay appears.
 */
export default function ModalDefault() {
  return null;
}
