import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: 'Sign In', active: step1, link: '/login' },
    { name: 'Shipping', active: step2, link: '/shipping' },
    { name: 'Payment', active: step3, link: '/payment' },
    { name: 'Place Order', active: step4, link: '/placeorder' },
  ];

  return (
    <nav className="flex justify-center items-center space-x-4 md:space-x-8 my-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          {index > 0 && <div className="w-8 h-px bg-slate-600" />}
          <Link
            to={step.active ? step.link : '#'}
            className={cn(
              'text-sm font-medium transition-colors no-underline',
              step.active ? 'text-blue-400 hover:text-blue-300' : 'text-slate-500 pointer-events-none'
            )}
          >
            {step.name}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default CheckoutSteps;