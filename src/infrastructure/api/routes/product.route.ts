import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);
    console.log("output", output);
    res.send(output);
  } catch (err) {
    console.log("err", err);
    res.status(500).send(err);
  }
});
