const Spinner = ({ type, text = "Wait a few seconds ...", label = "Loading" }) => {
  const inline = type === "inline";
  const className = inline
    ? "inline-spinner"
    : type === "mini"
      ? "mini-loader-wrapper text-center py-5 w-100"
      : "spinner-container";
  const indicatorClass = `pixora-spinner${inline ? " pixora-spinner-small" : ""}`;

  if (inline) {
    return (
      <span className={className} role="status" aria-live="polite" aria-atomic="true">
        <span className={indicatorClass} aria-hidden="true" />
        <span className="spinner-visually-hidden">{label}</span>
      </span>
    );
  }

  return (
    <div className={className} role="status" aria-live="polite" aria-atomic="true">
      <span className={indicatorClass} aria-hidden="true" />
      <span className="spinner-visually-hidden">{label}</span>
      {text && (
        <p className={type === "mini" ? "mt-3 loader-text-mini" : "spinner-text"}>
          {type === "mini" && <><strong>Pixora.</strong><br /></>}
          <span>{text}</span>
        </p>
      )}
    </div>
  );
};

export default Spinner