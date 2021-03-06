import React, { useState, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { Popover } from '@blueprintjs/core';
import Moon from './Moon';
import Bands from './Bands';
import Info from './Info';
import './CalendarItem.scss';

export default React.memo(function CalendarItem({ day, classNames, moonPhase, info, bands }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const handleClick = useCallback(() => setIsInfoOpen(!isInfoOpen), [isInfoOpen]);
  const handleCloseInfo = useCallback(() => setIsInfoOpen(false), []);

  const popoverContent = useMemo(() => isInfoOpen && <Info {...info} />, [info, isInfoOpen]);

  const itemContent = useMemo(
    () => (
      <div
        className={classnames(
          'CalendarItem',
          moment(day).isSame(moment(), 'day') && 'current',
          classNames,
          isInfoOpen && 'selected'
        )}
        onClick={handleClick}
      >
        <header>
          <div className="day">
            <div className="day-number">{moment(day).format('D')}</div>
            <div className="day-name">{moment(day).format('ddd')}</div>
          </div>
          <div className="moon-container">
            <Moon phase={moonPhase} />
          </div>
        </header>

        <main>
          <Bands {...bands} />
        </main>
      </div>
    ),
    [day, bands, isInfoOpen, classNames, moonPhase, handleClick]
  );

  return isInfoOpen ? (
    <Popover
      isOpen={isInfoOpen}
      onClose={handleCloseInfo}
      hasBackdrop
      targetClassName="target-container"
      popoverClassName={classnames(null, 'popover')}
      content={popoverContent}
    >
      {itemContent}
    </Popover>
  ) : (
    itemContent
  );
});
