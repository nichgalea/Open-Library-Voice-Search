import { addN } from "./task1";
import expect from "expect.js";

describe("function :: addN", () => {
  describe("passing `5` as an argument", () => {
    const add5 = addN(5);

    it("should return a function", () => {
      expect(typeof add5).to.be("function");
    });

    it("should return `7` when passing `2` to result function", () => {
      expect(add5(2)).to.be(7);
    });
  });
});
