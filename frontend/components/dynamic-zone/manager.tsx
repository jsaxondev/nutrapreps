import React from 'react';
import dynamic from 'next/dynamic';

interface DynamicZoneComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

interface Props {
  dynamicZone: DynamicZoneComponent[];
  locale: string;
}

const componentMapping: { [key: string]: any } = {
    'dynamic-zone.hero': dynamic(() => import('./hero').then(mod => mod.Hero), {  }),
    'dynamic-zone.how-it-works': dynamic(() => import('./how-it-works').then(mod => mod.HowItWorks), { }),
    'dynamic-zone.explore-our-menu': dynamic(() => import('./explore-our-menu').then(mod => mod.ExploreOurMenu), { }),
    'dynamic-zone.pricing': dynamic(() => import('./pricing').then(mod => mod.Pricing), { }),
    'dynamic-zone.faq': dynamic(() => import('./faq').then(mod => mod.FAQ), { }),
}

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone, locale }) => {
  return (
    <div>
      {
        dynamicZone.map((componentData) => {
          const Component = componentMapping[componentData.__component];
          if (!Component) {
            console.warn(`No component found for: ${componentData.__component}`);
            return null;
          }
          return <Component key={componentData.id} {...componentData} />;
        })}
    </div>
  );
};

export default DynamicZoneManager;