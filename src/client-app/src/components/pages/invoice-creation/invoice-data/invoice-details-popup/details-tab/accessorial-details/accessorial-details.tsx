import { useI18nState } from '../../../../../../stores/settings/language-context';
import { IAccessorialDetails } from './accessorial-details.interface';

//Styles
import './accessorial-details.scss';

export default function AccessorialDetails({
  accessorials
}: IAccessorialDetails) {
  const { localeData } = useI18nState();
  return (
    <div className="accessorial_section_main_div">
      <div className="grc-title-small">{localeData.Accessorial}</div>
      <div className="accessorial-container">
        {accessorials?.length
          ? accessorials.map(item => (
              <span key={item.accessorialName} className="grc-value space">
                {item.accessorialName}
              </span>
            ))
          : []}
      </div>
    </div>
  );
}
