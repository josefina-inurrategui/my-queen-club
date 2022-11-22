import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { useRouter } from 'next/router';
const BtnPaypal = ({ price , queen , galleryName }) => {
    const router = useRouter();
  return (
        <div style={{ width: '100px' }}>

            <PayPalScriptProvider options={{ 'client-id': 'AYVsVNedt0Gob0G8hUy2PSybF-wJQ8kG-M268vTerpNXa6qSDmHQxWofBgf1K1XthpyeB1Fncs5unbm0' }}>

                <PayPalButtons

                    createOrder={async () => {
                        try {
                            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}purchase/paypal`, {
                                amounts: price
                            })
                            return res.data.id;
                        }
                        catch (err) {
                            alert("OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES")
                            console.log(err)
                        }
                    }}

                    onCancel={data => console.log('compra cancelada')}

                    onApprove={async (data, actions) => {
                        try {
                            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}purchase/paypalIpn`,{
                                galleryName : galleryName ,
                                queen : queen ,
                                price_USD: price ,
                            })
                            if(res.status === 201){
                                    router.push(`/gallery/${galleryName}`)                 
                            }  
                        } catch (error) {                        
                            alert("OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES")
                            router.push(`/gallery/${galleryName}`)                      
                        }
                    }}
                    onError={err => console.log('error al realizar la transaccion')}
                    style={{
                      layout: 'horizontal', color: 'silver', height: 45, tagline: false,
                    }} />
            </PayPalScriptProvider>

        </div>
  );
};

export default BtnPaypal;
