import type { Meta, StoryObj } from '@storybook/react';
import OrderListDropDown from './OrderListDropDown';

const meta: Meta<typeof OrderListDropDown> = {
  title: 'Components/OrderListDropDown',
  component: OrderListDropDown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OrderListDropDown>;

export const Primary: Story = {
  render: () => (
    <OrderListDropDown toggleMenu={'ALL'} setToggleMenu={() => {}} />
  ),
};
