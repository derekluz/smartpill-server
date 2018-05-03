const crypto = require('crypto');

module.exports = {

    hash: (password) => {
        const hashPassword = crypto.createHmac('sha256', password)
            .update('random')
            .digest('hex');
        return hashPassword;
    },

    isValidRequest: (data, expectedFields) => {
        const hasAllFields = expectedFields.reduce((acc, field) => {
            return acc && data.hasOwnProperty(field);
        }, true);
        return hasAllFields;
    },

    isJsonValid: (data) => {
        try {
            JSON.parse(data);
        } catch (e) {
            return false;
        }
        return true;
    },

    calculateTimes: (medicine) => {
        const timeSplit = medicine.start_time.split(':');
        const startHour = +(timeSplit[0]);
        const minute = timeSplit[1];
        const hourArray = [];
        const hourDifference = Math.round(24 / medicine.day_frequence);
        const timeArray = Array(medicine.day_frequence).fill(startHour)
            .map((value, index) => {
                const hour = ((value + (index * hourDifference)) % 24);
                const hourString = hour < 10 ? '0' + hour : hour.toString();
                return `${hourString}:${minute}`;
            }).sort();
        return timeArray;
    },

    formatDispenserData: (data) => {
        const formattedData = data.map(medicine => {
            const medicineObj = {
                dosage: medicine.dosage,
                times: module.exports.calculateTimes(medicine)
            };
            return medicineObj;
        });
        return formattedData;
    }
};
