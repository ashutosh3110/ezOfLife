import { create } from 'zustand';

/**
 * Platform-wide Notification Store (Phase 4 Requirement)
 * Manages the 12 BRD-defined event triggers across all personas.
 */
const useNotificationStore = create((set, get) => ({
    notifications: [],
    unreadCount: 0,

    // Mandatory BRD Triggers
    addNotification: (type, title, message, persona = 'user') => {
        const newNotif = {
            id: Date.now(),
            type, // 'order_placed', 'rider_assigned', 'pickup_complete', 'at_shop', 'processing', 'ready', 'out_for_delivery', 'delivered', 'payment_pending', 'payment_success', 'dispute_raised', 'b2b_inquiry'
            title,
            message,
            persona,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
        };

        set((state) => ({
            notifications: [newNotif, ...state.notifications],
            unreadCount: state.unreadCount + 1
        }));

        // In a real app, this would also trigger a Push Notification or SMS/WhatsApp via the BRD-defined channels
        console.log(`[Push] To ${persona.toUpperCase()}: ${title} - ${message}`);
    },

    markAsRead: (id) => {
        set((state) => ({
            notifications: state.notifications.map((n) => 
                n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1)
        }));
    },

    clearAll: () => set({ notifications: [], unreadCount: 0 })
}));

export default useNotificationStore;
