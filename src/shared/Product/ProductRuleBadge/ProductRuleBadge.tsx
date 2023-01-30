import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectRuleById } from "store/selectors";
import classNames from "classnames";

import styles from "./ProductRuleBadge.module.css";

export interface ProductRuleBadgeProps {
  productId: EntityId;
  className?: string;
}

export function ProductRuleBadge({
  productId,
  className,
}: ProductRuleBadgeProps) {
  const rule = useSelector(selectRuleById(productId));

  return (
    <>
      {rule && (
        <div className={classNames(styles.container, className)}>
          <div className={styles.ribbon}>
            <h4 className={styles.text}>
              {rule.quantity} for {rule.price}
            </h4>
          </div>
        </div>
      )}
    </>
  );
}
