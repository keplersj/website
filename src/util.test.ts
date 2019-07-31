import { getDescription } from "./util";

describe("getDescription", (): void => {
  it("returns an empty string when neither description is provided", (): void => {
    const description = getDescription(undefined, undefined);
    expect(description).toEqual("");
  });

  it("returns the generated description if it is provided", (): void => {
    const description = getDescription("This is generated", undefined);
    expect(description).toEqual("This is generated");
  });

  it("returns the user-provided description if it is provided", (): void => {
    const description = getDescription("This is generated", "This is provided");
    expect(description).toEqual("This is provided");
  });
});
