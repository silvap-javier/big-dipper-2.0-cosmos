import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { useScreenSize } from '@/hooks';
import NoData from '@/components/no_data';
import { useProviders } from '@/screens/validators/components/list/components/validators/hooks';
import type { ValidatorType, SearchType } from '@/screens/validators/components/list/types';

const Desktop = dynamic(
  () => import('@/screens/validators/components/list/components/validators/components/desktop')
);
const Mobile = dynamic(
  () => import('@/screens/validators/components/list/components/validators/components/mobile')
);

const Validators: FC<{ search: SearchType; items: ValidatorType[] }> = (props) => {
  const { isDesktop } = useScreenSize();
  const { state, handleSort, sortItems, search } = useProviders(props.search);

  const items = sortItems(props.items);

  if (!props.items.length) {
    return <NoData />;
  }

  if (isDesktop) {
    return (
      <Desktop
        sortDirection={state.sortDirection}
        sortKey={state.sortKey}
        handleSort={handleSort}
        items={items}
        search={search}
      />
    );
  }

  return <Mobile items={items} search={search} />;
};

export default Validators;
