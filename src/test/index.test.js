const { convertDMStoDD, convertDDtoDMS } = require("../utils/convert");

describe("Coordinate Conversion Functions", () => {
  test("convertDMStoDD should convert DMS to DD correctly", () => {
    const dmsCoordinates = {
      latitude: "12°34'56.78\"N",
      longitude: "98°76'54.32\"E",
    };
    const expectedDD = {
      latitude: "12.58244",
      longitude: "99.28176",
    };

    expect(convertDMStoDD(dmsCoordinates)).toEqual(expectedDD);
  });

  test("convertDDtoDMS should convert DD to DMS correctly", () => {
    const ddCoordinates = {
      latitude: 12.58244,
      longitude: 99.28176,
    };
    const expectedDMS = {
      latitude: "12°34'56.78\"N",
      longitude: "99°16'54.34\"E",
    };

    expect(convertDDtoDMS(ddCoordinates)).toEqual(expectedDMS);
  });
});
