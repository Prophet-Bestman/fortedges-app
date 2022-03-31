export const statusBg = (status) => {
  if (status === "Pending Confirmation" || status === "Pending")
    return "#E9C46A33";
  else if (status === "Confirmed" || status === "Completed") return "green.100";
  else return "red.100";
};
export const statusColor = (status) => {
  if (status === "Pending Confirmation" || status === "Pending")
    return "#E9C46A";
  else if (status === "Confirmed" || status === "Completed") return "green.400";
  else return "red.400";
};
