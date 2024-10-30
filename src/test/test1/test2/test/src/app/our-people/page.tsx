import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { cms } from '~/cms';
import { PeopleHero } from '~/components/pages/people/PeopleHero';
import { TeamGrid } from '~/components/pages/people/TeamGrid';
import { ModularSections } from '~/components/sections';
import { Outro } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getData = async () => {
  const response = await cms().people(cms().defaultVariables);
  const data = getFirstItemInCollection(response.ourPeopleCollection);
  return {
    ...response,
    ourPeopleCollection: undefined,
    ...data,
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return formatPageMeta(data?.meta);
}

const PeoplePage = async () => {
  const data = await getData();

  return (
    <div data-accent-color="exo-fluro">
      <PeopleHero heading={data.heading} heroQuote={data.heroQuote} />
      <TeamGrid teamAndQuotesCollection={data.teamAndQuotesCollection} />
      <ModularSections
        articleCollection={data.articleCollection}
        {...data.modularSectionsTopCollection}
      />
      <ModularSections
        articleCollection={data.articleCollection}
        {...data.modularSectionsBottomCollection}
      />
      <Outro {...data.outro} />
    </div>
  );
};

export default PeoplePage;
