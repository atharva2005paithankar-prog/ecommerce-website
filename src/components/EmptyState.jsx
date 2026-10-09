// "children" lets the parent put a button or link inside the box
function EmptyState({ title, message, children }) {
  return (
    <div className="center-box">
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {children}
    </div>
  );
}

export default EmptyState;
