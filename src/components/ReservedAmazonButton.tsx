import { DISABLED_BUTTON } from "./buttonStyles";
import { CartDoodle } from "./doodles";

/**
 * A reserved, clearly-disabled "Buy on Amazon" button — shown until the owner
 * supplies the verified Amazon listing URL. It never links anywhere.
 */
export function ReservedAmazonButton({
  note = "Amazon link coming soon",
  label = "Buy on Amazon",
}: {
  note?: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={DISABLED_BUTTON}
      >
        <CartDoodle className="h-5 w-5" aria-hidden="true" />
        {label}
      </button>
      <p className="text-sm font-semibold text-ink-soft">{note}</p>
    </div>
  );
}
