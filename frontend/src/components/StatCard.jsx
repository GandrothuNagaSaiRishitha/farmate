export default function StatCard({ value, label, icon: Icon }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-card border border-soil/10 bg-white/70 p-5">
      {Icon && <Icon className="h-6 w-6 text-wheat" />}
      <div className="font-display text-2xl font-semibold text-soil sm:text-3xl">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}
