import usePrice from "@lib/use-price";
import isEmpty from "lodash/isEmpty";
import React from "react";

type Props = {
  minPrice: number;
  maxPrice: number;
  selectedVariation?: any;
  basePriceClassName?: string;
  discountPriceClassName?: string;
};

const VariationPrice: React.FC<Props> = ({
  selectedVariation,
  minPrice,
  maxPrice,
  basePriceClassName = "text-heading font-semibold text-base md:text-xl lg:text-2xl",
  discountPriceClassName = "font-segoe text-gray-400 text-base  ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0",
}: any) => {
  const { price, basePrice } = usePrice(
    selectedVariation && {
      amount: selectedVariation.sale_price
        ? Number(selectedVariation.sale_price)
        : Number(selectedVariation.price),
      baseAmount: Number(selectedVariation.price),
    }
  );

  const { price: min_price } = usePrice({
    amount: minPrice,
  });

  const { price: max_price } = usePrice({
    amount: maxPrice,
  });
  return (
    <>
    <div className="flex gap-1 items-center">
      <div className={basePriceClassName}>
        {!isEmpty(selectedVariation)
          ? `${price}`
          : `${min_price} - ${max_price}`}
      </div>

      {basePrice && <del className={discountPriceClassName}>{basePrice}</del>}
      </div>
    </>
  );
};

export default VariationPrice;
