import mongoose from 'mongoose';
const promptIdSchema = mongoose.Schema({
    promptId: mongoose.Schema.Types.ObjectId
});
const daySchema = mongoose.Schema({
    day: {
        type: [promptIdSchema],
        
    }
});
const monthSchema = mongoose.Schema({
    d1: {type: daySchema},
    d2: {type: daySchema},
    d3: {type: daySchema},
    d4: {type: daySchema},
    d5: {type: daySchema},
    d6: {type: daySchema},
    d7: {type: daySchema},
    d8: {type: daySchema},
    d9: {type: daySchema},
    d10: {type: daySchema},
    d11: {type: daySchema},
    d12: {type: daySchema},
    d13: {type: daySchema},
    d14: {type: daySchema},
    d15: {type: daySchema},
    d16: {type: daySchema},
    d17: {type: daySchema},
    d18: {type: daySchema},
    d19: {type: daySchema},
    d20: {type: daySchema},
    d21: {type: daySchema},
    d22: {type: daySchema},
    d23: {type: daySchema},
    d24: {type: daySchema},
    d25: {type: daySchema},
    d26: {type: daySchema},
    d27: {type: daySchema},
    d28: {type: daySchema},
    d29: {type: daySchema},
    d30: {type: daySchema},
    d31: {type: daySchema}
});
const yearSchema = mongoose.Schema({
    jan: {type: monthSchema, },
    feb: {type: monthSchema, },
    mar: {type: monthSchema, },
    apr: {type: monthSchema, },
    may: {type: monthSchema, },
    jun: {type: monthSchema, },
    jul: {type: monthSchema, },
    aug: {type: monthSchema, },
    sep: {type: monthSchema, },
    oct: {type: monthSchema, },
    nov: {type: monthSchema, },
    dec: {type: monthSchema, }
});
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: false
    },
    year: {
        type: yearSchema,
    }
});
const User = mongoose.model('User', userSchema);
export default User;