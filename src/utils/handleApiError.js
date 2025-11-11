import { toast } from "sonner";

export const handleApiError = (error) => {
  const data = error.response?.data;

  const toastStyle = {
    backgroundColor: "#171717",
    color: "white",
    border: "1px solid #333",
    whiteSpace: "pre-line",
  };

  if (Array.isArray(data?.errors)) {
    toast.error("Validation issues", {
      description: data.errors.join("\n"),
      style: toastStyle,
    });
  } else if (data?.message) {
    toast.error(data.message, { style: toastStyle });
  } else {
    toast.error("Something went wrong! Please try again.", {
      style: toastStyle,
    });
  }
};
