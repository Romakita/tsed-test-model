import {MinLength} from "@tsed/common";
import {validate} from "./validate";

class MyModel {
  @MinLength(3)
  name: string;
}

describe("validate", () => {
  it("should validate a model", async () => {
    const {isValid, data} = validate({
      name: "test"
    }, MyModel);

    expect(isValid).toEqual(true);
    expect(data).toEqual({name: "test"});
  });
  it("should not validate a model", async () => {
    const {isValid, data} = validate({
      name: ""
    }, MyModel);

    expect(isValid).toEqual(false);
    expect(data).toEqual({name: ""});
  });
});
