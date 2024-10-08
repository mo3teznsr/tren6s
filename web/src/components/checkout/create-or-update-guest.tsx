
import { AddressType } from '@framework/utils/constants';
import { useTranslation } from 'next-i18next';
import { useAtom } from 'jotai';
import { useUI } from '@contexts/ui.context';
import { AddressForm } from '@components/address/address-form';

//FIXME: should be in types file
type FormValues = {
  title: string;
  type: AddressType;
  address: {
    country: string;
    city: string;
    state: string;
    zip: string;
    street_address: string;
  };
};

const CreateOrUpdateGuestAddressForm = () => {
  const { t } = useTranslation('common');
  const {
    closeModal,
    modalData: { atom, address, type },
  } = useUI();
  const [selectedAddress, setAddress] = useAtom(atom);

  function onSubmit(values: FormValues) {
    console.log("values", values)
    const formattedInput = {
      title: values.title??"Home",
      type: values.type,
      address: values.address,
    };
    setAddress(formattedInput);
    closeModal();
  }

  return (
    <div className="min-h-screen p-5 bg-white sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-lg font-semibold text-center text-heading sm:mb-6">
        {t('text-add-new')} {t('text-address')}
      </h1>
      <AddressForm
        onSubmit={onSubmit}
        defaultValues={{
          title: address?.title ?? 'Home',
          type: address?.type ?? type,
          address: {
            ...address?.address,
            country: "UAE",
          },
        }}
      />
    </div>
  );
};

export default CreateOrUpdateGuestAddressForm;
