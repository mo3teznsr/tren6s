import { Table } from '@components/ui/table';
import usePrice from '@lib/use-price';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@lib/locals';
import React, { useMemo } from 'react';
import { Image } from '@components/ui/image';
import { productPlaceholder } from '@lib/placeholders';
import Link from '@components/ui/link';
import { ROUTES } from '@lib/routes';
import Modal from '@components/common/modal/modal';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/button';
import TextArea from '@components/ui/text-area';
import ReactStars from 'react-rating-stars-component';
import FileInput from '@components/ui/file-input';
import { useMutation } from 'react-query';
import client from '@framework/utils/index'
import { HttpClient } from '@framework/utils/request';
import { API_ENDPOINTS } from '@framework/utils/endpoints';
const OrderItemList = (_: any, record: any) => {
  const { price } = usePrice({
    amount: record.pivot?.unit_price,
  });
  let name = record.name;
  if (record?.pivot?.variation_option_id) {
    const variationTitle = record?.variation_options?.find(
      (vo: any) => vo?.id === record?.pivot?.variation_option_id
    )['title'];
    name = `${name} - ${variationTitle}`;
  }
  return (
    <div className="flex items-center">
      <div className="relative flex flex-shrink-0 w-16 h-16 overflow-hidden rounded">
        <Image
          src={record.image?.thumbnail ?? productPlaceholder}
          alt={name}
          className="object-cover w-full h-full bg-gray-200"
          fill
        />
      </div>

      <div className="flex flex-col overflow-hidden ltr:ml-4 rtl:mr-4">
        <div className="flex mb-2 text-body">
          <Link
            href={`${ROUTES.PRODUCT}/${record?.slug}`}
            className="text-[15px] truncate inline-block overflow-hidden hover:underline"
          >
            {name}
          </Link>
          &nbsp;x&nbsp;
          <span className="text-[15px] text-heading font-semibold truncate inline-block overflow-hidden">
            {record.unit}
          </span>
        </div>
        <span className="text-[15px] text-accent font-semibold mb-1 truncate inline-block overflow-hidden">
          {price}
        </span>
      </div>
    </div>
  );
};
export const OrderItems = ({ products }: { products: any }) => {
  const { t } = useTranslation('common');
  const { alignLeft, alignRight } = useIsRTL();
  const [reviewProduct, setReviewProduct] = React.useState<any>(null);
  const [showReviewModal, setShowReviewModal] = React.useState<boolean>(false);

  const toggleReviewModal = (product: any) => {
    setReviewProduct(product);
    setShowReviewModal(!showReviewModal);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();
  function onSubmit() {
   
    const review={comment,rating,...reviewProduct.pivot,shop_id:reviewProduct.shop_id}
    HttpClient.post(`${API_ENDPOINTS.REVIEWS}`,review).then((res)=>{

    }).catch(e=>console.log("err",e,e.response?.data))
    setShowReviewModal(false);
    // console.log(values, "review");
  }
  const [rating,setRating]=React.useState<any>(null)
  const [comment,setComment]=React.useState<string>("")
  
  const ratingChanged = (newRating: any) => {
    // console.log(newRating);
  };

  const orderTableColumns = useMemo(
    () => [
      {
        title: (
          <span className="ltr:pl-20 rtl:pr-20 ltr:ml-2 rtl:mr-2">
            {t('text-product')}
          </span>
        ),
        dataIndex: '',
        key: 'items',
        align: alignLeft,
        width: 250,
        ellipsis: true,
        render: OrderItemList,
      },
      {
        title: t('text-quantity'),
        dataIndex: 'pivot',
        key: 'pivot',
        align: 'center',
        width: 100,
        render: function renderQuantity(pivot: any) {
          return (
            <p className="text-[15px] md:text-base font-semibold text-heading">
              {pivot.order_quantity}
            </p>
          );
        },
      },
      {
        title: t('text-price'),
        dataIndex: 'pivot',
        key: 'price',
        align: 'center',
        width: 100,
        render: function RenderPrice(pivot: any) {
          const { price } = usePrice({
            amount: pivot.subtotal,
          });
          return (
            <p className="text-[15px] md:text-base font-semibold text-heading">
              {price}
            </p>
          );
        },
      },
      {
        title: t('text-review'),
        width: 100,
        render:(_:any, record:any)=>{
          return <div className="flex justify-center items-center">
            <span onClick={()=>toggleReviewModal(record)} className="text-[15px] md:text-base font-semibold text-heading underline">
              {t('text-write-a-review')}
            </span>
          </div>
        }
      }
    ],
    [alignLeft, alignRight, t]
  );

  console.log("products", products)

  return (<>
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products}
      rowKey={(record: any) =>
        record.pivot?.variation_option_id
          ? record.pivot.variation_option_id
          : record.created_at
      }
      className="w-full orderDetailsTable"
      scroll={{ x: 350, y: 500 }}
    />
    <Modal open={showReviewModal} onClose={() => setShowReviewModal(false)}>
      <div className="bg-white min-w-[600px] p-4 flex  flex-col gap-4">
        <h3 className='text-center font-semibold pb-4 border-b border-gray-300'>{t('text-write-a-review')}</h3>
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full  mx-auto flex  flex-col justify-center mt-6 lg:mt-8"
      
    >
      <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
        <div className="pb-1.5">
          <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
            {t('forms:label-your-rating')}
          </label>
          <ReactStars
            count={5}
            size={20}
            onChange={setRating}
            required
            color="#c6c6c6"
            activeColor="#facc15"
          />
        </div>
        <TextArea
          labelKey="forms:label-message-star"
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          required
        />
        
        <div className="mb-8">
            <FileInput control={control} multiple={true}  {...register("photos")} />
          </div>

        <div className="pt-1">
          <Button
          disabled={!rating||!comment}
          onClick={onSubmit}
            type="button"
            className="h-12 md:mt-1 text-sm lg:text-base w-full sm:w-auto"
          >
            {t('common:button-submit')}
          </Button>
        </div>
      </div>
    </form>
      </div>
    </Modal>
    </>
  );
};
