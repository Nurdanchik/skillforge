import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        'Access to basic projects',
        'Community support',
        'Basic project validation',
        'Public profile'
      ],
      cta: 'Get started',
      highlighted: false
    },
    {
      name: 'Premium',
      price: '29',
      description: 'Best for serious learners',
      features: [
        'All Free features',
        'Expert code review',
        'Priority support',
        'Premium projects',
        'Private mentoring',
        'Certificate of completion'
      ],
      cta: 'Start Premium',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and companies',
      features: [
        'All Premium features',
        'Custom projects',
        'Team management',
        'API access',
        'Custom integrations',
        'Dedicated support'
      ],
      cta: 'Contact us',
      highlighted: false
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Choose the perfect plan for your development journey
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.highlighted
                  ? 'border-2 border-indigo-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6 bg-white rounded-t-lg">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-base font-medium text-gray-500">/month</span>}
                </p>
                <button
                  className={`mt-8 block w-full rounded-md px-4 py-2 text-sm font-semibold text-center ${
                    plan.highlighted
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8 bg-white rounded-b-lg">
                <h3 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Can I switch plans later?</h3>
              <p className="mt-2 text-gray-500">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-500">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Do you offer refunds?</h3>
              <p className="mt-2 text-gray-500">
                Yes, we offer a 30-day money-back guarantee for all paid plans.
              </p> </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Is there a contract or commitment?</h3>
              <p className="mt-2 text-gray-500">
                No, all plans are month-to-month with no long-term commitment required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;