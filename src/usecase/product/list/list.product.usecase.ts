import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductsUseCase {
  productRepository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.productRepository = repository;
  }

  async execute(input?: InputListProductDto) {
    const result = await this.productRepository.findAll();

    return OutputMapper.productsToOutput(result);
  }
}

class OutputMapper {
  static productsToOutput(products: Product[]): OutputListProductDto {
    const output = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));

    return {
      products: output,
    };
  }
}
