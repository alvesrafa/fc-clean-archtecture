import Product from "../../../domain/product/entity/product";
import { ListProductsUseCase } from "./list.product.usecase";

const product1 = new Product("1", "Product 1", 10);
const product2 = new Product("2", "Product 2", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find all products use case", () => {
  it("should list all products", async () => {
    const productRepository = MockRepository();

    const usecase = new ListProductsUseCase(productRepository);

    const result = await usecase.execute();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
  });
});
