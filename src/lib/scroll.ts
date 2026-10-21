/**
 * Ultra-smooth scrolling helper with fixed header offset compensation.
 * Cross-page aware: if target element is not on the current page (e.g. from /careers),
 * redirects seamlessly to home page section (/#targetId).
 */
export function smoothScrollTo(targetId: string, offset: number = 84): void {
  if (typeof window === "undefined") return;

  const cleanId = targetId.startsWith("#") ? targetId.slice(1) : targetId;
  const element = document.getElementById(cleanId);

  if (!element) {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${cleanId}`;
    }
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: "smooth"
  });
}
