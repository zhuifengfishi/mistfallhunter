type StatChipProps = {
  label: string;
  value: string;
};

export function StatChip({ label, value }: StatChipProps) {
  return (
    <div className="home-stat-chip">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
