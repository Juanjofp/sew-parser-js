import { encode, decode, SENSOR_UNKNOWN } from './sew-encoder';

const mac = '02-04-0A-0F-AE-0E-04-06';
const CMDTEMP_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x13,
    0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x01,
    0x00, 0x57, 0x45, 0x53
]);
const CMDTEMP_JSON = {
    type: 'TEMPERATURE',
    sensorId: mac,
    payload: undefined
};
const DCMOTOR_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x16, 0x00,
    0x02, 0x04, 0x0a, 0x0f, 0xae, 0x0e,
    0x04, 0x06, 0x10, 0x00, 0x01, 0x01,
    0xff, 0x57, 0x45, 0x53
]);
const DCMOTOR_JSON = {
    type: 'DCMOTOR',
    sensorId: mac,
    payload: {
        enabled: true,
        reverse: true,
        velocity: 255
    }
};
const DISTANCE_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x17, 0x00, 0x02, 0x04, 0x0a,
    0x0f, 0xae, 0x0e, 0x04, 0x06, 0x03, 0x00, 0x00, 0x00,
    0xbc, 0x41, 0x57, 0x45, 0x53
]);
const DISTANCE_JSON = {
    type: 'DISTANCE',
    sensorId: mac,
    payload: 23.50
};
const HUMIDITY_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x17, 0x00, 0x02, 0x04, 0x0a,
    0x0f, 0xae, 0x0e, 0x04, 0x06, 0x02, 0x00, 0x00, 0x00,
    0x84, 0x42, 0x57, 0x45, 0x53
]);
const HUMIDITY_JSON = {
    type: 'HUMIDITY',
    sensorId: mac,
    payload: 66.00
};
const TEMPERATURE_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x17, 0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x01, 0x00, 0x00, 0x00, 0x02, 0x42,
    0x57, 0x45, 0x53
]);
const TEMPERATURE_JSON = {
    type: 'TEMPERATURE',
    sensorId: mac,
    payload: 32.50
};
const GPS_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x1f, 0x00, 0x02, 0x04, 0x0a, 0x0f, 0xae,
    0x0e, 0x04, 0x06, 0x0a, 0x00, 0x6b, 0x7e, 0x14, 0x42, 0x68, 0xcd,
    0x8f, 0xbf, 0x00, 0x00, 0xd9, 0x42, 0x57, 0x45, 0x53
]);
const GPS_JSON = {
    type: 'GPS',
    sensorId: mac,
    payload: {
        latitude: 37.12345504760742,
        longitude: -1.1234560012817383,
        altitude: 108.50
    }
};
const SWITCH_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x14, 0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x11, 0x00, 0x01, 0x57, 0x45, 0x53
]);
const SWITCH_JSON = {
    type: 'SWITCH',
    sensorId: mac,
    payload: 1
};
const TOGGLE_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x14, 0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x12, 0x00, 0x01, 0x57, 0x45, 0x53
]);
const TOGGLE_JSON = {
    type: 'TOGGLE',
    sensorId: mac,
    payload: true
};
const INVALID_NOTAIL_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x13,
    0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x01,
    0x34, 0x43, 0x34, 0x56, 0x34
]);

const INVALID_SIZE_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x17,
    0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x01,
    0x00, 0x57, 0x45, 0x53
]);

const UNKNOWN_SENSOR_TYPE_BUFFER = Buffer.from([
    0x53, 0x45, 0x57, 0x01, 0x17, 0x00, 0x02, 0x04, 0x0a, 0x0f,
    0xae, 0x0e, 0x04, 0x06, 0x0f, 0xf0, 0x00, 0x00, 0x02, 0x42,
    0x57, 0x45, 0x53
]);
const UNKNOWN_SENSOR_TYPE_JSON = {
    type: SENSOR_UNKNOWN,
    sensorId: mac,
    payload: '0:0:2:66'
};

