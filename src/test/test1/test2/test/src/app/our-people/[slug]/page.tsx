import { notFound } from 'next/navigation';

import { cms } from '~/cms';
import { BackNav } from '~/components/pages/people/BackNav';
import { PersonBio } from '~/components/pages/people/PersonBio';
import { PersonHeader } from '~/components/pages/people/PersonHeader';
import { getFirstItemInCollectionPossiblyUndefined } from '~/utils';

const getPersonData = async (slug: string) => {
  const response = await cms().getPersonBySlug({ ...cms().defaultVariables, slug });
  const data = getFirstItemInCollectionPossiblyUndefined(response.personCollection);

  return {
    person: data,
  };
};

interface PersonProps {
  params: { slug: string };
}

const Person = async (props: PersonProps) => {
  const { person } = await getPersonData(props.params.slug);
  if (!person) {
    notFound();
  }

  return (
    <div data-accent-color="exo-fluro" data-background-color="light-light-gray">
      <BackNav />
      <PersonHeader
        title={person.title}
        name={person.name}
        headshot={person.headshot}
        accentColor={person.accentColor}
      />
      <PersonBio bioCollection={person.bioCollection} />
    </div>
  );
};

export default Person;
