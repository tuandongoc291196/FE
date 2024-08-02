export const truncatedText = (text: string) => {
    return text.length > 30 ? `${text.slice(0, 30)}...` : text;
  };

export const getLabel = (value: number): string => {
    if (value >= 0 && value < 1) {
      return "Kém";
    } else if (value >= 1 && value < 2) {
      return "Trung bình";
    } else if (value >= 2 && value < 3) {
      return "Ok";
    } else if (value >= 3 && value < 4) {
      return "Tốt";
    } else if (value >= 4 && value <= 5) {
      return "Tuyệt vời";
    } else {
      return "";
    }
  };