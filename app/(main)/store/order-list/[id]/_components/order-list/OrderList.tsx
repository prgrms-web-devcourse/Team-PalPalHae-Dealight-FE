'use client';

import notification from '../../../../../../_assets/images/notification.png';
import { useState } from 'react';
import OrderListDropDown from '../order-list-dropdown/OrderListDropDown';
import OrderListModal from '../order-list-modal/OrderListModal';
import Image from 'next/image';
import StoreFooter from '@/app/_components/Footer/StoreFooter';
import ItemList from '../item-list/ItemList';
import Header from '@/app/_components/Header/Header';
import { useGetStoreOrders } from '@/app/_hooks/query/order';
import { useUserInfo } from '@/app/_providers/UserInfoProvider';

export type DropDownTextType =
  | 'ALL'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELED';

const OrderList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState<DropDownTextType>('ALL');
  const { storeId } = useUserInfo();

  const onClickOrderList = () => {
    setIsOpen(prev => !prev);
  };

  const {
    data: orders,
    ref,
    isFetchingNextPage,
  } = useGetStoreOrders({
    storeId,
    status: toggleMenu,
    size: 5,
  });

  return (
    <>
      <Header />

      <div className="px-5">
        <div className="flex h-14 items-center justify-between">
          <div
            className="flex cursor-pointer items-center gap-1"
            onClick={onClickOrderList}
          >
            <label className="cursor-pointer text-xl font-semibold">
              주문 내역
            </label>
            <div className="relative h-4 w-4">
              <Image
                src={notification}
                fill
                sizes="(max-width: 768px) 100vw"
                alt="notification"
              />
            </div>
          </div>

          <div>
            <OrderListDropDown
              toggleMenu={toggleMenu}
              setToggleMenu={setToggleMenu}
            />
          </div>
        </div>

        <ItemList
          orders={orders}
          refNode={ref}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>

      <StoreFooter />
      {isOpen && <OrderListModal onClose={onClickOrderList} />}
    </>
  );
};

export default OrderList;
