import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductsUseCase } from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductPresenter from "../presenters/product.presenter";

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
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  try {
    const productRepository = new ProductRepository();
    const usecase = new ListProductsUseCase(productRepository);

    const output = await usecase.execute();

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(ProductPresenter.listXML(output)),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
