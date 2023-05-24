import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = new Product("123", "Produto Top", 1000);

const input = {
  id: product.id,
  name: "Updated Product",
  price: 500,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn((id: string) =>
      id === product.id ? Promise.resolve(product) : undefined
    ),
    update: jest.fn(),
  };
};

describe("should update a product", () => {
  it("should update a customer", async () => {
    const productRepository = MockRepository();

    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw a error when id is invalid", async () => {
    const productRepository = MockRepository();

    const usecase = new UpdateProductUseCase(productRepository);

    const inputWithWrongId = {
      ...input,
      id: "wrong",
    };

    await expect(usecase.execute(inputWithWrongId)).rejects.toThrow(
      "Product not found"
    );
  });
});
