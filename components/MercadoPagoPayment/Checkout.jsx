import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';

export default function Checkout() {
  const mercadopago = useMercadopago.v2(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
    locale: 'en-AR',
  });

  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: 'YOUR_PREFERENCE_ID',
        },
        render: {
          container: '.cho-container',
          label: 'Pay',
        },
      });
    }
  }, [mercadopago]);

  return (
    <div>
      <div className='cho-container'/>
    </div>
  );
}
