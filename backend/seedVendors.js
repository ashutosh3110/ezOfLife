import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const vendors = [
    {
        phone: '9876543210',
        displayName: 'Aman Laundry Hub',
        role: 'Vendor',
        status: 'approved',
        email: 'aman@laundry.com',
        address: 'Sector 15, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Aman Laundry & Dry Cleaners',
            gst: '06AAAAA0000A1Z5',
            address: 'Shop No. 4, Huda Market, Sector 15'
        }
    },
    {
        phone: '9876543211',
        displayName: 'QuickWash Solutions',
        role: 'Vendor',
        status: 'approved',
        email: 'quickwash@gmail.com',
        address: 'MG Road, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'QuickWash Professional Cleaning',
            gst: '06BBBBB1111B1Z5',
            address: 'Basement, DT City Center'
        }
    },
    {
        phone: '9876543212',
        displayName: 'EcoClean Experts',
        role: 'Vendor',
        status: 'approved',
        email: 'eco@clean.com',
        address: 'Golf Course Road, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'EcoClean Bio-Laundry',
            gst: '06CCCCC2222C1Z5',
            address: 'Shop 12, South Point Mall'
        }
    },
    {
        phone: '9876543213',
        displayName: 'Royal Garments Care',
        role: 'Vendor',
        status: 'approved',
        email: 'royal@care.com',
        address: 'DLF Phase 3, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Royal Textile & Care',
            gst: '06DDDDD3333D1Z5',
            address: 'Cyber Hub Backside'
        }
    },
    {
        phone: '9876543214',
        displayName: 'Silver Streak Laundry',
        role: 'Vendor',
        status: 'pending',
        email: 'silver@streak.com',
        address: 'Sector 56, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Silver Streak Express',
            gst: '06EEEEE4444E1Z5',
            address: 'Rail Vihar market'
        }
    },
    {
        phone: '9876543215',
        displayName: 'The Ironing Board',
        role: 'Vendor',
        status: 'approved',
        email: 'iron@board.com',
        address: 'Sector 44, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'The Ironing Board & Co',
            gst: '06FFFFF5555F1Z5',
            address: 'Plot 10, Sector 44'
        }
    },
    {
        phone: '9876543216',
        displayName: 'Crystal Clear Wash',
        role: 'Vendor',
        status: 'approved',
        email: 'crystal@wash.com',
        address: 'Palam Vihar, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Crystal Clear Premium Wash',
            gst: '06GGGGG6666G1Z5',
            address: 'Ansal Plaza ground floor'
        }
    },
    {
        phone: '9876543217',
        displayName: 'Morning Dew Laundry',
        role: 'Vendor',
        status: 'pending',
        email: 'morning@dew.com',
        address: 'Sohna Road, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Morning Dew Boutique Cleaners',
            gst: '06HHHHH7777H1Z5',
            address: 'Vatika City Market'
        }
    },
    {
        phone: '9876543218',
        displayName: 'Elite Fabric Care',
        role: 'Vendor',
        status: 'approved',
        email: 'elite@fabric.com',
        address: 'Nirvana Country, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Elite Fabric & Leather Care',
            gst: '06IIIII8888I1Z5',
            address: 'Arcadia Market Shop 22'
        }
    },
    {
        phone: '9876543219',
        displayName: 'Swift Spin Laundry',
        role: 'Vendor',
        status: 'approved',
        email: 'swift@spin.com',
        address: 'Sector 14, Gurgaon',
        isProfileComplete: true,
        shopDetails: {
            name: 'Swift Spin Self Service',
            gst: '06JJJJJ9999J1Z5',
            address: 'Old Delhi Road junction'
        }
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🌱 Connected to MongoDB for seeding...');

        // Remove existing vendors to avoid unique constraint errors during seed
        const phones = vendors.map(v => v.phone);
        await User.deleteMany({ phone: { $in: phones } });

        await User.insertMany(vendors);
        console.log('✅ Successfully seeded 10 professional vendors!');
        
        process.exit();
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

seed();
