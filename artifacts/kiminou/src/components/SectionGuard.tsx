import { Component, type ReactNode } from "react";

/** Localized error guard, ported from Copy A's hardened /press pattern
 *  (kiminou-knox-website, 2026-10-05 outage fix): a failing section degrades
 *  to nothing; the rest of the page still renders. Applied to KimPossible's
 *  /press sections in the 2026-11-05 fold-in — pattern only; KimPossible's
 *  press content and data are unchanged. */
export class SectionGuard extends Component<
  { children: ReactNode; label: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error(`[Press] section "${this.props.label}" failed:`, error);
  }

  render() {
    if (this.state.failed) return null;
    return <>{this.props.children}</>;
  }
}

export default SectionGuard;
