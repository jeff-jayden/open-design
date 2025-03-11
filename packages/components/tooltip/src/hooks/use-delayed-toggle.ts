import { useSetTimeout } from '@open-design/components/tooltip/src/utils/use-set-timeout';

export type useDelayedToggleProps = {
  open: (e?: Event) => void;
  close: (e?: Event) => void;
  showAfter?: number;
  hideAfter?: number;
  autoClose?: number;
};

export const useDelayedToggle = ({ open, close }: useDelayedToggleProps) => {
  const { debounce, throttle } = useSetTimeout();
  const onOpen = debounce(open, 0);
  const onClose = debounce(close, 200);

  return {
    onOpen,
    onClose
  };
};
