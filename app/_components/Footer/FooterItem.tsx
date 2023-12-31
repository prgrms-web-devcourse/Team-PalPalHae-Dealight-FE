import Link from 'next/link';
import Order from './assets/order.svg';
import Home from './assets/home.svg';
import MyPage from './assets/mypage.svg';

type FooterItemPropType = {
  icon: string;
  labelName: string;
  to: string;
};

const FooterItem = ({ icon, labelName, to }: FooterItemPropType) => {
  return (
    <Link href={to} scroll={false}>
      <div className="flex flex-col items-center justify-center text-dark-gray">
        {icon === 'Order' ? (
          <Order className="h-6 w-6" />
        ) : icon === 'Home' ? (
          <Home className="h-6 w-6" />
        ) : icon === 'MyPage' ? (
          <MyPage className="h-6 w-6" />
        ) : null}
        <label className="cursor-pointer text-xs">{labelName}</label>
      </div>
    </Link>
  );
};

export default FooterItem;
