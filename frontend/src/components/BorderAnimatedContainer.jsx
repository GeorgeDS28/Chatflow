function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="
        w-full h-full
        [background:linear-gradient(45deg,#0a1628,theme(colors.blue.950)_50%,#0a1628)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.blue.900/.5)_80%,_theme(colors.blue.500)_86%,_theme(colors.blue.300)_90%,_theme(colors.blue.500)_94%,_theme(colors.blue.900/.5))_border-box]
        rounded-2xl border border-transparent animate-border
        flex overflow-hidden shadow-glow-lg
      "
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
