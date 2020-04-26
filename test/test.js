const request = require("supertest");
const app = require("../app");
const config = require("../config");
const expect = require("chai").expect;

describe("GET /docs", () => {
  it("respond with 200", (done) => {
    request(app).get("/").expect("Richard", done);
  })
});

describe("GET /health", () => {
  it("respond with 200", (done) => {
    response = request(app).get('/health')
    .expect( response => {
      expect(response.statusCode).to.equal(200)
    })
    .end(done)
  })
});

describe('validPort', function(){
  let port = config.common.port;
  it('Port should not be undefined', function(){
    expect(port).to.not.be.undefined;
  })
  it('Port should not be null', function(){
    expect(port).to.not.be.null;
  })
  it('Port should not be 0', function(){
    expect(port).to.not.be.equal(0)
  })
});