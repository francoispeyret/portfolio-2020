function objectNoLimit(object) {
    if (object.pos.x < 0 - object.w * 4) {
        object.pos.x = object._.width + object.w;
    } else if (object.pos.x > object._.width + object.w * 4) {
        object.pos.x = 0 - object.w;
    }

    if (object.pos.y < 0 - object.w * 4) {
        object.pos.y = object._.height + object.w;
    } else if (object.pos.y > object._.height + object.w * 4) {
        object.pos.y = 0 - object.w;
    }
}

export default objectNoLimit;
