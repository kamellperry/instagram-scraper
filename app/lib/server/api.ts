// Create a simple cache mechanism

/**
 * Create a cache
 * @param {number} maxAge - The maximum age of the cache in milliseconds
 * @returns {Object} The cache object
 */
export function createCache<T>(maxAge: number = 1000 * 60 * 30) {
    return {
        maxAge, // 30 minutes cache lifetime
        data: null as T | null,
        timestamp: 0,

        /**
         * Check if the cache is valid
         * @returns {boolean}
         */
        isValid() {
            return this.data && (Date.now() - this.timestamp < this.maxAge);
        },

        /**
         * Set the cache data
         * @param {T} data - The data to set in the cache
         */
        set(data: T) {
            this.data = data;
            this.timestamp = Date.now();
        },

        /**
         * Invalidate the cache
         */
        invalidate() {
            this.data = null;
            this.timestamp = 0;
        }
    };
}