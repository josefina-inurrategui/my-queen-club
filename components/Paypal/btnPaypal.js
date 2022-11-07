import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const BtnPaypal = ({ price }) => {

    return (

        <div style={{ width: '100px' }}>

            <PayPalScriptProvider options={{ "client-id": "AYVsVNedt0Gob0G8hUy2PSybF-wJQ8kG-M268vTerpNXa6qSDmHQxWofBgf1K1XthpyeB1Fncs5unbm0" }}>

                <PayPalButtons

                    createOrder={async () => {
                        try {
                            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/purchase/paypal`, {
                                amounts: 150
                            })
                            return res.data.id;
                        }
                        catch (err) {
                            alert("OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES")
                            console.log(err)
                        }
                    }}

                    onCancel={data => console.log("compra cancelada")}

                    onApprove={async (data, actions) => {
                        /*  actions.order.capture();
                         console.log('compra extiosa')
                         console.log(data);
                          */
                        /* MANDAMOS LA DATA DE LA COMPRA  AL BACK */
                        // return actions.order.capture().then((details) => {
                              
                        //     const name = details.payer.name.given_name;
                        //     console.log(`Transaction completed by ${name}`);
                        //     console.log(data)

                        // })
                        try {
                            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_BASE}/purchase/paypalIpn`,{
                                userName : 'fabri' ,
                                gallerieName : 'black ' ,
                                queen : 'ju lazarte' ,
                                price : 150 ,
                            }).then( res =>{
                                if(res.status === 201){
                                    // redirect                                    
                                }
                            }
                            )
                        } catch (error) {                        
                            alert("OCURRIO UN ERROR INTENTELO NUEVAMENTE EN UNOS INSTANTES")
                            console.log(err)                           
                        }


                    }}
                    onError={err=>console.log('error al realizar la transaccion')}

                    style={{ layout: "horizontal", color: 'silver', height: 45, tagline: false }} />
            </PayPalScriptProvider>

        </div>
    );
}

export default BtnPaypal;