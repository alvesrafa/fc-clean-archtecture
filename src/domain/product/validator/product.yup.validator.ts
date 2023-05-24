import * as Yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
export default class ProductYupValidator
  implements ValidatorInterface<Product>
{
  validate(entity: Product): void {
    try {
      Yup.object()
        .shape({
          id: Yup.string().required("Id is required"),
          name: Yup.string().required("Name is required"),
          price: Yup.number().min(0, "Price must be greater than zero"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            // Para não abortar assim q receber o primeiro, somente quando todos as propriedades forem checadas.
            abortEarly: false,
          }
        );
    } catch (error) {
      const errors = error as Yup.ValidationError;
      errors.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
