import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { Modal } from "shared/Modal/Modal";
import { productUpdated } from "store/products.slice";
import { ruleRemoved, ruleUpdated } from "store/rules.slice";
import { FormFields, ProductForm } from "../ProductForm/ProductForm";

import styles from "./ProductEditModal.module.css";

export function ProductEditModal() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const goBack = () => navigate("../");

  const handleSubmit = ({
    id,
    description,
    price,
    rulePrice,
    ruleQuantity,
  }: FormFields) => {
    dispatch(productUpdated({ id, changes: { id, description, price } }));

    if (rulePrice && ruleQuantity) {
      dispatch(
        ruleUpdated({ productId: id, quantity: ruleQuantity, price: rulePrice })
      );
    } else {
      dispatch(ruleRemoved(id));
    }

    goBack();
  };

  return (
    <Modal onClose={goBack}>
      <div className={styles.container}>
        <ProductForm
          productId={productId}
          onSubmit={handleSubmit}
          onCancel={goBack}
        />
      </div>
    </Modal>
  );
}
