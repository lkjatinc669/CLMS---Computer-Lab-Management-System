export default function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
      <div className={`text-white p-4 rounded-full text-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-gray-500 text-sm">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}