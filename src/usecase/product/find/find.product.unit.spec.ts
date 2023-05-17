import Product from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("idmaluco", "Produto", 100.4);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case.", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();

    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "idmaluco",
    };
    const output = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("shouldn't find a product when the id is wrong", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "iderrado",
    };

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
