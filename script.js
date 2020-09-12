import http from "k6/http";


export default function () {
  let responses = http.batch([
    ['GET', "http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com", { tags: { ctype: 'application/json' } }],
    ['GET', "http://airbb3-info1-1972256759.us-west-1.elb.amazonaws.com", { tags: { ctype: 'application/json' } }],
    ['GET', "http://3bb-reviews-classic-1100595086.us-west-2.elb.amazonaws.com/rooms/:id", { tags: { ctype: 'application/json' } }]
  ]);
}