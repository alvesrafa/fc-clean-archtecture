import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.productRepository = repository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = new Product(uuid(), input.name, input.price);

    product.validate();
    console.log("Vai tentar usecase", product);
    await this.productRepository.create(product);
    console.log("Vai retornar", {
      id: product.id,
      name: product.name,
      price: product.price,
    });
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
