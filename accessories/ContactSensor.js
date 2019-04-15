
module.exports = function(homebridge, log, api) {
    Generic = require('Generic')(homebridge, log, api);
    Characteristic = homebridge.hap.Characteristic;
    return ContactSensor;
}

class ContactSensor extends Generic {
    constructor (device, config) {
        super(device, config);

        this.service = new Service.ContactSensor(device.getName());
        this.contactState = this.service.getCharacteristic(Characteristic.ContactSensorState);
        this.services.push(this.service);
    }

    onStateUpdate(name, value) {
        var contactState = null;

        switch(name) {
            case 'core:ThreeWayHandleDirectionState':
            case 'core:ContactState':
            switch(value) {
                case 'closed': contactState = Characteristic.ContactSensorState.CONTACT_DETECTED;
                case 'tilt':
                case 'open': contactState = Characteristic.ContactSensorState.CONTACT_NOT_DETECTED;
            }
            break;
        }

        if (this.contactState != null && contactState != null)
            this.contactState.updateValue(contactState);
    }
}    