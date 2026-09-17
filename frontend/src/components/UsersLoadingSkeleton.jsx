function UsersLoadingSkeleton() {
  return (
    <div className="space-y-1.5">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/10 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="size-11 bg-blue-800/40 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-blue-800/40 rounded-lg w-3/4" />
              <div className="h-2.5 bg-blue-800/30 rounded-lg w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;
