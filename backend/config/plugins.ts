export default ({env}) => ({
    email: {
        config: {
          provider: 'sendgrid',
          providerOptions: {
            apiKey: env('SENDGRID_API_KEY'),
          },
          settings: {
            defaultFrom: "website@nutrapreps.co.uk",
            defaultReplyTo: "website@nutrapreps.co.uk",
          },
        },
      },
});
