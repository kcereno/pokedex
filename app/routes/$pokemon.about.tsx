import { useLoaderData } from '@remix-run/react';

import { loader } from './_index';

function AboutSection() {
  const pokemon = useLoaderData<typeof loader>();
  console.log('AboutSection ~ pokemon:', pokemon);
  return <div>AboutSection</div>;
}

export default AboutSection;
