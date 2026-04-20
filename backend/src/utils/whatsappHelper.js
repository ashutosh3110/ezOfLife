/**
 * WhatsApp Notification Helper
 * This utility handles sending WhatsApp messages to customers.
 * Currently in SIMULATION mode, logging to the backend terminal.
 */

export const sendWalkInWhatsApp = async (phone, orderId) => {
    const message = `This order has been placed through Spinzyt. To track your order, please download the Spinzyt app.`;
    
    console.log('\n' + '='.repeat(80));
    console.log('🚀 [WHATSAPP SIMULATION ENGINE] - NEW WALK-IN ORDER TRIGGERED');
    console.log('='.repeat(80));
    console.log(`📲 TO CUSTOMER : ${phone}`);
    console.log(`🆔 ORDER ID    : ${orderId}`);
    console.log(`💬 MESSAGE     : "${message}"`);
    console.log('='.repeat(80) + '\n');

    // In the future, this is where you'd call a real API:
    // try {
    //    await axios.post('https://api.whatsapp-gateway.com/send', { to: phone, text: message });
    // } catch (e) { console.error(e); }

    return true;
};
