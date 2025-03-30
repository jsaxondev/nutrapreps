import type { Schema, Struct } from '@strapi/strapi';

export interface DynamicZoneExploreOurMenu extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_explore_our_menus';
  info: {
    displayName: 'Explore_Our_Menu';
  };
  attributes: {
    heading: Schema.Attribute.String;
    meals: Schema.Attribute.Relation<'oneToMany', 'api::meal.meal'>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneFaq extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneHero extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    CTAs: Schema.Attribute.Component<'shared.button', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZoneHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_how_it_works';
  info: {
    displayName: 'How_It_Works';
  };
  attributes: {
    heading: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.steps', true>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface DynamicZonePricing extends Struct.ComponentSchema {
  collectionName: 'components_dynamic_zone_pricings';
  info: {
    displayName: 'Pricing';
  };
  attributes: {
    heading: Schema.Attribute.String;
    plans: Schema.Attribute.Relation<'oneToMany', 'api::plan.plan'>;
    sub_heading: Schema.Attribute.String;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    built_with: Schema.Attribute.String;
    copyright: Schema.Attribute.String;
    description: Schema.Attribute.String;
    designed_developed_by: Schema.Attribute.String;
    internal_links: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>;
    policy_links: Schema.Attribute.Component<'shared.link', true>;
    social_media_links: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface GlobalNavbar extends Struct.ComponentSchema {
  collectionName: 'components_global_navbars';
  info: {
    description: '';
    displayName: 'Navbar';
  };
  attributes: {
    left_navbar_items: Schema.Attribute.Component<'shared.link', true>;
    logo: Schema.Attribute.Relation<'oneToOne', 'api::logo.logo'>;
    right_navbar_items: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['simple', 'outline', 'primary', 'muted']
    >;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    target: Schema.Attribute.Enumeration<
      ['_blank', '_self', '_parent', '_top']
    >;
    text: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedPerks extends Struct.ComponentSchema {
  collectionName: 'components_shared_perks';
  info: {
    displayName: 'Perks';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSteps extends Struct.ComponentSchema {
  collectionName: 'components_shared_steps';
  info: {
    displayName: 'Steps';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'dynamic-zone.explore-our-menu': DynamicZoneExploreOurMenu;
      'dynamic-zone.faq': DynamicZoneFaq;
      'dynamic-zone.hero': DynamicZoneHero;
      'dynamic-zone.how-it-works': DynamicZoneHowItWorks;
      'dynamic-zone.pricing': DynamicZonePricing;
      'global.footer': GlobalFooter;
      'global.navbar': GlobalNavbar;
      'shared.button': SharedButton;
      'shared.link': SharedLink;
      'shared.perks': SharedPerks;
      'shared.seo': SharedSeo;
      'shared.steps': SharedSteps;
    }
  }
}
