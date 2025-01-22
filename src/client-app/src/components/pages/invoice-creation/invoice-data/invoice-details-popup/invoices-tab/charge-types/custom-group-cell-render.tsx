import { useCallback, useEffect } from 'react';

export const CustomGroupCellRenderer: React.FC<{
  params: any;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}> = ({ params, isExpanded, setIsExpanded }) => {
  const handleIconClick = useCallback(() => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    params.node.setExpanded(newExpandedState);
  }, [isExpanded, params.node, setIsExpanded]);

  var iconClassName = 'cursor-p ';

  iconClassName += params.node.expanded
    ? 'ag-icon ag-icon-tree-open'
    : 'ag-icon ag-icon-tree-closed';

  useEffect(() => {
    setIsExpanded(params.node.expanded);
  }, [params.node.expanded, setIsExpanded]);

  return (
    <div className="custom-group-cell-renderer">
      <span>{params.value}</span>
      {params.value === 'Accessorial' && (
        <span className={iconClassName} onClick={handleIconClick}></span>
      )}
    </div>
  );
};
