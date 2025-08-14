module.exports.formatDanmaku = function (obj) {
    const comments = obj.comments;
    const items = [];
    comments.forEach(element => {
        const res = element.p.split(",");
        const R = Math.floor(res[2] / (256 * 256));
        const G = Math.floor((res[2] - R * 256 * 256) / 256);
        const B = res[2] - R * 256 * 256 - G * 256;
        const rgb = '#'+R.toString(16) + G.toString(16) + B.toString(16)
        let type = '';
        if (res[1] === "1") {
            type = 'scroll';
        } else if (res[1] === "4") {
            type = 'bottom';
        } else if (res[1] === "5") {
            type = 'top';
        }

        items.push({ color: rgb, text: element.m, time: parseFloat(res[0]), type: type });
    });
    return items;
}