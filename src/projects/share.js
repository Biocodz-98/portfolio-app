// Opens the device share sheet; if the browser has none, copies the link instead.
// Returns "shared" | "copied" | "cancelled" | "error".
export async function shareLink({ title, text, url = window.location.href }) {
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return 'shared';
    }
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch (err) {
    return err?.name === 'AbortError' ? 'cancelled' : 'error';
  }
}
