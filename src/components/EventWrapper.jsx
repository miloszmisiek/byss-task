import React, { useRef, useEffect } from 'react';

function useOutsideAlerter(
  ref,
  selected,
  setSelected,
  setShowPopover,
  showPopover,
  edit,
  deleteRef
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (selected.length && ref.current && !event.target.classList.contains('events')) {
        if (!showPopover && edit === null) {
          setSelected([]);
        }
        if (
          event.target.parentNode?.id !== 'popover-basic' &&
          event.target.parentNode?.parentNode.id !== 'popover-basic' &&
          event.target !== deleteRef.current?.children[0]
        ) {
          setShowPopover(false);
        }
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, selected, showPopover, edit]);
}

export default function EventWrapper(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    props.selected,
    props.setSelected,
    props.setShowPopover,
    props.showPopover,
    props.edit,
    props.deleteRef,
  );

  return <div ref={wrapperRef}>{props.children}</div>;
}
