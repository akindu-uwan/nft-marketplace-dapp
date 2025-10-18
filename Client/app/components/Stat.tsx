interface StatProps {
  label: string;
  value: string;
}

const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col items-start">
    <span className="text-zinc-400 text-xs tracking-wider uppercase">{label}</span>
    <span className="text-zinc-100 text-2xl font-semibold">{value}</span>
  </div>
);

export default Stat;