describe(
    'SewEncoder',
    () => {
        describe(
            'decode() should',
            () => {
                it(
                    'decode CMDTEMP_BUFFER and return a CMDTEMP_JSON object',
                    () => {
                        const json = decode(CMDTEMP_BUFFER);
                        expect(json).toEqual(CMDTEMP_JSON);
                    }
                );

                it(
                    'decode DCMOTOR_BUFFER and return a DCMOTOR_JSON object',
                    () => {
                        const json = decode(DCMOTOR_BUFFER);
                        expect(json).toEqual(DCMOTOR_JSON);
                    }
                );

                it(
                    'decode DISTANCE_BUFFER and return a DISTANCE_JSON object',
                    () => {
                        const json = decode(DISTANCE_BUFFER);
                        expect(json).toEqual(DISTANCE_JSON);
                    }
                );

                it(
                    'decode HUMIDITY_BUFFER and return a HUMIDITY_JSON object',
                    () => {
                        const json = decode(HUMIDITY_BUFFER);
                        expect(json).toEqual(HUMIDITY_JSON);
                    }
                );

                it(
                    'decode TEMPERATURE_BUFFER and return a TEMPERATURE_JSON object',
                    () => {
                        const json = decode(TEMPERATURE_BUFFER);
                        expect(json).toEqual(TEMPERATURE_JSON);
                    }
                );

                it(
                    'decode GPS_BUFFER and return a GPS_JSON object',
                    () => {
                        const json = decode(GPS_BUFFER);
                        expect(json).toEqual(GPS_JSON);
                    }
                );

                it(
                    'decode SWITCH_BUFFER and return a SWITCH_JSON object',
                    () => {
                        const json = decode(SWITCH_BUFFER);
                        expect(json).toEqual(SWITCH_JSON);
                    }
                );

                it(
                    'decode TOGGLE_BUFFER and return a TOGGLE_JSON object',
                    () => {
                        const json = decode(TOGGLE_BUFFER);
                        expect(json).toEqual(TOGGLE_JSON);
                    }
                );

                it(
                    'decode BUFFER with UNKNOWN sensor type and return a UNKNOWN_SENSOR_TYPE_JSON object',
                    () => {
                        const json = decode(UNKNOWN_SENSOR_TYPE_BUFFER);
                        expect(json).toEqual(UNKNOWN_SENSOR_TYPE_JSON);
                    }
                );

                it(
                    'decode NULL BUFFER raise an exception',
                    () => {
                        expect(() => decode()).toThrowError('Invalid frame');
                    }
                );

                it(
                    'decode INVALID NO TAIL BUFFER raise an exception',
                    () => {
                        expect(() => decode(INVALID_NOTAIL_BUFFER)).toThrowError('Invalid frame');
                    }
                );

                it(
                    'decode INVALID SIZE BUFFER raise an exception',
                    () => {
                        expect(() => decode(INVALID_SIZE_BUFFER)).toThrowError('Invalid frame');
                    }
                );
            }
        );

        describe(
            'encode() should',
            () => {
                it(
                    'encode CMDTEMP_JSON and return a CMDTEMP_BUFFER buffer',
                    () => {
                        const buffer = encode(CMDTEMP_JSON);
                        expect(buffer.equals(CMDTEMP_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode DCMOTOR_JSON and return a DCMOTOR_BUFFER buffer',
                    () => {
                        const buffer = encode(DCMOTOR_JSON);
                        expect(buffer.equals(DCMOTOR_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode DISTANCE_JSON and return a DISTANCE_BUFFER buffer',
                    () => {
                        const buffer = encode(DISTANCE_JSON);
                        expect(buffer.equals(DISTANCE_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode HUMIDITY_JSON and return a HUMIDITY_BUFFER buffer',
                    () => {
                        const buffer = encode(HUMIDITY_JSON);
                        expect(buffer.equals(HUMIDITY_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode TEMPERATURE_JSON and return a TEMPERATURE_BUFFER buffer',
                    () => {
                        const buffer = encode(TEMPERATURE_JSON);
                        expect(buffer.equals(TEMPERATURE_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode GPS_JSON and return a GPS_BUFFER buffer',
                    () => {
                        const buffer = encode(GPS_JSON);
                        expect(buffer.equals(GPS_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode SWITCH_JSON and return a SWITCH_BUFFER buffer',
                    () => {
                        const buffer = encode(SWITCH_JSON);
                        expect(buffer.equals(SWITCH_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode TOGGLE_JSON and return a TOGGLE_BUFFER buffer',
                    () => {
                        const buffer = encode(TOGGLE_JSON);
                        expect(buffer.equals(TOGGLE_BUFFER)).toBe(true);
                    }
                );

                it(
                    'encode object without type raise and exception',
                    () => {
                        const noTypeJson = {};
                        expect(() => encode(noTypeJson)).toThrowError('type is required');
                    }
                );

                it(
                    'encode object with invalid type raise and exception',
                    () => {
                        const invalidType = { type: 'NOTYPEKNOWN'};
                        expect(() => encode(invalidType)).toThrowError('type NOTYPEKNOWN is not a valid type');
                    }
                );

                it(
                    'encode object without a sensorId raise and exception',
                    () => {
                        const noMACJson = { type: 'TEMPERATURE'};
                        expect(() => encode(noMACJson)).toThrowError('sensorId is required');
                    }
                );

                it(
                    'encode object with invalid size sensorId raise and exception',
                    () => {
                        const invalidMac = { type: 'TEMPERATURE', sensorId: 'aa-aa-aa-aa'};
                        expect(() => encode(invalidMac)).toThrowError('sensorId aa-aa-aa-aa is not a valid sensorId');
                    }
                );

                it(
                    'encode object with invalid format sensorId raise and exception',
                    () => {
                        const invalidMac = { type: 'TEMPERATURE', sensorId: 'aa-aa-a--aa-a--aa-a--aa'};
                        expect(() => encode(invalidMac)).toThrowError('sensorId aa-aa-a--aa-a--aa-a--aa is not a valid sensorId');
                    }
                );

                it(
                    'encode object with invalid hex value in sensorId raise and exception',
                    () => {
                        const invalidMac = { type: 'TEMPERATURE', sensorId: 'aa-aa-aa-aa-aa-aa-ag-aa'};
                        expect(() => encode(invalidMac)).toThrowError('sensorId aa-aa-aa-aa-aa-aa-ag-aa is not a valid sensorId');
                    }
                );

                it(
                    'encode object with invalid payload value for TEMPERATURE raise and exception',
                    () => {
                        const invalidPayload = { type: 'TEMPERATURE', sensorId: 'aa-aa-aa-aa-aa-aa-aa-aa', payload: {}};
                        expect(() => encode(invalidPayload)).toThrowError('Invalid payload');
                    }
                );

                it(
                    'encode object with invalid payload value for HUMIDITY raise and exception',
                    () => {
                        const invalidPayload = { type: 'HUMIDITY', sensorId: 'aa-aa-aa-aa-aa-aa-aa-aa', payload: {}};
                        expect(() => encode(invalidPayload)).toThrowError('Invalid payload');
                    }
                );

                it(
                    'encode object with invalid payload value for DISTANCE raise and exception',
                    () => {
                        const invalidPayload = { type: 'DISTANCE', sensorId: 'aa-aa-aa-aa-aa-aa-aa-aa', payload: {}};
                        expect(() => encode(invalidPayload)).toThrowError('Invalid payload');
                    }
                );

                it(
                    'encode object with invalid payload value for SWITCH raise and exception',
                    () => {
                        const invalidPayload = { type: 'SWITCH', sensorId: 'aa-aa-aa-aa-aa-aa-aa-aa', payload: {}};
                        expect(() => encode(invalidPayload)).toThrowError('Invalid payload');
                    }
                );

                it(
                    'encode object with invalid payload value for DCMOTOR raise and exception',
                    () => {
                        const invalidPayload = { type: 'DCMOTOR', sensorId: 'aa-aa-aa-aa-aa-aa-aa-aa', payload: {}};
                        expect(() => encode(invalidPayload)).toThrowError('Invalid payload');
                    }
                );

                it(
                    'encode object with invalid payload value for GPS raise and exception',
                    () => {
                        const invalidPayload = { type: 'GPS', sensorId: 'aa-aa-aa-aa-aa-aa-aa-aa', payload: {}};
                        expect(() => encode(invalidPayload)).toThrowError('Invalid payload');
                    }
                );
            }
        );
    }
);
