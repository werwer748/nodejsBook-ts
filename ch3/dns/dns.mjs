/*
    DNS를 다룰 때 사용하는 모듈. 주로 도메인을 통해 IP나 기타 DNS 정보를 얻고자 할 때 사용한다.
*/

import dns from 'dns/promises';

const ip = await dns.lookup('gilbut.co.kr');
console.log('IP', ip);

const a = await dns.resolve('gilbut.co.kr', 'A');
console.log('A', a);

const mx = await dns.resolve('gilbut.co.kr', 'MX');
console.log('MX', mx);

const cname = await dns.resolve('www.gilbut.co.kr', 'CNAME');
console.log('CNAME', cname);

const any = await dns.resolve('gilbut.co.kr', 'ANY');
console.log('ANY', any);

/*
console ---

IP { address: '49.236.151.220', family: 4 }
A [ '49.236.151.220' ]
MX [
  { exchange: 'aspmx.l.google.com', priority: 1 },
  { exchange: 'alt2.aspmx.l.google.com', priority: 5 },
  { exchange: 'alt1.aspmx.l.google.com', priority: 5 },
  { exchange: 'aspmx3.googlemail.com', priority: 10 },
  { exchange: 'aspmx2.googlemail.com', priority: 10 }
]
CNAME [ 'slb-1088813.ncloudslb.com' ]
ANY [
  { address: '49.236.151.220', ttl: 13900, type: 'A' },
  { value: 'ns1-1.ns-ncloud.com', type: 'NS' },
  { value: 'ns1-2.ns-ncloud.com', type: 'NS' },
  {
    nsname: 'ns1-1.ns-ncloud.com',
    hostmaster: 'ns1-2.ns-ncloud.com',
    serial: 50,
    refresh: 21600,
    retry: 1800,
    expire: 1209600,
    minttl: 300,
    type: 'SOA'
  }
]
*/

/*
    ip 주소는 간단하게 dns.lookup이나 dns.resolve(도메인)으로 얻을 수 있다.
    A(ipv4 주소), AAAA(ipv6 주소), NS(네임서버), SOA(도메인 정보), CNAME(별칭, 주로 www가 붙은 주소는 별칭인 경우가 많다), MX(메일 서버 등은
    레코드라고 부르는데, 해당 레코드에 대한 정보는 dns.resolve(도메인, 레코드 이름)으로 조회하면 된다.
*/