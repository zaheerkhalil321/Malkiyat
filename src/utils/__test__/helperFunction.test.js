import { calculateTimeStamp } from "../helperFunction";

describe("calculateTimeStamp", () => {
  it("should handle NaN value", () => {
    const param = "";

    expect(calculateTimeStamp(param)).not.toBeNaN();
  });
});

describe("calculateTimeStamp", () => {
  it("should handle undefined value", () => {
    const param = "";

    expect(calculateTimeStamp(param)).not.toBeUndefined();
  });
});
