import React, { ReactNode } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

type Props = {
  height?: number;
  width?: number;
  children?: ReactNode;
} & PopoverPrimitive.PopoverProps;

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef(
  ({ children, ...props }: Props, forwardedRef: Ref<HTMLDivElement> | undefined) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content sideOffset={5} {...props} ref={forwardedRef}>
        {children}
        <PopoverPrimitive.Arrow />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
