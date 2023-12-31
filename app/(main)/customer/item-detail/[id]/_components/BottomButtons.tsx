'use client';

import PrimaryButton from '@/app/_components/PrimaryButton/PrimaryButton';
import { useRouter } from 'next/navigation';
import pageRoute from '@/app/_constants/path';
import PopUp from '@/app/_components/pop-up/PopUp';
import { useUserInfo } from '@/app/_providers/UserInfoProvider';
import { useState } from 'react';
import CustomPopUp from '@/app/_components/pop-up/CustomPopUp';
import { usePostCart } from '@/app/_hooks/query/cart';
import { useQueryClient } from '@tanstack/react-query';

type ItemIdType = {
  itemId: string;
};

const BottomButtons = ({ itemId }: ItemIdType) => {
  const [customOpen, setCustomOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const queryClient = useQueryClient();

  const { providerId } = useUserInfo();
  const { mutate: postCart } = usePostCart();

  const putCart = async () => {
    postCart(
      {
        itemId: Number(itemId),
        cartAdditionType: 'check',
      },
      {
        onSuccess: async res => {
          if (res.status !== 200) {
            if (res.data.code === 'CT003' || res.data.code === 'CT005') {
              setClearOpen(true);
              setMessage(res.data.message);
            } else if (res.data.code === 'CT007' || res.data.code === 'CT008') {
              setDeleteOpen(true);
              setMessage(res.data.message);
            } else if (res.data.code === 'AUTH006') {
              setMessage('로그인이 필요합니다.');
              setCustomOpen(true);
            } else {
              setCustomOpen(true);
              setMessage(res.data.message);
            }
          } else {
            setMessage('해당 상품이 장바구니에 담겼습니다.');
            setCustomOpen(true);
          }
          await queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
      }
    );
  };

  const clearCart = async () => {
    postCart(
      {
        itemId: Number(itemId),
        cartAdditionType: 'clear',
      },
      {
        onSuccess: async () => {
          setMessage('해당 상품이 장바구니에 담겼습니다.');
          setCustomOpen(true);
          await queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
      }
    );
  };

  const orderCart = async () => {
    postCart(
      {
        itemId: Number(itemId),
        cartAdditionType: 'check',
      },
      {
        onSuccess: async res => {
          if (res.status !== 200) {
            if (res.data.code === 'CT003' || res.data.code === 'CT005') {
              setClearOpen(true);
              setMessage(res.data.message);
            } else if (res.data.code === 'CT007' || res.data.code === 'CT008') {
              setDeleteOpen(true);
              setMessage(res.data.message);
            } else if (res.data.code === 'AUTH006') {
              setCustomOpen(true);
              setMessage('로그인이 필요합니다.');
            } else {
              setCustomOpen(true);
              setMessage(res.data.message);
            }
          } else {
            await queryClient
              .invalidateQueries({ queryKey: ['cart'] })
              .then(() => {
                router.push(
                  providerId ? pageRoute.customer.cart(String(providerId)) : '/'
                );
              });
          }
        },
      }
    );
  };

  return (
    <div className="flex w-full gap-5 pb-24">
      <PrimaryButton onClick={putCart}>장바구니 담기</PrimaryButton>
      <PrimaryButton onClick={orderCart}>주문하기</PrimaryButton>
      {customOpen && (
        <CustomPopUp
          mainText={message}
          btnText="확인"
          btnClick={() => setCustomOpen(false)}
        />
      )}
      {clearOpen && (
        <PopUp
          mainText={message}
          subText="선택하신 상품을 장바구니에 담을 경우 이전에 담은 상품이 모두 삭제됩니다."
          leftBtnText="취소"
          leftBtnClick={() => setClearOpen(false)}
          rightBtnText="담기"
          rightBtnClick={() => {
            clearCart();
            setClearOpen(false);
          }}
        />
      )}
      {deleteOpen && (
        <PopUp
          mainText={message}
          subText="안내한 일부 상품이 장바구니에서 삭제되며, 페이지에 있는 해당 상품은 장바구니에 담을 수 있습니다."
          leftBtnText="취소"
          leftBtnClick={() => setDeleteOpen(false)}
          rightBtnText="담기"
          rightBtnClick={() => {
            clearCart();
            setDeleteOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BottomButtons;
