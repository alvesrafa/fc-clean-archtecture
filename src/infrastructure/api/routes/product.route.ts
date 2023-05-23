import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductsUseCase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productRepository = new ProductRepository();
  const usecase = new CreateProductUseCase(productRepository);
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);

    res.send(output);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const productRepository = new ProductRepository();
    const usecase = new ListProductsUseCase(productRepository);

    const output = await usecase.execute();
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});
