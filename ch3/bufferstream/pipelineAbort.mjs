import { pipeline } from "stream/promises";
import zlib from 'zlib';
import fs from 'fs';

const ac = new AbortController();
//* pipeline 사용 시 AbortController를 사용해 파이프를 중단할 수 있다.
const signal = ac.signal;

setTimeout(() => ac.abort(), 1);
await pipeline(
    fs.createReadStream('./readme4.txt'),
    zlib.createGzip(),
    fs.createWriteStream('./readme4.txt.gz'),
    { signal },
    //* 마지막 인수로 { signal }을 추가하고 원하는 시점에 ac.abort()를 호출하여 중단 한다.
);
