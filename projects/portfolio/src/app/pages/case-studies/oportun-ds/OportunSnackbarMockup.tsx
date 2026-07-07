import imgSnackbarComponent from "@/app/assets/pages/case-study/oportun-ds/snackbar-component.png";
import "./OportunSnackbarMockup.css";

/**
 * The source screenshot has the snackbar baked into the pixels at rest. This
 * overlays a live animated bar in the same spot (matched from the image's
 * native 486x1024 px) and patches the static one out with a white cover, so
 * the toast plays the Figma-specced slide-up loop instead of sitting static.
 */
export function OportunSnackbarMockup({ className }: { className?: string }) {
  return (
    <div className={`oportun-snackbar-mockup ${className ?? ""}`}>
      <img
        src={imgSnackbarComponent}
        alt="Low balance protection mobile screen with snackbar notification showing activation confirmation and undo action"
        className="oportun-snackbar-mockup-image"
        loading="lazy"
        decoding="async"
      />
      <div className="oportun-snackbar-mockup-patch" aria-hidden="true" />
      <div className="oportun-snackbar-mockup-bar" aria-hidden="true">
        <p className="oportun-snackbar-mockup-message">
          Low balance protection has been activated!
        </p>
        <span className="oportun-snackbar-mockup-undo">Undo</span>
      </div>
    </div>
  );
}
