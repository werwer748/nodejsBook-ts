/*
 예제: 소수의 개수를 구하는 작업 - 워커스레드 사용 x
*/

const min = 2;
const max = 10000000;
const primes = [];

function findPrimes(start, range) {
    let isPrime = true;
    const end = start + range;
    for (let i = start; i < end; i++) {
        for (let j = min; j < Math.sqrt(end); j++) {
            if (i !== j && i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
        isPrime = true;
    }
}

console.time('prime');
findPrimes(min, max);
console.timeEnd('prime');
console.log(primes.length)
/*
 --- 콘솔 ---
 prime: 3.171s
 664579
*/
