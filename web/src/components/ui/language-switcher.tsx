import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { HiOutlineSelector } from "react-icons/hi";
import { languageMenu } from '@lib/locals';
import Cookies from 'js-cookie';
import ListBox from './list-box';
import { WhatsappIcon } from 'react-share';
import { Button, Menu, MenuItem } from '@mui/material';
import { siteSettings } from '@settings/site.settings';

export default function LanguageSwitcher() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { asPath, locale, locales } = router;

  let filterItem = languageMenu?.filter((element) =>
    locales?.includes(element?.id)
  );

  const currentSelectedItem = locale
    ? filterItem?.find((o) => o?.value === locale)!
    : filterItem[2];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    Cookies.set('NEXT_LOCALE', values?.value, { expires: 365 });
    setSelectedItem(values);
    router.push(asPath, undefined, {
      locale: values?.value,
    });
  }
// first param in the url


  const countries=[
    {code:'om',name:"text-oman"},
    {code:"ae",name:"text-uae"},
    {code:"sa",name:"text-saudi-arabia"},
    ]

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };

  return (<div className='flex gap-2 items-center'>
    
    <WhatsappIcon onClick={()=>window.open(`https://wa.me/+971${siteSettings.whatsapp}`)} className='w-8 h-8 flex xl:hidden  rounded-full'/>

    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={`/icons/om.svg`} className='w-6 h-6' alt={`om`} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {countries.map(item=><MenuItem onClick={handleClose}>
        <a className='flex gap-1' href={`/${item.code}`}>
          <img src={`/icons/${item.code}.svg`} className='w-6 h-6' alt={`${item.code}`} />
          <span>{t(item.name)}</span>
        </a>
        </MenuItem>)}
        
      </Menu>
   
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="ms-2 lg:ms-0 relative z-10 xl:w-[140px]">
          <Listbox.Button className="relative flex h-full w-full cursor-pointer items-center rounded text-[13px] font-semibold focus:outline-0 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 xl:h-auto xl:w-full xl:border xl:border-solid xl:border-[#CFD3DA] xl:bg-white xl:py-2 xl:text-sm xl:text-heading xl:ltr:pl-3  xl:ltr:pr-7 xl:rtl:pl-7 xl:rtl:pr-3">
            {/* <span className="relative block h-[38px] w-[38px] overflow-hidden rounded-full xl:hidden">
              <span className="relative top-[3px] block">
                {selectedItem.iconMobile}
              </span>
            </span> */}
            <span className=" items-center truncate xl:flex">
              {/* <span className="text-xl ltr:mr-3 rtl:ml-3">
                {selectedItem.value}
              </span>{' '} */}
              <span className='hidden xl:block'>{t(selectedItem.name)}</span>
              <span className='block xl:hidden'>{t(selectedItem.value)}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0  mx-1 items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2 xl:flex">
              <HiOutlineSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className={`absolute mt-1 max-h-60 w-[130px] overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-0 ltr:right-0 rtl:left-0 xl:w-full`}
            >
              {filterItem?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${active ? 'bg-gray-100 text-amber-900' : 'text-gray-900'}
												relative cursor-pointer select-none py-2 px-3`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      {/* <span className="text-xl">{option.icon}</span> */}
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate ltr:ml-1.5 rtl:mr-1.5`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>

    


    </div>
  );
}
