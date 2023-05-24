import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Top Product",
  price: 100.5,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a new product", async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);
    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw a error when name is missing", async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const inputFake = {
      ...input,
      name: "",
    };

    await expect(createProductUseCase.execute(inputFake)).rejects.toThrow(
      "product: Name is required"
    );
  });

  it("should throw a error when price is lower then zero", async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const inputFake = {
      ...input,
      price: -1,
    };

    await expect(createProductUseCase.execute(inputFake)).rejects.toThrow(
      "product: Price must be greater than zero"
    );
  });
});
