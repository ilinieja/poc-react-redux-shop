import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { EntityId } from "@reduxjs/toolkit";

import {
  productsSelectors,
  selectProductById,
  selectRuleById,
} from "store/selectors";
import { Button } from "shared/Button/Button";

import styles from "./ProductForm.module.css";

export interface FormFields {
  id: EntityId;
  description: string;
  price: number;
  ruleQuantity?: number;
  rulePrice?: number;
}

export interface ProductFormProps {
  productId?: EntityId;
  onSubmit: SubmitHandler<FormFields>;
  onCancel: () => void;
}

export function ProductForm({
  productId = "",
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const product = useSelector(selectProductById(productId));
  const rule = useSelector(selectRuleById(productId));
  const productIds = useSelector(productsSelectors.selectIds);

  const isUniqueProductId = (validatedProductId: EntityId) =>
    validatedProductId === productId ||
    !productIds.includes(validatedProductId);
  const requiredTogetherWith =
    (fieldName: keyof FormFields) => (value: FormFields[keyof FormFields]) => {
      if (!value && getValues(fieldName)) {
        return `Required if ${fieldName} provided`;
      }
      return true;
    };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormFields>();

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label}>Letter</label>
        <div className={styles.input}>
          <input
            className={styles.largeFont}
            defaultValue={product?.id}
            {...register("id", {
              required: true,
              maxLength: 1,
              validate: isUniqueProductId,
            })}
            aria-invalid={errors.id ? "true" : "false"}
          />
          {errors.id && (
            <div className={styles.error}>
              {errors.id?.type === "required" && <span>Required</span>}
              {errors.id?.type === "maxLength" && (
                <span>Only one letter please</span>
              )}
              {errors.id?.type === "validate" && (
                <span>This letter already exists</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description</label>
        <div className={styles.input}>
          <textarea
            defaultValue={product?.description}
            {...register("description", { maxLength: 70 })}
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <div className={styles.error}>
              {errors.description?.type === "maxLength" && (
                <span>Too long, 70 characters max</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Price</label>
        <div className={styles.input}>
          <input
            type="number"
            defaultValue={product?.price}
            {...register("price", { required: true, min: 1, max: 100000 })}
            aria-invalid={errors.price ? "true" : "false"}
          />
          {errors.price && (
            <div className={styles.error}>
              {errors.price?.type === "required" && <span>Required</span>}
              {errors.price?.type === "min" && <span>Min price is 1</span>}
              {errors.price?.type === "max" && (
                <span>Keep letters affordable</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Special offer</label>
        <div className={styles.input}>
          <div className={styles.row}>
            <input
              type="number"
              defaultValue={rule?.quantity}
              {...register("ruleQuantity", {
                min: 2,
                max: 100000,
                validate: {
                  required: requiredTogetherWith("rulePrice"),
                },
              })}
              aria-invalid={
                errors.ruleQuantity || errors.rulePrice ? "true" : "false"
              }
            />
            <span className={styles.note}>for</span>
            <input
              type="number"
              defaultValue={rule?.price}
              {...register("rulePrice", {
                min: 1,
                max: 100000,
                validate: {
                  required: requiredTogetherWith("ruleQuantity"),
                },
              })}
              aria-invalid={
                errors.ruleQuantity || errors.rulePrice ? "true" : "false"
              }
            />
          </div>
          {(errors.ruleQuantity || errors.rulePrice) && (
            <div className={styles.error}>
              {errors.ruleQuantity?.type === "min" && (
                <span>Quantity should be 2 or more</span>
              )}
              {errors.ruleQuantity?.type === "max" && (
                <span>Qauntity too big</span>
              )}
              {errors.rulePrice?.type === "min" && (
                <span>Price should be 1 or more</span>
              )}
              {errors.rulePrice?.type === "max" && <span>Price too big</span>}
              {(errors.rulePrice?.type === "required" ||
                errors.ruleQuantity?.type === "required") && (
                <span>Fill both fields or none</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}