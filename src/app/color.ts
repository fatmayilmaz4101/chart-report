const documentStyle = getComputedStyle(document.documentElement);
export const colors = [
  documentStyle.getPropertyValue("--purple-500"),
  documentStyle.getPropertyValue("--blue-500"),
  documentStyle.getPropertyValue("--green-500"),
  documentStyle.getPropertyValue("--red-500"),
  documentStyle.getPropertyValue("--orange-500"),
  documentStyle.getPropertyValue("--yellow-500"),
];
