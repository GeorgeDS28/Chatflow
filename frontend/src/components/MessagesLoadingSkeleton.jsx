function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-4 py-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`animate-pulse rounded-2xl ${
              index % 2 === 0
                ? "w-40 h-12 bg-blue-950/50 border border-blue-500/10 rounded-bl-md"
                : "w-32 h-10 bg-blue-600/20 border border-blue-500/15 rounded-br-md"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;
