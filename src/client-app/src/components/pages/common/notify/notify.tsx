import { GrcNotify, NotifyType } from '@grc/ui-package';

export const notify = (message: string, status: string) => {
  GrcNotify({ message, status: NotifyType.Error });
};
