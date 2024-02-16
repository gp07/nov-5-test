const os = require('os');

function getSelectAllKey() {
    const platform = os.platform();
    return platform === 'darwin' ? 'Meta+A' : 'Control+A';
}

module.exports = { getSelectAllKey };
