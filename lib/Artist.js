var b = require('bindings')('spotify.node');
var sp = require('./libspotify');
var util = require('util');
var SpObject = require('./SpObject');

function Artist (sp_artist) {
    this._sp_object = sp_artist;
    SpObject.apply(this);
}
util.inherits(Artist, SpObject);
Artist.__proto__ = SpObject;

function artist_object_type() { return 'artist'; };
Artist.__defineGetter__('_object_type', artist_object_type);
Artist.prototype.__defineGetter__('_object_type', artist_object_type);

Artist.prototype.IMAGE_SIZE_NORMAL = b.SP_IMAGE_SIZE_NORMAL;
Artist.prototype.IMAGE_SIZE_SMALL = b.SP_IMAGE_SIZE_SMALL;
Artist.prototype.IMAGE_SIZE_LARGE = b.SP_IMAGE_SIZE_LARGE;

Artist.prototype._populateAttributes = function _populateAttributes() {
    this.name = b.artist_name(this._sp_object);
    return this.constructor.super_.prototype._populateAttributes();
};

Artist.prototype.toString = function toString() {
    this._readyOrThrow();
    return this.name;
};


Artist.prototype.portraitImageUrl = function portraitImageUrl(imageSize) {

    if (typeof(imageSize) == 'string') {
        switch(imageSize) {
            case 'small': imageSize = this.IMAGE_SIZE_SMALL; break;
            case 'normal': imageSize = this.IMAGE_SIZE_NORMAL; break;
            case 'large': imageSize = this.IMAGE_SIZE_LARGE; break;
            default: throw new Error('Unknown image size');
        }
    }

    if (typeof(imageSize) == 'undefined') {
        imageSize = this.IMAGE_SIZE_NORMAL;
    }

    return b.link_create_from_artist_portrait(this._sp_object, imageSize);
}

module.exports = Artist;
