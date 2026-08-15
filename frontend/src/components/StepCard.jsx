export default function StepCard({ index, title, description, icon: Icon }) {
  return (
    <div className="relative flex flex-col gap-3 rounded-card border border-soil/10 bg-white/70 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soil font-display text-cream">
          {index}
        </div>
        {Icon && <Icon className="h-5 w-5 text-clay" />}
      </div>
      <h3 className="font-display text-lg font-semibold text-soil">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}
