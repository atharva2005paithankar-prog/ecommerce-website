function ErrorMessage({ message, onRetry }) {
  return (
    <div className="center-box error-box" role="alert">
      <h2>Oops!</h2>
      <p>{message}</p>
      {/* the Try again button only shows if a retry function is given */}
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
