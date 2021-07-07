module.exports = {
    basePath: process.env.BASE_PATH,
    trailingSlash: true,
    async exportPathMap(defaultPathMap) {
        return {...defaultPathMap };
    }
}