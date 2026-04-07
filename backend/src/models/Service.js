import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Laundry', 'Dry Cleaning', 'Ironing', 'Premium']
    },
    basePrice: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        default: 'kg'
    },
    tier: {
        type: String,
        enum: ['Essential', 'Heritage'],
        default: 'Essential'
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active'
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    }

}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
