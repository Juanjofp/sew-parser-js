import { decode } from './sew-encoder';

const findFrameInBuffer = (buffer) => {
    const indexIn = buffer.indexOf('534557', 0, 'hex');
    const indexOut = buffer.indexOf('574553', indexIn != -1 ? indexIn : 0, 'hex');
    if (indexIn != -1 && indexOut != -1) {
        return {
            frame: buffer.slice(indexIn, indexOut + 3),
            partial: buffer.slice(indexOut + 3)
        };
    }
    else {
        return {
            frame: undefined,
            partial: buffer
        };
    }
};

export const createSewParser = (onDataDecoded) => {
    // init Buffer to store partial frames
    let partialBuffer = Buffer.from([]);
    return (data) => {
        // Check data is a Buffer or ignore data
        if (!Buffer.isBuffer(data)) return;
        // Join partial data  and the new Buffer
        const bufferToDecode = Buffer.concat([partialBuffer, data]);
        let frames = { partial: bufferToDecode};
        do {
            frames = findFrameInBuffer(frames.partial);
            try {
                const json = frames.frame && decode(frames.frame);
                json && onDataDecoded(json);
            }
            catch (error) {
                // TODO: Maybe and error callbac?
                console.error('Error Frame', error.message, frames.frame, frames.partial);
            }
        } while (frames.frame);
        partialBuffer = Buffer.from(frames.partial);
    };
};
