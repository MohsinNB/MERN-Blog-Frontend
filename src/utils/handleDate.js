// utils/formatDate.js
export function formatDate(createdAt) {
  const date = new Date(createdAt);
  const today = new Date();

  // remove time parts for accurate day comparison
  const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = d1 - d2;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  // Format as DD/MM/YY
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}
