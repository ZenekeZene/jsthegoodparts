// CHAPTER 3
// OBJECTS
info('\n\nCHAPTER 3\nOBJECTS\n---------------------------------------------------\n\n');

// Object Literal
var avatar = {
    'full-name': 'Hector Villar',
    nickname: 'zeneke'
};

var flight = {
    airline: "Oceanic",
    number: 815
};

// Retrieval:
log(avatar['full-name']);
log(avatar.nickname);
var status = flight.status || "unkown";
log(status);

log(flight.time);

// Update:
avatar['full-name'] = 'Héctor Villar Mozo';
avatar.age = 35;

// Reference:
// The objects are passed around by reference, never copied:
var x = avatar;
x.nickname = 'Zene';
log(x.nickname);

// Prototype:
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    }
}

var another_avatar = Object.create(avatar);
log(another_avatar);
log(typeof another_avatar);
another_avatar.nickname = 'Charly';
another_avatar['full-name'] = 'Carlos Villar';
log(another_avatar);
log(typeof another_avatar.toString);
log(avatar.hasOwnProperty('toString'));
log(avatar.hasOwnProperty('nickname'));

// Enumeration
var name;
for (name in another_avatar) {
    if (another_avatar.hasOwnProperty(name)) {
        if (typeof another_avatar[name] !== 'function') {
            log(name + ': ' + another_avatar[name]);
        }
    }
}

delete another_avatar.nickname;
log(another_avatar.nickname);

// Global abatement
var MYAPP = {};
MYAPP.avatar = avatar;
