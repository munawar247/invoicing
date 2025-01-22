import { EmptySearchIcon } from '../../../common/icons/empty-search-icon';
import { IProps } from './empty-search.interface';

export default function EmptySearch({ message }: IProps) {
  return (
    <>
      <div className="grc-empty-state-img">
        <EmptySearchIcon />
      </div>
      <div className="grc-empty-state-text my-2">{message}</div>
    </>
  );
}
