import { formatTime } from "./utils";

describe("formatTime", () => {
  const getLocalTimeString = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  };

  test("handle hours and minutes correctly", () => {
    expect(formatTime(3600)).toBe(getLocalTimeString(3600));
    expect(formatTime(3665)).toBe(getLocalTimeString(3665));
    expect(formatTime(82800)).toBe(getLocalTimeString(82800));
  });

  test("add 0 when the hour is single digit", () => {
    expect(formatTime(60)).toBe(getLocalTimeString(60));
    expect(formatTime(3660)).toBe(getLocalTimeString(3660));
  });

  test("correctly handle midnight", () => {
    expect(formatTime(0)).toBe(getLocalTimeString(0));
  });

  test("correctly handle morning hours ", () => {
    expect(formatTime(18000)).toBe(getLocalTimeString(18000));
  });
});

