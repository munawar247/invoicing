import { GrcPopover, GrcPopoverPosition, IconProp } from '@grc/ui-package';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './static-data-icon.scss';

export default function StaticDataIcon() {
  return (
    <>
      <div className="static-row-data-symbol">
        <FontAwesomeIcon
          icon={'fa-light fa-circle-s' as IconProp}
          fontSize={18}
          color="#b32e2e"
          className="cursor-p"
          id="static-row-data-symbol"
        />
      </div>
      <GrcPopover
        id={`static-row-data-symbol`}
        target={`#static-row-data-symbol`}
        container="body"
        className="contact-Popover"
        width={120}
        showEvent="mouseenter"
        hideEvent="mouseleave"
        position={GrcPopoverPosition.Left}
        hideOnOutsideClick={true}
      >
        <div className="static-row-data">{'Static Data'}</div>
      </GrcPopover>
    </>
  );
}
