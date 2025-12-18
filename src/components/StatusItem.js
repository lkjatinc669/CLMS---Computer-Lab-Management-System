export default function StatusItem({
  icon: Icon,
  label,
  status,
  availability,
}) {
  const isWorking = status === "Working";
  const isAvailable = availability == "Available"; 

  return (
    <div className={`flex items-center gap-3 ${isWorking ? "text-green-600" : "text-red-600"}`}>
      <Icon className={`text-3xl ${isWorking ? "text-green-600" : "text-red-600"}`} />
      <div className="text-sm">
        <div className="font-semibold">{label}</div>
        { isAvailable && (
          <div className="overflow-hidden whitespace-nowrap text-ellipsis">{status}</div>
        )}
        {!isAvailable &&(
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">{availability}</div>
          )}
      </div>
    </div>
  );
}
