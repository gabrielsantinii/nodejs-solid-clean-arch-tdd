export const safeSpread = (object: object = {}) => {
    try {
        return { ...object };
    } catch (e) {
        return {};
    }
};
